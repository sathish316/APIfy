$(function(){
  function logSelectors(element){
    $(element).contents().find('*').unbind('click')
    $(element).contents().find('*').bind('click', function(event){
      // XPath selector
      var xpath = $(this).getXPath();
      xpath = "//" + xpath.join('/');
      // console.log('xpath:' + xpath);
      $('.fancybox-outer .content-selectors .firefly-xpath-selector').val(xpath);
      updateXPathCount();

      // CSS Selector
      var css = $(this).getCSSPath();
      // console.log('css:' + css);
      $('.fancybox-outer .content-selectors .firefly-css-selector').val(css);
      updateCssCount();

      highlight();
      event.stopPropagation();
      event.preventDefault();
      return false;
    });
  }

  function bindTooltip(iframe){
    $(iframe).contents().find('th,td,ul,li,a,dt,dd,div,span').each(function(){
      var tooltip = "";
      var tag = 'Tag: ' + $(this).get(0).tagName;
      var css_class = 'Class: ' + ($(this).attr('class') || '-');
      var id = 'Id:' + ($(this).attr('id') || '-')
      tooltip += tag + "\n" + css_class + "\n" + id;
      $(this).attr('title', tooltip);
    });    
  }

  function updateXPathCount(){
    var xpath = $('.fancybox-outer .content-selectors .firefly-xpath-selector').val();
    var iframeDoc = window.frames[0].document;
    var xpathCount = iframeDoc.evaluate('count(' + xpath + ')', iframeDoc, null, XPathResult.ANY_TYPE, null).numberValue;
    // console.log("XPath count:" + xpathCount);
    $('.firefly-xpath-count').html(xpathCount);
  }

  function updateCssCount(){
    var css = $('.fancybox-outer .content-selectors .firefly-css-selector').val();
    var iframe = $('.fancybox-inner iframe');
    var cssCount = $(iframe).contents().find(css).size();
    // console.log("CSS count:" + cssCount);
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

  function resetHightlight(){
    $('.firefly-css-highlight').removeClass('firefly-css-highlight');
    $('.firefly-xpath-highlight').removeClass('firefly-xpath-highlight');
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
    });
  }

  function bindAddButtons(){
    $('.fancybox-outer .content-selectors .add-css-selector').click(function(event){
      var css = $('.fancybox-outer .content-selectors .firefly-css-selector').val();
      var attributeName = $('.fancybox-outer .content-selectors .css-attribute-name').val();
      addAttributeRow(attributeName, css, 'css');
      $('.fancybox-outer .content-selectors .css-attribute-name').val('');
      event.preventDefault();
    });

    $('.fancybox-outer .content-selectors .add-xpath-selector').click(function(event){
      var xpath = $('.fancybox-outer .content-selectors .firefly-xpath-selector').val();
      var attributeName = $('.fancybox-outer .content-selectors .xpath-attribute-name').val();
      addAttributeRow(attributeName, xpath, 'xpath');
      $('.fancybox-outer .content-selectors .xpath-attribute-name').val('');
      event.preventDefault();
    });
  }


  function displaySelectors(){
    $('.fancybox-inner iframe').before($('.content-selectors-template').clone().
      removeClass('content-selectors-template').
      addClass('content-selectors').
      show());
  }

  $('#preview_page').click(function(){
    var url = $('#resource_html').val() || $('#resource_html').text();
    var previewUrl = "/preview?url=" + url;
    if(url){
      $.fancybox({
        href: previewUrl,
        autoSize: true,
        type: "iframe",
        afterShow: function(){
          // $('.fancybox-inner').attr('style', {overflow: 'hidden'});
          displaySelectors();
          logSelectors($('.fancybox-inner iframe'));
          bindTooltip($('.fancybox-inner iframe'));
          bindSelectorToUpdateCount();
          bindAddButtons();
        }
      });
    }
  });

  $(function(){
    $('#preview_page').tooltip({
      placement: $('#preview-tooltip').val()
    });
    if(!$('#resource_html').closest('.control-group').hasClass('error'))
      $('#preview_page').tooltip('show');
    $('#resource_html').bind("propertychange keyup input paste", function(){
      if($(this).val().length > 0){
        $('#preview_page').removeClass('disabled');
      } else {
        $('#preview_page').addClass('disabled');
      }
    });
  })
});