helpers do
  def capitalize(str)
    str.capitalize
  end
end

def initialize_resource(resource)
  options = Resource.first(conditions: {api_path: resource}).attributes
  attribute_declarations = options['dom_attributes'].map do |k,v|
    type = v['css'] ? 'css' : 'xpath'
    selector = v[type]
    "attribute :#{k}, #{type}: '#{selector}'"
  end

  klass_name = options['name'].camelize
  eval <<-KLASS
    class #{klass_name}
      include Scrapify::Base
      html '#{options['html']}'

      key :#{options['key']}
      #{attribute_declarations.join("\n")}
    end
  KLASS
  klass_name
end