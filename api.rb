require 'sinatra'

get '/api/:resource.json' do
  content_type :json
  model = model_for(params[:resource])
  result = model.all.to_json
  params[:callback] ? (jsonp result) : result
end

get '/api/:resource/:id.json' do
  content_type :json
  model = model_for(params[:resource])
  result = model.find(params[:id]).to_json
  params[:callback] ? (jsonp result) : result
end

def model_for(resource_path)
  initialize_resource(resource_path)
end