require 'sinatra/base'

class Apify < Sinatra::Base

  get '/api_search.json' do
    content_type :json
    query = params[:query]
    resources = Resource.collection.find({:name => /#{query}/i}, fields: [:id, :name])
    results = resources.map {|resource| {name: resource.name, url: "#{request.base_url}/resources/#{resource.id}"}}
    json results.to_json
  end

end