require 'sinatra/base'

class Apify < Sinatra::Base
  configure do
    enable :sessions
  end

  use Rack::MethodOverride

  set :root, File.dirname(__FILE__)

  # Sass config
  use Sass::Plugin::Rack

  configure :production do
    use Rack::Static,
        urls: ['/stylesheets'],
        root: File.expand_path('../tmp', __FILE__)

    Sass::Plugin.options.merge!({
      template_location: 'public/stylesheets/sass',
      css_location: 'tmp/stylesheets'
      })
  end

  # Mongoid Heroku and Local config
  configure do
    Mongoid.configure do |config|
      if ENV['MONGOLAB_URI']
        conn = Mongo::Connection.from_uri(ENV['MONGOLAB_URI'])
        uri = URI.parse(ENV['MONGOLAB_URI'])
        config.master = conn.db(uri.path.gsub(/^\//, ''))
      else
        config.master = Mongo::Connection.from_uri("mongodb://localhost:27017").db('apify')
      end
    end
  end

  # Error config
  not_found do
    haml :'404'
  end

  error 500..510 do
    haml :'500'
  end
end