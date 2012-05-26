require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require './config'

get '/' do
  "Hello World"
end