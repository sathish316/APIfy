require 'sinatra'

before do
  @current_page = 'resources'
end

get '/resources' do
  @resources = Resource.all
  haml :"resources/index"
end

get '/resources/new' do
  @title = 'New API'
  @current_page = 'create_resource'
  @resource = Resource.new
  haml :"resources/new"
end

post '/resources' do
  extract_attributes(params[:resource])
  @resource = Resource.new(params[:resource])
  if @resource.save
    @resource.reload.init!
    redirect "/resources/#{@resource.id}"
  else
    haml :"resources/new"
  end
end

get '/resources/:id' do
  @resource = Resource.find(params[:id])
  haml :"resources/show"
end

get '/resources/:id/edit' do
  @resource = Resource.find(params[:id])
  haml :"resources/edit"
end

put '/resources/:id' do
  extract_attributes(params[:resource])
  @resource = Resource.find(params[:id])
  @resource.update_attributes!(params[:resource])
  @resource.reload.init!
  redirect "/resources/#{@resource.id}"
end

def extract_attributes(resource_params)
  dom_attributes = resource_params[:dom_attributes]
  return unless dom_attributes
  names = dom_attributes[:name]
  selectors = dom_attributes[:selector]
  selector_types = dom_attributes[:selector_type]
  attributes = {}
  names.size.times do |i|
    index_param = i.to_s
    attributes[names[index_param]] = {selector_types[index_param] => selectors[index_param]}
  end
  resource_params.merge!('dom_attributes' => attributes)
end

# delete '/resources/:id' do
#   @resource = Resource.find(params[:id])
#   @resource.destroy
#   redirect_to "/resources"
# end