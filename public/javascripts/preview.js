$(function(){
  function logSelectors(element){
    $(element).contents().find('*').unbind('click')
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

      highlight();
      event.stopPropagation();
      // event.preventDefault();
      return false;
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

  function highlight(){
    addStyles();
    highlightXPath();
    highlightCss();
  }

  function addStyles(){
    var iframe = $('.fancybox-inner iframe');
    $(iframe).contents().find('head').find('#firefly-xpath-styles').remove();
    // var style = '<style type="text/css" id="firefly-xpath-styles">.firefly-xpath-highlight { background-color: #57FFF4;}</style>';
    var style = '<style type="text/css" id="firefly-xpath-styles">.firefly-xpath-highlight { outline: 2px solid #FF0000 !important;}</style>';
    $(style).appendTo($(iframe).contents().find('head'));
    $(iframe).contents().find('head').find('#firefly-css-styles').remove();
    var style = '<style type="text/css" id="firefly-css-styles">.firefly-css-highlight { background-color: #99FFCC;}</style>';
    $(style).appendTo($(iframe).contents().find('head'));
  }

  function highlightCss(){
    var iframe = $('.fancybox-inner iframe');
    var css = $('.fancybox-outer .content-selectors .firefly-css-selector').val();
    $(iframe).contents().find('.firefly-css-highlight').removeClass('firefly-css-highlight');
    $(iframe).contents().find(css).addClass('firefly-css-highlight');
  }

  function highlightXPath(){
    var iframe = $('.fancybox-inner iframe');
    var iframeDoc = window.frames[0].document;
    var xpath = $('.fancybox-outer .content-selectors .firefly-xpath-selector').val();
    $(iframe).contents().find('.firefly-xpath-highlight').removeClass('firefly-xpath-highlight');
    var nodes = [];
    try {  
      var iterator = iframeDoc.evaluate(xpath, iframeDoc, null, XPathResult.ANY_TYPE, null);
      var node = iterator.iterateNext();
      while (node) {
        nodes.push(node);
        node = iterator.iterateNext();  
      }   
    } catch (e) {  
      console.log('Error: Document tree modified during iteration ' + e);  
    } 
    for(i=0; i<nodes.length; i++){
      nodes[i].className = nodes[i].className + ' firefly-xpath-highlight';
    }
  }

  function bindSelectorToUpdateCount(){
    $('.fancybox-outer .content-selectors .firefly-xpath-selector').keypress(function(event){
      if(event.keyCode == 13){
        updateXPathCount();
        highlightXPath();
        return false;
      } else {
        return true;
      }
    });
    $('.fancybox-outer .content-selectors .firefly-css-selector').keypress(function(event){
      if(event.keyCode == 13){
        updateCssCount();
        highlightCss();
        return false;
      } else {
        return true;
      }
    })

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
          bindSelectorToUpdateCount();

        }
      });
    }
  });
});