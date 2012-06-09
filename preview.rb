require 'sinatra'

get '/preview' do
  puts "Preview: #{params[:url]}"  
  uri = URI(params[:url])
  Net::HTTP.get_response(uri).body
end