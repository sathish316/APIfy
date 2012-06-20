require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sinatra/base'
require 'coffee-script'
require 'sass/plugin/rack'
require 'scrapify'
require 'active_support'
require 'active_support/inflector'
require 'mongoid'
require 'json'
require 'sinatra/partial'
require 'sinatra/jsonp'
require 'uri'
require 'net/http'
require 'padrino-helpers'
require 'kaminari/sinatra'
require 'rdiscount'

require './models/resource'
require './models/resource_count'
require './db/resources'
require './config'
require './helper'

require './api'
require './resource'
require './tutorial'
require './cheatsheet'
require './preview'
require './api_search'
require './apps'

class Apify < Sinatra::Base
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
end