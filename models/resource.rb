class Resource
  include Mongoid::Document
  field :name, type: String
  field :html, type: String
  field :api_path, type: String
  field :key, type: String
  field :dom_attributes, type: Hash

  validates_presence_of :name, :html, :key, :api_path
  validates_uniqueness_of :name, :api_path

  def init!
    eval code
  end

  def klass
    klass_name.constantize
  end

  private

  def code
    options = self.dom_attributes
    <<-KLASS
      class ::#{klass_name}
        include Scrapify::Base
        html '#{html}'

        key :#{key}
        #{dom_attribute_selectors.join("\n")}
      end
    KLASS
  end

  def klass_name
    name.camelize
  end

  def dom_attribute_selectors
    attribute_declarations = dom_attributes.map do |k,v|
      type = v['css'] ? 'css' : 'xpath'
      selector = v[type]
      "attribute :#{k}, #{type}: '#{selector}'"
    end
  end
end