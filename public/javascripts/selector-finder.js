jQuery.fn.extend({
	getXPath: function(path) {
		var node = $(this)[0];
	  path = path || [];
	  if(node.parentNode) {
	    path = $(node.parentNode).getXPath(path);
	  }

	  if(node.previousSibling) {
	    var count = 1;
	    var sibling = node.previousSibling
	    do {
	      if(sibling.nodeType == 1 && sibling.nodeName == node.nodeName) {count++;}
	      sibling = sibling.previousSibling;
	    } while(sibling);
	    if(count == 1) {count = null;}
	  } else if(node.nextSibling) {
	    var sibling = node.nextSibling;
	    do {
	      if(sibling.nodeType == 1 && sibling.nodeName == node.nodeName) {
	        var count = 1;
	        sibling = null;
	      } else {
	        var count = null;
	        sibling = sibling.previousSibling;
	      }
	    } while(sibling);
	  }

	  if(node.nodeType == 1) {
	    path.push(node.nodeName.toLowerCase() + (node.id ? "[@id='"+node.id+"']" : count > 0 ? "["+count+"]" : ''));
	  }
	  return path;
	},

	/*
		jQuery-GetPath v0.01, by Dave Cardwell. (2007-04-27)
		
		http://davecardwell.co.uk/javascript/jquery/plugins/jquery-getpath/
		
		Copyright (c)2007 Dave Cardwell. All rights reserved.
		Released under the MIT License.
		
		
		Usage:
		var path = $('#foo').getPath();

		Modified to support nth-child selector
	*/

	getCSSPath: function( path ) {
		// The first time this function is called, path won't be defined.
		if ( typeof path == 'undefined' ) path = '';

		// If this element is <html> we've reached the end of the path.
		if ( this.is('html') )
			return 'html' + path;

		// Add the element name.
		var cur = this.get(0).nodeName.toLowerCase();

		// Determine the IDs and path.
		var id    = this.attr('id'),
		    _class = this.attr('class');


		// Add the #id if there is one.
		if ( typeof id != 'undefined' )
			cur += '#' + id;

		// Add any classes.
		if ( typeof _class != 'undefined' )
			cur += '.' + _class.split(/[\s\n]+/).join('.');

		var parent = this.parent();
		var sameTagSiblings = parent.children(name);
    if (sameTagSiblings.length > 1 && path == '') { 
      allSiblings = parent.children();
      var index = allSiblings.index(this) + 1;
      if (index > 1) {
        cur += ':nth-child(' + index + ')';
      }
    }

		// Recurse up the DOM.
		return parent.getCSSPath( ' > ' + cur + path );
	}
});
