require 'sinatra/base'

class Apify < Sinatra::Base
  set :markdown, :layout_engine => :haml, :layout => :layout

  get '/tutorial/create' do
    @current_page = 'tutorial'
    markdown :"tutorial/create"
  end

  get '/tutorial/use' do
    @current_page = 'tutorial'
    markdown :"tutorial/use"
  end
end