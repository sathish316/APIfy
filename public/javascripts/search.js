var searchInProgress = false;
$('#search-api').typeahead({
  source: function (typeahead, query) {
    if ($('#search-api').val().length > 2 && !searchInProgress){
      mixpanel.track('Search');
      searchInProgress = true;
      return $.get('/api_search.json', { query: query }, function (data) {
        return typeahead.process(data);
      }).complete(function(){
        searchInProgress = false;
      });
    }
  },
  property: 'name',
  onselect: function(api){
    window.location = api.url;
  }
});