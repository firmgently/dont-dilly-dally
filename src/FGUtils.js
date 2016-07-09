/*
---------------------------------------------------------
  Firm Gently Utilities
  Mark Mayes 2016
---------------------------------------------------------
*/
// create namespace: uk.co.firmgently
var uk = (uk !== undefined) ? uk : {};
uk.co = (uk.co !== undefined) ? uk.co : {};
uk.co.firmgently = (uk.co.firmgently !== undefined) ? uk.co.firmgently : {};
//
uk.co.firmgently.FGUtils = (function() {
	"use strict";

	var
	addCSSRule,
	registerEventHandler, unregisterEventHandler, stopPropagation,
	hexOpacityToRGBA, createElementWithId,
	removeClassname, addClassname,
	logMsg;


	/* -------------------------------------------------------------------------------
		general helpers
	---------------------------------------------------------------------------------- */

	// prevent bubbling/propagation/default events (image drag and drop etc)
	// also when showing another image on click we don't want the event to bubble
	// up to its container, as a click on the container closes the overlay
	stopPropagation = function(e) {
    if (e.preventDefault) { e.preventDefault(); }
    if (e.stopPropagation) { e.stopPropagation(); }
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
	};


	registerEventHandler = function(node, event, handler, useCapture) {
    useCapture = (useCapture === undefined) ? false : useCapture;
    if (typeof node.addEventListener === "function") {
      node.addEventListener(event, handler, useCapture);
    } else {
      node.attachEvent("on" + event, handler);
    }
  };


	unregisterEventHandler = function(node, event, handler, useCapture) {
    useCapture = (useCapture === undefined) ? false : useCapture;
    if (typeof node.removeEventListener === "function") {
      node.removeEventListener(event, handler, useCapture);
    } else {
      node.detachEvent("on" + event, handler);
    }
  };


  hexOpacityToRGBA = function(hexColour, opacity) {
    var r, g, b;
    r = parseInt(hexColour.substring(0,2), 16);
    g = parseInt(hexColour.substring(2,4), 16);
    b = parseInt(hexColour.substring(4,6), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
  };


  createElementWithId = function(elType, id) {
    var el = document.createElement(elType);
		el.id = id;
    return el;
  };


  removeClassname = function(element, name) {
    element.className = element.className.replace(" " + name,"");
  };


  addClassname = function(element, name) {
    name = " " + name;
    element.className = element.className.replace(name,"");
    element.className = element.className + name;
  };


	addCSSRule = function(selector, property, newValue) {
		logMsg("selector: " + selector);
		var	i, curStyleSheet,
			totalStyleSheets = document.styleSheets.length,
			newStyle = property + ": " + newValue;
		for (i = 0; i < totalStyleSheets; i++) {
			curStyleSheet = document.styleSheets[i];
			logMsg("curStyleSheet: " + curStyleSheet);
			try {
				curStyleSheet.insertRule(selector + " {" + newStyle + "}", curStyleSheet.cssRules.length);
			} catch(err1) {
				try {
					curStyleSheet.addRule(selector, newStyle);
				} catch(err2) {}
			}
		}
	};


	logMsg = function(msg) {
    console.log(msg);
  };




	return {
		/*
		---------------------------------------------------------
								PUBLIC
		---------------------------------------------------------
		*/
		registerEventHandler: registerEventHandler,
		unregisterEventHandler: unregisterEventHandler,
		stopPropagation: stopPropagation,
		removeClassname: removeClassname,
		addClassname: addClassname,
		addCSSRule: addCSSRule,
		hexOpacityToRGBA: hexOpacityToRGBA,
		createElementWithId: createElementWithId,
		logMsg: logMsg
	};

}());
