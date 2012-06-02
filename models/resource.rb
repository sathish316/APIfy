class Resource
  include Mongoid::Document
  field :name, type: String
  field :description, type: String
  field :html, type: String
  field :api_path, type: String
  field :key, type: String
  field :dom_attributes, type: Hash
  field :data, type: Array
  field :expire_data, type: Boolean
  field :expire_data_at, type: DateTime

  validates_presence_of :name, :html, :key, :api_path
  validates_uniqueness_of :name, :api_path
  validates_format_of :name, with: /^[a-zA-Z0-9_]+$/

  before_update :reset_data
  before_save :default_attributes

  def init!
    eval code
  end

  def all
    if self.data.nil? or expired?
      logger.info "Parsing html: #{html}"
      self.data = scrapify_klass.all.map {|record| record.attributes.stringify_keys}
      save
    end
    self.data
  end

  def find(id)
    all.find {|record| record[key] == id}
  end

  private

  def expired?
    expired = false
    if expire_data
      unless self.expire_data_at
        # first time
        self.expire_data_at = 1.hour.from_now
        save
      end
      expired = Time.now >= self.expire_data_at
      if expired
        self.expire_data_at = 1.hour.from_now
        save
      end
    end
    expired
  end

  def scrapify_klass
    scrapify_klass_name.constantize
  end

  def code
    options = self.dom_attributes
    <<-KLASS
      class ::#{scrapify_klass_name}
        include Scrapify::Base
        html '#{html}'

        key :#{key}
        #{dom_attribute_selectors.join("\n")}
      end
    KLASS
  end

  def scrapify_klass_name
    name.camelize
  end

  def dom_attribute_selectors
    attribute_declarations = dom_attributes.map do |k,v|
      type = v['css'] ? 'css' : 'xpath'
      selector = v[type]
      "attribute :#{k}, #{type}: \"#{selector}\""
    end
  end

  def reset_data
    self.data = nil if html_changed? or dom_attributes_changed? or key_changed?
  end

  def default_attributes
    self.dom_attributes ||= {}
  end
end