require 'sinatra'

get '/resources' do
  @resources = Resource.all
  haml :"resources/index"
end