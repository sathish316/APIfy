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

  def all
    if self.data.nil? or expired?
      logger.info "Parsing html: #{html}"
      self.data = scraper.all.map {|record| record.attributes.stringify_keys}
      save
    end
    self.data
  end

  def find(id)
    all.find {|record| record[key] == id}
  end

  private

  def expired?
    expired = Time.now >= self.expire_data_at
    if expired
      self.expire_data_at = expire_data.minutes.from_now
      save
    end
    expired
  end

  def scraper
    ::Scrapify::Scraper.new(self.html, self.key, dom_attributes_with_blocks_hack)
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