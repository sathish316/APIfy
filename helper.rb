class Apify < Sinatra::Base
  helpers do
    def capitalize(str)
      str.capitalize
    end
  end
  register ::Kaminari::Helpers::SinatraHelpers
  register ::Sinatra::Partial
end