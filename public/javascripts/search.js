$('#search-api').typeahead({
  source: function (typeahead, query) {
    mixpanel.track('Search');
    if ($('#search-api').val().length > 2){
      return $.get('/api_search.json', { query: query }, function (data) {
        return typeahead.process(data);
      });
    }
  },
  property: 'name',
  onselect: function(api){
    window.location = api.url;
  }
});