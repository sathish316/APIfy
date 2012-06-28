require 'sinatra/base'

class Apify < Sinatra::Base

  before do
    @current_page = 'resources'
  end

  get '/resources' do
    @resources = Resource.page(page).per(per)
    @resources = @resources.catalog(params[:catalog]) if params[:catalog] and params[:catalog] != 'All'
    @resources = @resources.asc(:name)
    @catalog = params[:catalog] || 'All'
    @catalog_counts = ResourceCount.counts
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
    if @resource.update_attributes(params[:resource])
      redirect "/resources/#{@resource.id}"
    else
      haml :"resources/edit"
    end
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

  def page
    params[:page] || 1
  end

  def per
    params[:per] || 20
  end

  # delete '/resources/:id' do
  #   @resource = Resource.find(params[:id])
  #   @resource.destroy
  #   redirect_to "/resources"
  # end
end
