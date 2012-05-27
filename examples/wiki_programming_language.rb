class WikiProgrammingLanguage
  include Scrapify::Base
  html "http://en.wikipedia.org/wiki/List_of_programming_languages"
  attribute :name, css: "table.multicol ul li a:nth-child(1)"
  key :name
end