require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require './config'

get '/' do
  session[:counter] ||= 0
  session[:counter] += 1
  @counter = session[:counter]
  erb :index
end