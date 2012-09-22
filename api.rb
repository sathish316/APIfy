require 'sinatra/base'

class Apify < Sinatra::Base
  get '/api/:resource.json' do
    jsonp_or_json find_resource.all(params).to_json
  end

  get '/api/:resource/:id.json' do
    jsonp_or_json find_record.to_json
  end

  private

  def find_resource
    resource = Resource.first(conditions: {api_path: params[:resource]})
    @charset = resource.charset || '.'
    raise Sinatra::NotFound unless resource
    resource
  end

  def find_record
    record = find_resource.find(params[:id])
    raise Sinatra::NotFound unless record
    record
  end

  def jsonp_or_json(result)
    params[:callback] ? (jsonp result) : (json result)
  end

  def json(result)
    content_type :json, charset: @charset
    result
  end
end