$(function(){
  function logSelectors(element){
    $(element).contents().find('*').bind('click', function(event){
      // XPath selector
      var xpath = $(this).getXPath();
      xpath = "//" + xpath.join('/');
      console.log('xpath:' + xpath);
      $('.fancybox-outer .content-selectors .firefly-xpath-selector').val(xpath);
      updateXPathCount();

      // CSS Selector
      var css = $(this).getCSSPath();
      console.log('css:' + css);
      $('.fancybox-outer .content-selectors .firefly-css-selector').val(css);
      updateCssCount();

      event.stopPropagation();
      event.preventDefault();
    });
  }

  function updateXPathCount(){
    var xpath = $('.fancybox-outer .content-selectors .firefly-xpath-selector').val();
    var iframeDoc = window.frames[0].document;
    var xpathCount = iframeDoc.evaluate('count(' + xpath + ')', iframeDoc, null, XPathResult.ANY_TYPE, null).numberValue;
    console.log("XPath count:" + xpathCount);
    $('.firefly-xpath-count').html(xpathCount);
  }

  function updateCssCount(){
    var css = $('.fancybox-outer .content-selectors .firefly-css-selector').val();
    var iframe = $('.fancybox-inner iframe');
    var cssCount = $(iframe).contents().find(css).size();
    console.log("CSS count:" + cssCount);
    $('.fancybox-outer .content-selectors .firefly-css-count').html(cssCount);
  }

  $('#preview_page').click(function(){
    var url = $('#resource_html').val();
    var previewUrl = "/preview?url=" + url;
    if(url){
      $.fancybox({
        href: previewUrl,
        autoSize: true,
        type: "iframe",
        afterShow: function(){
          $('.fancybox-inner iframe').before($('.content-selectors').clone().show());
          logSelectors($('.fancybox-inner iframe'));
        }
      });
    }
  });
});