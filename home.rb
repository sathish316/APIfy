require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require './config'

get '/' do
  session[:counter] ||= 0
  session[:counter] += 1
  "Hello World #{session[:counter]}"
end