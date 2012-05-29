<script type="text/javascript">
    mixpanel.track("CreateTutorial")
</script>
## Tutorial

## Create API

You're making an app to track all your favorite [Big Bang Theory](http://www.imdb.com/title/tt0898266/) TV show episodes. Except you don't have an API to get all the episodes.  

You check out [IMDB](http://www.imdb.com/title/tt0898266/episodes). But IMDB doesn't have an API :(

[Wikipedia](http://en.wikipedia.org/wiki/List_of_The_Big_Bang_Theory_episodes) has a list of episodes for all 5 seasons :)

You "*just gotta break out emacs and modify the perl script*" to fetch all episodes and dump it in database. Or you can just [create](/resources/new) an API in APIfy.

1. Open wiki page in Firefox or Chrome.
  
    [http://en.wikipedia.org/wiki/List_of_The_Big_Bang_Theory_episodes](http://en.wikipedia.org/wiki/List_of_The_Big_Bang_Theory_episodes)

2. Right click on any episode and click Inspect
    
    If you're using Firefox, check out [Firebug](https://addons.mozilla.org/en-US/firefox/addon/firebug/) and [Firefinder](https://addons.mozilla.org/en-US/firefox/addon/firefinder-for-firebug/)

    ![Inspect](/img/tutorial_inspect_small.png)

    <br/>

3. Use any Insepct tool to get CSS or XPATH selector for each attribute you want in your API.
    
    Don't worry if you haven't used CSS or XPATH selectors before. W3Schools' one page reference on [CSS Selectors](http://www.w3schools.com/cssref/css_selectors.asp) and [XPATH Selectors](http://www.w3schools.com/xpath/xpath_syntax.asp) is all you need

    To select episode number and title:

    - episode: **tr.vevent th**
    - title: **tr.vevent td.summary**

    <br/>

4. Go to [Create API](/resources/new) in APIfy. Enter Html Url, API Path, Unique key and attributes

    ![Inspect](/img/tutorial_create_api.png)

    Each record in API must have a unique **key** like episode number

    <br/>

5. That's it! Now you can consume these APIs directly as JSON or share it with others. 

    * [http://apify.heroku.com/api/big_bang_theory_episodess.json](http://apify.heroku.com/api/big_bang_theory_episodess.json)
    * [http://apify.heroku.com/api/big_bang_theory_episodess/5.json](http://apify.heroku.com/api/big_bang_theory_episodess/5.json)

    <br/>
    If you want to use APIs from Ruby, Javascript (JSONP), Mobile or any platform, check out examples [here](/tutorial/use)
    <br/>

6. You can also <a class='btn btn-mini btn-info edit_api_btn' href='/resources/4fc1d1d034b055e4a0000001'><i class='icon-ok'></i>Test</a> your API directly from APIfy

    ![Inspect](/img/tutorial_test.png)

    <br/>

#### Bonus Tip

If you're using Firefinder, you can check selectors directly.

![Inspect](/img/tutorial_firefinder.png)