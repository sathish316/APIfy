$(function(){
  function logSelectors(element){
    $(element).contents().find('*').bind('click', function(event){
      // XPath selector
      var xpath = $(this).getXPath();
      xpath = "//" + xpath.join('/');
      console.log('xpath:' + xpath);
      $('.fancybox-outer .content-selectors .firefly-xpath-selector').val(xpath);

      // XPath count
      var iframeDoc = window.frames[0].document
      console.log
      var xpathCount = iframeDoc.evaluate('count(' + xpath + ')', iframeDoc, null, XPathResult.ANY_TYPE, null).numberValue;
      console.log("XPath count:" + xpathCount);
      $('.firefly-xpath-count').html(xpathCount);

      // CSS Selector
      var css = $(this).getCSSPath();
      console.log('css:' + css);
      $('.fancybox-outer .content-selectors .firefly-css-selector').val(css);

      // CSS Count
      var cssCount = $(element).contents().find(css).size();
      console.log("CSS count:" + cssCount);
      $('.fancybox-outer .content-selectors .firefly-css-count').html(cssCount);

      event.stopPropagation();
      event.preventDefault();
    });
  }

  $('#preview_page').click(function(){
    var url = $('#resource_html').val();
    console.log('here');
    console.log(url);
    if(url){
      console.log('open ' + url);
      $.fancybox({
        href: url,
        autoSize: true,
        type: "iframe",
        afterShow: function(){
          logSelectors($('.fancybox-inner iframe'));
          $('.fancybox-inner iframe').contents().find('body').find('.apify_overview').click(function(){alert('overview')});
        }
      });
      $('.fancybox-inner iframe').before($('.content-selectors').clone().show());
    }
  });
});