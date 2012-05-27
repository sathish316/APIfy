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
  initialize_resource(resource)
  resource.classify.constantize
end