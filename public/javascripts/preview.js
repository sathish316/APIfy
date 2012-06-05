$(function(){
  // $('.fancybox').fancybox();

  $('#preview_page').click(function(){
    var url = $('#resource_html').val();
    console.log('here');
    console.log(url);
    if(url){
      console.log('open ' + url);
      $.fancybox({
        href: url,
        transitionIn: "none",
        transitionOut: "none",
        autoScale: true,
        type: "iframe"
      });
    }
  });
});