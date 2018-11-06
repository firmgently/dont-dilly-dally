/*
---------------------------------------------------------
  Firm Gently Utilities
  Mark Mayes 2018
---------------------------------------------------------
 */




/* -------------------------------------------------------------------------------
    extend some global objects
  ---------------------------------------------------------------------------------- */


interface String {
  isEmpty():boolean;
}


interface Storage {
  setItem():null;
  getItem():object; // TODO check this type
}


interface Date {
  monthDays():number;
  isLeapYear():boolean;
  getDOY():number;
  getShortISO():string;
  getWeekDay():string;
  getWeekNumber():number;
}



String.prototype.isEmpty = function():boolean {
  return (!this || /^\s*$/.test(this));
};



Storage.prototype.setObject = function(key:string, value:object):void {
  this.setItem(key, JSON.stringify(value));
};


/*
  http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
  Because of short-circuit evaluation, getObject() will immediately return null
  if key is not in Storage. It also will not throw a SyntaxError exception if
  value is "" (the empty string; JSON.parse() cannot handle that). */
Storage.prototype.getObject = function(key:string):object {
  let value:object = this.getItem(key);
  return value && JSON.parse(value);
};



// http://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
Date.prototype.monthDays = function():number {
  let d:Date = new Date(this.getFullYear(), this.getMonth() + 1, 0);
  return d.getDate();
};


// http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
Date.prototype.isLeapYear = function():boolean {
  let year:number = this.getFullYear();
  if ((year & 3) !== 0) { return false; }
  return ((year % 100) !== 0 || (year % 400) === 0);
};


//http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
// Get Day of Year
Date.prototype.getDOY = function():number {
  let dayCount:number[] = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    mn:number = this.getMonth(),
    dn:number = this.getDate(),
    dayOfYear:number = dayCount[mn] + dn;

  if(mn > 1 && this.isLeapYear()) { dayOfYear++ };
  return dayOfYear;
};


Date.prototype.getShortISO = function():string {
  return this.toISOString().substring(0, 10)
};


Date.prototype.getWeekDay = function(length:number):string {
  let ret:string,
    weekday:string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  ret = weekday[this.getDay()];
  if (length > 0) { ret = ret.substring(0, length); }

  return ret;
};


// https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
Date.prototype.getWeekNumber = function():number {
  let yearStart:Date,
    d:Date = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())),
    dayNum:number = d.getUTCDay() || 7;

  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));

  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};




/* -------------------------------------------------------------------------------
    general helpers
  ---------------------------------------------------------------------------------- */


export const makeLocal = (toClass:object, fromClass:object):void => {
  for (var key:string in fromClass) {
    toClass[key] = fromClass[key];
  }
}


// prevent bubbling/propagation/default events (image drag and drop etc)
// also when showing another image on click we don't want the event to bubble
// up to its container, as a click on the container closes the overlay
export const stopPropagation = (e:Event):boolean => {
  if (e.preventDefault) { e.preventDefault(); }
  if (e.stopPropagation) { e.stopPropagation(); }
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
};


