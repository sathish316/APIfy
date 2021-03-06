<script type="text/javascript">
    mixpanel.track("CreateTutorial");
</script>
## Tutorial

## Create API

You're making an app to track all your favorite <a href="http://www.imdb.com/title/tt0898266/" target="_blank">Big Bang Theory</a> TV show episodes. Except you don't have an API to get all the episodes.  

You check out <a href="http://www.imdb.com/title/tt0898266/episodes" target="_blank">IMDB</a>. But IMDB doesn't have an API :(

<a href="http://en.wikipedia.org/wiki/List_of_The_Big_Bang_Theory_episodes" target="_blank">Wikipedia</a> has a list of episodes for all 5 seasons :)

It's time to "*break out emacs and modify the perl script*" to fetch all episodes and dump it in database. Or you can just [create an API](/resources/new) in APIfy.

1. Open wiki page in Firefox or Chrome.
  
    <a href="http://en.wikipedia.org/wiki/List_of_The_Big_Bang_Theory_episodes" target="_blank">http://en.wikipedia.org/wiki/List_of_The_Big_Bang_Theory_episodes</a>

2. Right click on any episode and click Inspect
    
    If you're using Firefox, check out [Firebug](https://addons.mozilla.org/en-US/firefox/addon/firebug/) and [Firefinder](https://addons.mozilla.org/en-US/firefox/addon/firefinder-for-firebug/)

    ![Inspect](/img/tutorial_inspect_small.png)

    <br/>

3. Use Firefox / Chrome Inspect to get CSS or XPATH selector for each attribute you want in your API.

    Drag
    <a href="javascript: (function(){ var myNamespace = 'findXpath72789'; var myURL='https://dl.dropbox.com/u/848981/it/xp/xp-cld.js'; if (window[myNamespace]) window[myNamespace](); else { var elt=document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]; if (elt) { var script=document.createElement('script'); script.type='text/javascript'; script.src=myURL; elt.appendChild(script); } else alert('You must be on a html page for this to work'); } })(); ; void 0;">XCPath</a>
    bookmarklet to your web browsers bookmark toolbar to easily find CSS/XPath in any webpage

    APIfy has CSS and XPATH cheatsheets:

    - Press 'c' to open CSS cheatsheet
    - Press 'x' to open XPATH cheatsheet

    To select episode number and title:

    - episode: **tr.vevent th**
    - title: **tr.vevent td.summary**
    
    <br/>
    W3Schools' [CSS selectors](http://www.w3schools.com/cssref/css_selectors.asp) and [XPATH selectors](http://www.w3schools.com/xpath/xpath_syntax.asp) is a useful reference
    <br/>

4. Go to [Create API](/resources/new) in APIfy. Enter HTML URL, API Path and attributes with CSS/XPATH selectors

    ![Inspect](/img/tutorial_create_api.png)

    Choose Unique Attribute. Each record in API must have a **Unique attribute** like episode number

    <br/>

5. That's it! Now you can consume these APIs directly as JSON or share it with others. 

    * [http://apify.heroku.com/api/big_bang_theory_episodes.json](http://apify.heroku.com/api/big_bang_theory_episodes.json)
    * [http://apify.heroku.com/api/big_bang_theory_episodes/5.json](http://apify.heroku.com/api/big_bang_theory_episodes/5.json)

    <br/>
    If you want to use APIs from Ruby, Javascript (JSONP), Mobile or any platform, check out examples [here](/tutorial/use)
    <br/>

6. You can also <a class='btn btn-mini btn-info edit_api_btn' href='/resources/4fc1d1d034b055e4a0000001'><i class='icon-ok'></i>Test</a> your API directly from APIfy

    ![Inspect](/img/tutorial_test.png)

    <br/>

#### Bonus Tip

If you're using Firefinder, you can check selectors directly.

![Inspect](/img/tutorial_firefinder.png)