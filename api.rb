require 'json'

get '/api/:resource.json' do
  content_type :json
  model = model_for(params[:resource])
  model.all.to_json
end

get '/api/:resource/:id.json' do
  content_type :json
  model = model_for(params[:resource])
  model.find(params[:id]).to_json
end

def model_for(resource)
  initialize_model(resource)
  resource.classify.constantize
end

def initialize_model(resource)
  models = {'pizzas' => {
    name: 'Pizza',
    api_path: 'pizzas',
    html: "http://www.dominos.co.in/menuDetails_ajx.php?catgId=1",
    attributes: {
      name: {css: ".menu_lft li a"},
      image_url: {xpath: "//li//input//@value"}
      },
    key: :name
  }}
  options = models[resource]
  attribute_declarations = options[:attributes].map do |k,v|
    type = v[:css] ? :css : :xpath
    selector = v[type]
    "attribute :#{k}, #{type}: '#{selector}'"
  end

  eval <<-KLASS
    class #{options[:name].capitalize}
      include Scrapify::Base
      html '#{options[:html]}'

      key :#{options[:key]}
      #{attribute_declarations.join("\n")}
    end
  KLASS
end