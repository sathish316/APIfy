class Resource
  include Mongoid::Document
  field :name, type: String
  field :description, type: String
  field :html, type: String
  field :api_path, type: String
  field :key, type: String
  field :dom_attributes, type: Hash
  field :data, type: Array
  field :expire_data, type: Integer
  field :expire_data_at, type: DateTime
  field :locked, type: Boolean
  field :charset, type: String

  validates_presence_of :name, :html, :key, :api_path
  validates_uniqueness_of :name, :api_path

  validates_format_of :name, with: /^[a-zA-Z0-9_]+$/
  validates_format_of :api_path, with: /^[a-zA-Z0-9_]+$/
  validates_format_of :key, with: /^[a-zA-Z0-9_]+$/
  validate :validate_dom_attributes

  before_update :reset_data
  before_save :default_dom_attributes
  before_create :default_expire_attributes

  scope :catalog, lambda {|char| where(name: /^#{char}/i)}

  after_create :refresh_count
  include Expirable

  def all(params={})
    url = url_for(html, params)
    data_cache = dynamic_url? ? DataCache.find_or_create_by(url: url) : self
    if data_cache.data.nil? or data_cache.expired?
      logger.info "Parsing url: #{url}"
      data_cache.data = scraper_for(url).all.map {|record| record.attributes.stringify_keys}
      data_cache.save
    end
    data_cache.data
  end

  def find(id, params={})
    all(params).find {|record| record[key] == id}
  end

  def dynamic_url?
    url_attributes.present?
  end

  def url_attributes
    html.scan(/\:(\w+)\:/).map {|m| m[0]}
  end

  def example_url_attributes
    url_attributes.map do |attribute|
      example_value = attribute == 'username' ? 'jack' : 'foo'
      "#{attribute}=#{example_value}"
    end.join("&")
  end

  private

  def url_for(base_url, params)
    url = base_url.dup
    params.each do |k,v|
      url.gsub!(":#{k}:", v)
    end
    url
  end

  def scraper_for(url)
    ::Scrapify::Scraper.new(url, self.key, dom_attributes_with_blocks_hack)
  end

  def dom_attributes_with_blocks_hack
    dom_attributes.each_with_object({}) do |(k,v),h|
      v = v.clone
      type = v['css'] ? 'css' : 'xpath'
      selector, child_selector = v[type].split('|')
      v['block'] = lambda{|element| element.children.send(type, child_selector).map(&:value)} if child_selector
      h[k] = v
    end
  end

  def reset_data
    self.data = nil if html_changed? or dom_attributes_changed? or key_changed?
  end

  def default_dom_attributes
    self.dom_attributes ||= {}
  end

  def default_expire_attributes
    self.expire_data = 60*24
    self.expire_data_at = self.expire_data.minutes.from_now
  end

  def validate_dom_attributes
    return unless dom_attributes
    dom_attributes.each_with_index do |(name, properties), index|
      self.errors.add(:"dom_attributes[#{index}][name]", "can't be empty") if name.blank?
      self.errors.add(:"dom_attributes[#{index}][name]", "is invalid") unless name =~ /^[a-zA-Z0-9_]+$/
      selector = properties['css'] || properties['xpath']
      self.errors.add(:"dom_attributes[#{index}][selector]", "can't be empty") if selector.blank?
    end
  end

  def refresh_count
    ResourceCount.refresh!
  end
end