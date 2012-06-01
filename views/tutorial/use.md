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

APIfy APIs can be consumed using [ActiveResource](http://apidock.com/rails/ActiveResource/Base)

APIfy json does not include root. Make sure you have the following in your config:

<pre class='prettyprint'>
  <code>
ActiveResource::Base.include_root_in_json = false
  </code>
</pre>

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

Complete example is [here]()

### <a id='javascript'></a>Use API from Javascript using JSONP

TODO

### Use API from Python

TODO

### Use API from Node.js

TODO

### Use API from iOS

TODO

### Use API from Android

TODO