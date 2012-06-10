jQuery.fn.extend({
	getXPath: function(path) {
		var node = $(this)[0];
		var leafNode = typeof(path) == 'undefined';
	  path = path || [];
	  if(node.parentNode) {
	    path = $(node.parentNode).getXPath(path);
	  }

	  if(leafNode){
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
		}

	  if(node.nodeType == 1) {
	  	var id = node.id ? "@id='"+node.id+"'" : '';
	  	var _class = node.className ? "starts-with(@class,'"+ node.className.
	  		replace(/\s*firefly-css-highlight/,'').
	  		replace(/\s*firefly-xpath-highlight/,'')+"')" : '';
	  	var position = count > 0 ? "position() = "+count : '';
	    path.push(node.nodeName.toLowerCase() + this._getXPathAttributeConditions(id, _class, position));
	  }
	  return path;
	},

	_getXPathAttributeConditions: function(id, _class, position){
		var attrs = [];
		if(id.length > 0) attrs.push(id);
		if(_class.length > 0) attrs.push(_class);
		if(position.length > 0) attrs.push(position)
		return (attrs.length > 0 ? "[" + attrs.join(' and ') + "]": '');
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
		var leafNode = typeof(path) == 'undefined';
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
		if ( typeof _class != 'undefined' ){
			_class = _class.replace(/\s*firefly-css-highlight/,'').replace(/\s*firefly-xpath-highlight/,'');
			_class = _class.split(/[\s\n]+/).join('.');
			if(_class.length > 0){
				cur += '.' + _class;
			}
		}

		var parent = this.parent();
		var sameTagSiblings = parent.children(name);
    if ((sameTagSiblings.length > 1) && leafNode) { 
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
