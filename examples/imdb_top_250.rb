class Examples::ImdbTop250
  include ::Scrapify::Base
  html "http://www.imdb.com/chart/top"
  
  attribute :rank, css: "div#main table td:nth-child(1)"
  attribute :rating, css: "div#main table td:nth-child(2)"
  attribute :title, css: "div#main table td:nth-child(3)"
  attribute :votes, css: "div#main table td:nth-child(4)"

  key :rank
end