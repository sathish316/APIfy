require 'sinatra/base'

class Apify < Sinatra::Base
  get '/apps' do
    @current_page = 'apps'
    haml :"apps/index"
  end
end