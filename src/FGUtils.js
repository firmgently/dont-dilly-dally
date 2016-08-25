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
	hexOpacityToRGBA, getRandomHexColor, createElementWithId,
	removeClassname, addClassname,
  treatAsUTC, daysBetween, getFormattedDate,
	logMsg;


  /* -------------------------------------------------------------------------------
  	extend some global objects
  ---------------------------------------------------------------------------------- */

  Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
  };


/*
  http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
  Because of short-circuit evaluation, getObject() will immediately return null
  if key is not in Storage. It also will not throw a SyntaxError exception if
  value is "" (the empty string; JSON.parse() cannot handle that). */
  Storage.prototype.getObject = function(key) {
      var value = this.getItem(key);
      return value && JSON.parse(value);
  };



	// http://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
	Date.prototype.monthDays= function() {
	    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
	    return d.getDate();
	};


	// http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
	Date.prototype.isLeapYear = function() {
	    var year = this.getFullYear();
	    if ((year & 3) !== 0) { return false; }
	    return ((year % 100) !== 0 || (year % 400) === 0);
	};



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


	getRandomHexColor = function(tone) {
		// Based on http://www.paulirish.com/2009/random-hex-color-code-snippets/
		var full = 16777215, mid = 8388607, third = 5592405, smalln = 1864135, hexString;
		if (tone === undefined) {
			hexString = '#' + Math.floor(Math.random()*full).toString(16);
		} else if (tone.toUpperCase() === "LIGHT") {
			hexString = '#' + Math.floor(full - Math.random()*third).toString(16);
		} else if (tone.toUpperCase() === "DARK") {
			hexString = '#' + Math.floor(Math.random()*smalln).toString(16);
		}
		return hexString;
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


	getFormattedDate = function(date, format) {
		var dateString;
		format = format.replace("yy", date.getUTCFullYear());
		format = format.replace("dd", ("0" + (date.getUTCDate())).slice(-2));
		format = format.replace("mm", ("0" + (date.getUTCMonth()+1)).slice(-2));
		return format;
		// =
		//   date.getUTCFullYear() +"/"+
		//   ("0" + (date.getUTCMonth()+1)).slice(-2) +"/"+
		//   ("0" + date.getUTCDate()).slice(-2);
	};


	logMsg = function(msg) {
    console.log(msg);
  };


  // http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
  treatAsUTC = function(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  };
  daysBetween = function(startDate, endDate) {
      var msPerDay = 24 * 60 * 60 * 1000;
      return (treatAsUTC(endDate) - treatAsUTC(startDate)) / msPerDay;
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
		getRandomHexColor: getRandomHexColor,
		createElementWithId: createElementWithId,
		getFormattedDate: getFormattedDate,
		treatAsUTC: treatAsUTC,
		daysBetween: daysBetween,
		logMsg: logMsg
	};

}());
