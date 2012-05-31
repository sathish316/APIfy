require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'coffee-script'
require 'sass/plugin/rack'
require 'scrapify'
require 'active_support'
require 'active_support/inflector'
require 'mongoid'
require 'json'
require 'sinatra/partial'
require 'sinatra/jsonp'
require './models/resource'
require './db/resources'
require './config'
require './helper'
require './api'
require './resource'
require './tutorial'
require './cheatsheet'

get '/' do
  redirect '/resources'
end

get '/application.js' do
  coffee :application
end

get '/about' do
  @current_page = 'about'
  markdown :about
end