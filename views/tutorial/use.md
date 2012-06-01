<script type="text/javascript">
    mixpanel.track("UseTutorial");
</script>
## Tutorial

APIfy APIs can be used from:

1. [Ruby](#ruby)
2. [Javascript](#javascript)
3. Python
4. Node.js
5. iOS
6. Android
6. Any language with HTTP/JSON libraries

### <a id='ruby'></a>Use API from Ruby/Rails

APIfy API can be consumed using [ActiveResource](http://apidock.com/rails/ActiveResource/Base)

APIfy json does not include root. Make sure you have the following in your config:

<pre class='prettyprint'>
  <code>
ActiveResource::Base.include_root_in_json = false
  </code>
</pre>

Add this to app/models. Model name must be the singular name of the API path.

<pre class='prettyprint'>
  <code>
class BigBangTheoryEpisode < ActiveResource::Base
  self.site = "http://apify.heroku.com/api"
  self.format = :json
end
  </code>
</pre>

Resource can be used from controllers:
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

### <a id='javascript'></a>Use API from Javascript using JSONP

APIfy APIs can be consumed directly from Javascript using JSONP:

To make a JSONP call, use jQuery's getJSON method and append **callback=?** to API URL

<pre class='prettyprint'>
var url = "http://apify.heroku.com/api/big_bang_theory_episodes.json?callback=?"
$.getJSON(url, function(data){
  console.log(JSON.parse(data))
});
</pre>

### Use API from Python

TODO

### Use API from Node.js

TODO

### Use API from iOS

TODO

### Use API from Android

TODO