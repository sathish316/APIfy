def initialize_resources
  resource = Resource.find_or_create_by({
    name: 'ImdbTop250',
    html: "http://www.imdb.com/chart/top",
    api_path: "imdb_top250_movies",
    key: :rank})
  resource.update_attributes!(dom_attributes: {
    rank: {xpath: "td:nth-child(1)"},
    rating: {xpath: "td:nth-child(2)"},
    title: {xpath: "td:nth=child(3)"},
    votes: {xpath: "td:nth-child(4)"}})
  initialize_resource(resource.api_path)

  resource = Resource.find_or_create_by({
    name: 'DominosPizza',
    html: "http://www.dominos.co.in/menuDetails_ajx.php?catgId=1",
    api_path: "dominos_pizzas",
    key: :name}) 
  resource.update_attributes!(dom_attributes: {
    name: {css: ".menu_lft li a"}, 
    image_url: {xpath: "//li//input//@value"}})
  initialize_resource(resource.api_path)
end

def initialize_resource(api_path)
  resource = Resource.first(conditions: {api_path: api_path})
  eval resource.code
end