require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'coffee-script'
require 'sass/plugin/rack'
require 'scrapify'
require 'active_support'
require 'active_support/inflector'
require './models/pizza'
require './config'
require './helper'
require './api'

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