require 'sinatra'

get '/preview' do
  uri = URI(params[:url])
  Net::HTTP.get_response(uri).body
end