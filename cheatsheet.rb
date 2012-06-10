require 'sinatra/base'

class Apify < Sinatra::Base

  get '/cheatsheets/css' do
    haml :"cheatsheets/css", layout: false
  end

  get '/cheatsheets/xpath' do
    haml :"cheatsheets/xpath", layout: false
  end
end