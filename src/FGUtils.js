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
  addCSSRule, getIEVersion, isTouchDevice,
  registerEventHandler, unregisterEventHandler, stopPropagation,
  hexOpacityToRGBA, rgbToHex, getRandomHexColor, getRandomContrastingHexColor,
  hexToRGB_ar, getBrightnessFromRGBAr, floatToArray,
  createElementWithId,
  removeClassname, addClassname, getStyle, padString,
  treatAsUTC, daysBetween, getFormattedDate,
  getFunctionFromString, getGUID, changeSelectByOption, manualEvent,
  updateSelectOptionList, getNewStylesheet,
  makeLocal, isEmpty, logMsg;


  /* -------------------------------------------------------------------------------
    extend some global objects
  ---------------------------------------------------------------------------------- */

  String.prototype.isEmpty = function() {
    return (!this || /^\s*$/.test(this));
  };



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

  //http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
  // Get Day of Year
  Date.prototype.getDOY = function() {
      var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
          mn = this.getMonth(),
          dn = this.getDate(),
          dayOfYear = dayCount[mn] + dn;

      if(mn > 1 && this.isLeapYear()) { dayOfYear++ };
      return dayOfYear;
  };

	Date.prototype.getShortISO = function() {
		return this.toISOString().substring(0, 10)
	};

  Date.prototype.getWeekDay = function(length) {
      var ret,
          weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      ret = weekday[this.getDay()];
      if (length > 0) { ret = ret.substring(0, length); }

      return ret;
  };
  

  // https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
  Date.prototype.getWeekNumber = function(){
    var yearStart,
      d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())),
      dayNum = d.getUTCDay() || 7;

    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));

    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
  };


  /* -------------------------------------------------------------------------------
    general helpers
  ---------------------------------------------------------------------------------- */

  makeLocal = function(toClass, fromClass) {
    var key;
    for (key in fromClass) {
      toClass[key] = fromClass[key];
    }
  };


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
    // logMsg("node: " + node);
    // logMsg("event: " + event);
    // logMsg("handler: " + handler);
  };


  unregisterEventHandler = function(node, event, handler, useCapture) {
    useCapture = (useCapture === undefined) ? false : useCapture;
    if (typeof node.removeEventListener === "function") {
      node.removeEventListener(event, handler, useCapture);
    } else {
      node.detachEvent("on" + event, handler);
    }
  };

  rgbToHex = function(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
  };


  hexOpacityToRGBA = function(hexColour, opacity) {
    var r, g, b;
    r = parseInt(hexColour.substring(0,2), 16);
    g = parseInt(hexColour.substring(2,4), 16);
    b = parseInt(hexColour.substring(4,6), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
  };


  hexToRGB_ar = function(hex) {
    var bigint;

    // trim leading hash
    if (hex.substr(0, 1) === "#") { hex = hex.substr(1); }
      
    bigint = parseInt(hex, 16);

    return [
      (bigint >> 16) & 255,
      (bigint >> 8) & 255,
      bigint & 255,
    ];
  };


  getBrightnessFromRGBAr = function(ar) {
    //return ((299 * ar[0]) + (587 * ar[1]) + (114 * ar[2])) / 1000;
    return (ar[0]+ar[0]+ar[2]+ar[1]+ar[1]+ar[1])/6;
  };


  getRandomHexColor = function(tone) {
    // Based on http://www.paulirish.com/2009/random-hex-color-code-snippets/
    var full = 16777215, third = 5592405, smalln = 1864135, hexString;
    if (tone === undefined) {
      hexString = '#' + Math.floor(Math.random()*full).toString(16);
    } else if (tone.toUpperCase() === "LIGHT") {
      hexString = '#' + Math.floor(full - Math.random()*third).toString(16);
    } else if (tone.toUpperCase() === "DARK") {
      hexString = '#' + Math.floor(Math.random()*smalln).toString(16);
    }
    return hexString;
  };

  
  getRandomContrastingHexColor = function(hexColor, minContrast) {
    var brightness1, brightness2, c1RGB_ar, hexContrasting,
        c2RGB_ar = hexToRGB_ar(hexColor),
        brightness2 = getBrightnessFromRGBAr(c2RGB_ar);
    do {
      hexContrasting = getRandomHexColor();
      c1RGB_ar = hexToRGB_ar(hexContrasting);
      brightness1 = getBrightnessFromRGBAr(c1RGB_ar);
      logMsg("brightness1: " + brightness1);
      logMsg((brightness1 + 0.05) / brightness2 + 0.05);
    } while (Math.abs(brightness1 - brightness2) < minContrast);

    return hexContrasting;
  };


  createElementWithId = function(elType, id) {
    var el = document.createElement(elType);
    el.id = id;
    return el;
  };


  removeClassname = function(element, name) {
    if (element) {
     // element.className = element.className.replace(" " + name, "");
      //element.className = element.className.replace(name, "");
      element.className = element.className.replace(new RegExp(name, 'g'), "");
    }
  };


  addClassname = function(element, name) {
    if (element) {
      element.className = element.className.replace(new RegExp(name, 'g'), "");
      //name = " " + name;
      //element.className = element.className.replace(name,"");
      element.className = element.className + " " + name;
    }
  };


  addCSSRule = function(selector, property, newValue, customSheet) {
    var i, curStyleSheet,
        totalStyleSheets = document.styleSheets.length,
        newStyle = property + ": " + newValue;

    if (customSheet) {
      try {
        customSheet.insertRule(selector + " {" + newStyle + "}", customSheet.cssRules.length);
      } catch(err1) {
        try {
          customSheet.addRule(selector, newStyle);
        } catch(err2) {}
      }
    } else {
      for (i = 0; i < totalStyleSheets; i++) {
        curStyleSheet = document.styleSheets[i];
        try {
          curStyleSheet.insertRule(selector + " {" + newStyle + "}", curStyleSheet.cssRules.length);
        } catch(err1) {
          try {
            curStyleSheet.addRule(selector, newStyle);
          } catch(err2) {}
        }
      }
    }
  };


  getNewStylesheet = function() {
    var style = document.createElement("style");
    style.appendChild(document.createTextNode("")); // needed for webkit
    document.head.appendChild(style);
    return style.sheet;
  };


  padString = function(str, pad) {
    var return_str = str;
    if (str.length < pad.length) {
      return_str = pad.substr(0, (pad.length - str.length)) + str;
    }
   ///logMsg(pad + " || " + str + " --> " + return_str);
    return return_str;
  };


  getFunctionFromString = function(str) {
      var
      i,
      scope = window,
      chain_ar = str.split('.'),
      chainLength = chain_ar.length - 1;

      for (i = 0; i < chainLength; i++) {
          scope = scope[chain_ar[i]];
          if (scope === undefined) { return; }
      }

      return scope[chain_ar[chainLength]];
  };


  getFormattedDate = function(date, format) {
    format = format.replace("yy", date.getUTCFullYear().toString().substr(-2));
    format = format.replace("dd", ("0" + (date.getUTCDate())).slice(-2));
    format = format.replace("mm", ("0" + (date.getUTCMonth()+1)).slice(-2));
    return format;
    // =
    //   date.getUTCFullYear() +"/"+
    //   ("0" + (date.getUTCMonth()+1)).slice(-2) +"/"+
    //   ("0" + date.getUTCDate()).slice(-2);
  };


  getStyle = function(el, styleProp) {
    var style;
    if (el.currentStyle) {
      style = el.currentStyle[styleProp];
    } else if (window.getComputedStyle) {
      style = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    }
    return style;
  };


  logMsg = function(msg) {
    console.log(msg);
  };

  
  isEmpty = function(obj) {
    var prop;
    for(prop in obj) {
      if(obj.hasOwnProperty(prop)) { return false; }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  };


  floatToArray = function(float) {
    var numStr = "" + float;
    if (numStr.indexOf(".") === -1) {
      numStr += ".00";
    }
    return numStr.split(".");
  };


  // ----------------------------------------------------------
  // A short snippet for detecting versions of IE in JavaScript
  // without resorting to user-agent sniffing
  // http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/
  // ----------------------------------------------------------
  // If you're not in IE (or IE version is less than 5) then:
  //     getIEVersion() === undefined
  // If you're in IE (>=5) then you can determine which version:
  //     getIEVersion() === 7; // IE7
  // Thus, to detect IE:
  //     if (getIEVersion()) {}
  // And to detect the version:
  //     getIEVersion() === 6 // IE6
  //     getIEVersion() > 7 // IE8, IE9 ...
  //     getIEVersion() < 9 // Anything less than IE9
  // ----------------------------------------------------------

  // UPDATE: Now using Live NodeList idea from @jdalton
  getIEVersion = function(){
    var undef,
      v = 3,
      div = document.createElement('div'),
      all = div.getElementsByTagName('i');

    while (
      div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
      all[0]
    );

    return v > 4 ? v : undef;
  };


  isTouchDevice = function() {
    // window.alert("ontouchstart in window: " + ('ontouchstart' in window) );
    // window.alert("onmsgesturechange in window: " + ('onmsgesturechange' in window) );
    // return 'ontouchstart' in window || 'onmsgesturechange' in window;

     return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
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


	// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	getGUID = function() {
		/*return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});*/
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
	};


  updateSelectOptionList = function(el, optionsData) {
    var option, option_el;

    while (el.options.length) {
      el.options.remove(el.options.length -1);
    }
    for (option in optionsData) {
      option_el = el.options[el.options.length] = new Option(optionsData[option].name, optionsData[option].class);
      addClassname(option_el, optionsData[option].class);
    }
  };


	changeSelectByOption = function(el, option) {
		var i, options = el.options;
		for (i = 0; i < options.length; i++) {
			if (options[i].value === option) {
				el.selectedIndex = i;
				break;
			}
		}
	};


	manualEvent = function(el, eventName) {
		var evt;
		if ("createEvent" in document) {
			evt = document.createEvent("HTMLEvents");
			evt.initEvent(eventName, false, true);
			el.dispatchEvent(evt);
		} else{
			el.fireEvent("on" + eventName);
		}
	};



  return {
    /*
    ---------------------------------------------------------
                PUBLIC
    ---------------------------------------------------------
    */
    makeLocal: makeLocal,
    registerEventHandler: registerEventHandler,
    unregisterEventHandler: unregisterEventHandler,
    stopPropagation: stopPropagation,
    removeClassname: removeClassname,
    addClassname: addClassname,
    addCSSRule: addCSSRule,
    hexOpacityToRGBA: hexOpacityToRGBA,
    rgbToHex: rgbToHex,
    getRandomHexColor: getRandomHexColor,
    getRandomContrastingHexColor: getRandomContrastingHexColor,
    getBrightnessFromRGBAr: getBrightnessFromRGBAr,
    hexToRGB_ar: hexToRGB_ar,
    createElementWithId: createElementWithId,
    getFunctionFromString: getFunctionFromString,
    getFormattedDate: getFormattedDate,
    treatAsUTC: treatAsUTC,
    padString: padString,
    daysBetween: daysBetween,
    floatToArray: floatToArray,
    logMsg: logMsg,
    isEmpty: isEmpty,
    getNewStylesheet: getNewStylesheet,
    getIEVersion: getIEVersion,
    getStyle: getStyle,
    isTouchDevice: isTouchDevice,
		changeSelectByOption: changeSelectByOption,
		updateSelectOptionList: updateSelectOptionList,
		manualEvent: manualEvent,
		getGUID: getGUID
  };

}());
