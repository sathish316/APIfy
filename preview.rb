require 'sinatra/base'

class Apify < Sinatra::Base

  get '/preview' do
    puts "Preview: #{params[:url]}"  
    uri = URI(params[:url])
    Net::HTTP.get_response(uri).body
  end
end