export const registerEventHandler = (node:Node, event:Event, handler:Function, useCapture:boolean):void => {
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


export const unregisterEventHandler = (node:Node, event:Event, handler:Function, useCapture:boolean):void => {
  useCapture = (useCapture === undefined) ? false : useCapture;
  if (typeof node.removeEventListener === "function") {
    node.removeEventListener(event, handler, useCapture);
  } else {
    node.detachEvent("on" + event, handler);
  }
};


export const rgbToHex = (r:number, g:number, b:number):string => {
  return ((r << 16) | (g << 8) | b).toString(16);
}


export const hexOpacityToRGBA = (hexColour:string, opacity:number):string => {
  let r:number = parseInt(hexColour.substring(0,2), 16);
  let g:number = parseInt(hexColour.substring(2,4), 16);
  let b:number = parseInt(hexColour.substring(4,6), 16);
  return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
};


export const hexToRGB_ar = (hex:string):number[] => {
  // trim leading hash
  if (hex.substr(0, 1) === "#") { hex = hex.substr(1); }

  let bigint:number = parseInt(hex, 16);

  return [
    (bigint >> 16) & 255,
    (bigint >> 8) & 255,
    bigint & 255,
  ];
};


export const getBrightnessFromRGBAr = (ar:number):number => {
  //return ((299 * ar[0]) + (587 * ar[1]) + (114 * ar[2])) / 1000;
  return (ar[0]+ar[0]+ar[2]+ar[1]+ar[1]+ar[1])/6;
};


export const getRandomHexColor = (tone:string):string => {
  // Based on http://www.paulirish.com/2009/random-hex-color-code-snippets/
  let full:number = 16777215, third:number = 5592405, smalln:number = 1864135,
    hexString:string;
  if (tone === undefined) {
    hexString = '#' + Math.floor(Math.random()*full).toString(16);
  } else if (tone.toUpperCase() === "LIGHT") {
    hexString = '#' + Math.floor(full - Math.random()*third).toString(16);
  } else if (tone.toUpperCase() === "DARK") {
    hexString = '#' + Math.floor(Math.random()*smalln).toString(16);
  }
  return hexString;
};


export const getRandomContrastingHexColor = (hexColor:string, minContrast:number):string => {
  let brightness1:number, c1RGB_ar:number[], hexContrasting:string;
  let c2RGB_ar:number[] = hexToRGB_ar(hexColor);
  let brightness2:number = getBrightnessFromRGBAr(c2RGB_ar);
  do {
    hexContrasting = getRandomHexColor();
    c1RGB_ar = hexToRGB_ar(hexContrasting);
    brightness1 = getBrightnessFromRGBAr(c1RGB_ar);
    logMsg("brightness1: " + brightness1);
    logMsg((brightness1 + 0.05) / brightness2 + 0.05);
  } while (Math.abs(brightness1 - brightness2) < minContrast);

  return hexContrasting;
};


export const createElementWithId = (elType:string, id:string):HTMLElement => {
  let el:HTMLElement = document.createElement(elType);
  el.id = id;
  return el;
};


export const removeClassname = (element:HTMLElement, name:string):void => {
  if (element) {
    element.className = element.className.replace(new RegExp(name, 'g'), "");
  }
};


export const addClassname = (element:HTMLElement, name:string):void => {
  if (element) {
    element.className = element.className.replace(new RegExp(name, 'g'), "");
    element.className = element.className + " " + name;
  }
};


export const addCSSRule = (selector:string, property:string, newValue:string, customSheet:CSSStyleSheet) => {
  let curStyleSheet:CSSStyleSheet;
  let totalStyleSheets:number = document.styleSheets.length;
  let newStyle:string = property + ": " + newValue;

  if (customSheet) {
    try {
      customSheet.insertRule(selector + " {" + newStyle + "}", customSheet.cssRules.length);
    } catch(err1) {
      try {
        customSheet.addRule(selector, newStyle);
      } catch(err2) {}
    }
  } else {
    for (let i = 0; i < totalStyleSheets; i++) {
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


export const getNewStylesheet = ():CSSStyleSheet => {
  let style:HTMLElement = document.createElement("style");
  style.appendChild(document.createTextNode("")); // needed for webkit
  document.head.appendChild(style);
  return style.sheet;
};


export const padString = (str:string, pad:string):string => {
  let return_str:string = str;
  if (str.length < pad.length) {
    return_str = pad.substr(0, (pad.length - str.length)) + str;
  }
  return return_str;
};


export const getFunctionFromString = (str):Function => {
  let scope:node = window,
    chain_ar:string[] = str.split('.'),
    chainLength:number = chain_ar.length - 1;

  for (let i = 0; i < chainLength; i++) {
    scope = scope[chain_ar[i]];
    if (scope === undefined) { return; }
  }

  return scope[chain_ar[chainLength]];
};


export const getFormattedDate = (date:Date, format:string):string => {
  let format:string = format.replace("yy", date.getUTCFullYear().toString().substr(-2));
  format = format.replace("dd", ("0" + (date.getUTCDate())).slice(-2));
  format = format.replace("mm", ("0" + (date.getUTCMonth()+1)).slice(-2));
  return format;
};


export const getStyle = (el:HTMLElement, styleProp:string):object => {
  let style:object;
  if (el.currentStyle) {
    style = el.currentStyle[styleProp];
  } else if (window.getComputedStyle) {
    style = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  }
  return style;
};


export const logMsg = (msg:string):void => {
  console.log(msg);
};


export const isEmpty = (obj:object):boolean => {
  for(let prop:string in obj) {
    if(obj.hasOwnProperty(prop)) { return false; }
  }
  return JSON.stringify(obj) === JSON.stringify({});
};


export const floatToArray = (float:number):number[] => {
  let numStr:string = "" + float;
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
export const getIEVersion = ():number => {
  let undef:undefined,
    v:number = 3,
    div:HTMLElement = document.createElement('div'),
    allEls:NodeList = div.getElementsByTagName('i');

  while (
    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
    allEls[0]
  );

  return v > 4 ? v : undef;
};


export const isTouchDevice = ():boolean => {
  // window.alert("ontouchstart in window: " + ('ontouchstart' in window) );
  // window.alert("onmsgesturechange in window: " + ('onmsgesturechange' in window) );
  // return 'ontouchstart' in window || 'onmsgesturechange' in window;
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
};


// http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
export const treatAsUTC = (date:Date):Date => {
  let result:Date = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
};


export const daysBetween = (startDate, endDate):number => {
  let msPerDay:number = 24 * 60 * 60 * 1000;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / msPerDay;
};


// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export const getGUID = ():string => {
  /*return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });*/
  let d:number = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};


export const updateSelectOptionList = (el:HTMLElement, optionsData:object):void => {
  let option_el:HTMLElement;

  while (el.options.length) {
    el.options.remove(el.options.length -1);
  }
  for (let option:string in optionsData) {
    option_el = el.options[el.options.length] = new Option(optionsData[option].name, optionsData[option].class);
    addClassname(option_el, optionsData[option].class);
  }
};


export const changeSelectByOption = (el:HTMLElement, option):void => {
  let options = el.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === option) {
      el.selectedIndex = i;
      break;
    }
  }
};


export const manualEvent = (el:HTMLElement, eventName:string):void => {
  let evt:Event;
  if ("createEvent" in document) {
    evt = document.createEvent("HTMLEvents");
    evt.initEvent(eventName, false, true);
    el.dispatchEvent(evt);
  } else{
    el.fireEvent("on" + eventName);
  }
};

