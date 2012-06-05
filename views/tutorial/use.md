<script type="text/javascript">
    mixpanel.track("UseTutorial");
</script>
## Tutorial

APIfy APIs can be used from:

1. [Ruby](#ruby)
2. [Python](#python)
3. [Javascript](#javascript)
4. Node.js
5. iOS
6. Android
6. Any language with HTTP/JSON libraries

### <a id='ruby'></a>Use API from Ruby/Rails

API can be consumed using [ActiveResource](http://apidock.com/rails/ActiveResource/Base)

Add ActiveResource model in app/models. 

Model name must be the singular name of the API path.
If it does not match, use self.prefix to override path.

<pre class='prettyprint'>
  <code>
class BigBangTheoryEpisode < ActiveResource::Base
  self.site = "http://apify.heroku.com/api"
  self.format = :json
end
  </code>
</pre>

This model can be used from controllers to fetch all records or fetch one record by id:
<pre class='prettyprint'>
class EpisodesController < ApplicationController
  def index
    @episodes = BigBangTheoryEpisode.all
  end

  def show
    @episode = BigBangTheoryEpisode.find(params[:id])
  end
end
</pre>

APIfy json does not include root. Make sure you have the following in your config:

<pre class='prettyprint'>
  <code>
ActiveResource::Base.include_root_in_json = false
  </code>
</pre>

### <a id='python'></a>Use API from Python

To get json data use urllib and json

<pre class='prettyprint'>
import urllib, json
url = 'http://apify.heroku.com/api/big_bang_theory_episodes.json'
json_response = urllib.urlopen(url).read()
big_bang_theory_episodes = json.loads(json_response)
</pre>

big_bang_theory_episodes is a List where each episode is a dictionary

<pre class='prettyprint'>
>>> len(big_bang_theory_episodes)
111

>>> big_bang_theory_episodes[0]
{'episode': '1', 'title': "Pilot"}

>>> big_bang_theory_episodes[5]['title']
"The Middle-Earth Paradigm"
</pre>

### <a id='javascript'></a>Use API from Javascript using JSONP

API can be consumed directly from Javascript / HTML using JSONP:

To make a JSONP call, use jQuery's getJSON method and append **callback=?** to API URL

<pre class='prettyprint'>
var url = "http://apify.heroku.com/api/big_bang_theory_episodes.json?callback=?"
$.getJSON(url, function(data){
  console.log(JSON.parse(data))
});
</pre>

### Use API from Node.js

TODO

### Use API from iOS

TODO

### Use API from Android

TODO