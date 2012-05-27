class BigBangTheoryEpisode
  include Scrapify::Base
  attribute :episode, css: '.vevent th'
  attribute :title, css: '.vevent td.summary'
  key :episode
end