function logSelectors(element){
  $(element).find('*').click(function(event){
    var xpath = $(this).getXPath();
    xpath = "/" + xpath.join('/');
    var css = $(this).getCSSPath();
    console.log("XPath:" + xpath);
    console.log("CSS:" + css);
    var xpathCount = document.evaluate('count(' + xpath + ')', document, null, XPathResult.ANY_TYPE, null).numberValue;
    var cssCount = $(css).size();
    console.log("XPath count:" + xpathCount);
    console.log("CSS count:" + cssCount);
    event.stopPropagation();
    event.preventDefault();
  });
}