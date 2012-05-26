require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require './config'
require './helper'

get '/' do
  session[:counter] ||= 0
  session[:counter] += 1
  @counter = session[:counter]
  @msg = capitalize("hello world")
  erb :index
end