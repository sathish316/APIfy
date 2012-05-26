require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'coffee-script'
require './config'
require './helper'

get '/' do
  session[:counter] ||= 0
  session[:counter] += 1
  @counter = session[:counter]
  @msg = capitalize("hello world")
  haml :index
end

get '/application.js' do
  coffee :application
end
