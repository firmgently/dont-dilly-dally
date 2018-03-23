/*
---------------------------------------------------------
  Firm Gently
  DontDillyDally
  Mark Mayes 2016
---------------------------------------------------------
*/
// create namespace: uk.co.firmgently
var uk = (uk !== undefined) ? uk : {};
uk.co = (uk.co !== undefined) ? uk.co : {};
uk.co.firmgently = (uk.co.firmgently !== undefined) ? uk.co.firmgently : {};
//
uk.co.firmgently.DDDConsts = (function() {
  "use strict";



	/* ---------------------------------------------------------------------------
		Create all main constants in CONST object which will be returned by the
    main function
	--------------------------------------------------------------------------- */

	var CONST = {
    APP_ID: "FGDDD",
    SAVE_FILENAME: "DontDillyDally-export",

    PAGETYPE_TIMESHEETS: "timesheets",
    PAGETYPE_CONFIG: "preferences",
    PAGETYPE_JOBSANDCLIENTS: "jobs-and-clients",
    BODYID_TIMESHEETS: "timesheets",
    BODYID_CONFIG: "config",
    BODYID_JOBSANDCLIENTS: "jobsClients",

    GUITYPE_COL: "GUITypeCol",
    GUITYPE_ROW: "GUITypeRow",
    GUITYPE_BTN: "GUITypeBtn",
    GUITYPE_COLORPICKER: "GUITypeColorPicker",
    GUITYPE_RADIOBTN: "GUITypeRadioBtn",
    GUITYPE_TEXTINPUT: "GUITypeTextInput",
    GUITYPE_SELECT: "GUITypeSelect",
    GUITYPE_FORM: "GUITypeForm",
    GUITYPE_SECTION: "GUITypeSection",
    GUITYPE_METHODCALL: "GUITypeMethodCall",
    GUITYPE_UL: "GUITypeUL",

    CLASS_BTNNAV: "btnNav",
    CLASS_BTNMININAV: "btnMiniNav",
    CLASS_FORMMAIN: "formMain",
    CLASS_COL: "col",
    CLASS_ROW: "row",
    CLASS_CLIENTSELECT: "select-client",
    CLASS_JOBSELECT: "select-job",
		CLASS_TODAY: "today",

    TOTAL_STR: "Total",
    DAY_STR: "day",
    CLIENT_STR: "client",
    JOB_STR: "job",
    DAYS_STR: "days",
    CLIENTS_STR: "clients",
    JOBS_STR: "jobs",
    PREFS_STR: "prefs",
    CLIENTSTOTAL_STR: "clientsTotal",
    JOBSTOTAL_STR: "jobsTotal",
    CLIENT_SELECT_PLACEHOLDER: "select client",
    JOB_SELECT_PLACEHOLDER: "select job",
    JOBNOTES_PLACEHOLDER: "job notes",
    MONEYNOTES_PLACEHOLDER: "money notes",
    SEPARATOR_CASH: ".",
    SEPARATOR_TIME: ":",
    TODAY_STR: "today",

    EL_ID_COLHEADING: "column-headings",
    EL_ID_JOBNAMEIN: "jobNameIn",
    EL_ID_CLIENTNAMEIN: "clientNameIn",
    EL_ID_CLIENTSAVEBTN: "saveNewClientBtn",
    EL_ID_JOBSAVEBTN: "saveNewJobBtn",
    EL_ID_SELECTCLIENT: "selectClient",
    EL_ID_SELECTJOB: "selectJob",

    CLIENT_FG_COLPICK: "clientFGPicker",
    CLIENT_BG_COLPICK: "clientBGPicker",
    JOB_FG_COLPICK: "jobFGPicker",
    JOB_BG_COLPICK: "jobBGPicker",

    DATATYPE_JOB: "dataTypeJob",
    DATATYPE_CLIENT: "dataTypeClient",

    ITEMTYPE_TIME: "TIME",
    ITEMTYPE_MONEY: "CASH",
    
    DATAINDICES: {
      itemType:			0,
      numberValue: 	1,
      clientID:			2,
      jobID:				3,
      notes:				4
    },

    CONTENTTYPE_CLIENTS: "contentTypeClients",
    CONTENTTYPE_JOBS: "contentTypeJobs",

    TIMESHEETCONTAINER_ID: "timesheetContainer",
    LOADINGINDICATOR_ID: "loading-indicator",

    PAGEDATA_JOBSANDCLIENTS: {
      pageTitle: "Jobs and Clients",
      intro: "Add, delete or edit jobs and clients."
    },
    PAGEDATA_TIMESHEETS: {
      pageTitle: "Timesheets",
      intro: "Keep track of where you spend your time. Also record payments in and expenses paid out."
    },
    PAGEDATA_CONFIG: {
      pageTitle: "Preferences",
      intro: "Show and hide things and customise settings."
    },

    DATETYPE_YYMMDD: {
      label: "yy/mm/dd"
    },
    DATETYPE_DDMMYY: {
      label: "dd/mm/yy"
    },
    DATETYPE_MMDDYY: {
      label: "mm/dd/yy"
    },

    JOB_DEFAULT_1: {
      name: "Purchasing",
      color: "#000",
      bgcolor: "#0ff"
    },
    JOB_DEFAULT_2: {
      name: "Administration",
      color: "#0f0",
      bgcolor: "#123"
    },

    CLIENT_DEFAULT_1: {
      name: "Will @ ACME CO",
      color: "#fff",
      bgcolor: "#f00"
    },
    CLIENT_DEFAULT_2: {
      name: "Diamond Jules",
      color: "#435",
      bgcolor: "#89a"
    },

    // these string values have to match those used in the GUIDATA_CONFIG options
    TIMESPAN_WEEK: "timespanWeek",
    TIMESPAN_MONTH: "timespanMonth",
    TIMESPAN_YEAR: "timespanYear",

    DAYSINWEEK: 7,
    DAYSINMONTH: 31, // set to maxiumum possible (only used for display purposes)
    DAYSINYEAR: 365,

    // which totals to showing
    SHOWTOTALS_WEEK: "showTotalsWeek",
    SHOWTOTALS_MONTH: "showTotalsMonth",
    SHOWTOTALS_BOTH: "showTotalsWeekAndMonth",

    // minimum minutes per work item
    MINUTEINCREMENTS_1: "minuteIncrement1",
    MINUTEINCREMENTS_15: "minuteIncrement15",
    MINUTEINCREMENTS_30: "minuteIncrement30",

    TXT_STORAGE_UNSUPPORTED: "Sorry - storage is not supported on this device or browser"
  };



	/* ---------------------------------------------------------------------------
    DEFAULTS have to be added after main object is created if they refer to 
    values in that object
	--------------------------------------------------------------------------- */

  CONST.MINUTEINCREMENTS_DEFAULT = CONST.MINUTEINCREMENTS_15;
  CONST.SHOWTOTALS_DEFAULT = CONST.SHOWTOTALS_BOTH;
  CONST.TIMESPAN_DEFAULT = CONST.TIMESPAN_MONTH;
  CONST.DATETYPE_DEFAULT = CONST.DATETYPE_DDMMYY;
  CONST.PAGETYPE_DEFAULT = CONST.PAGETYPE_TIMESHEETS;



	/* ---------------------------------------------------------------------------
    the data to DEFINE THE GUIs depends on constants from this file,
    so we add them to the CONST object here (we couldn't do it during the
    CONST object definition above as the object's properties don't exist
    until the object has been defined)
	--------------------------------------------------------------------------- */

  CONST.GUIDATA_JOBSANDCLIENTS = [
    {
      type: CONST.GUITYPE_COL,
      id: "editClientCol",
      class: CONST.CLASS_COL,
      parent: "main",
    }, {
      type: CONST.GUITYPE_FORM,
      id: "createClientForm",
      class: CONST.CLASS_FORMMAIN,
      title: "Fill in client details",
      parent: "editClientCol",
      el_ar: [
        {
          type: CONST.GUITYPE_ROW,
          id: "clientNewRow",
          class: CONST.CLASS_ROW,
          parent: "createClientForm",
        }, {
          type: CONST.GUITYPE_ROW,
          id: "clientsExistingRow",
          class: CONST.CLASS_ROW,
          parent: "createClientForm",
        }, {
          type: CONST.GUITYPE_BTN,
          label: "Create new",
          id: "createNewClientBtn",
          methodPathStr: "uk.co.firmgently.DontDillyDally.newClientCreate",
          args: [],
          scopeID: "createClientForm",
          parent: "clientNewRow"
        }, {
          type: CONST.GUITYPE_TEXTINPUT,
          id: CONST.EL_ID_CLIENTNAMEIN,
          label: "Client name",
          parent: "clientNewRow",
          methodPathStr: "uk.co.firmgently.DontDillyDally.onClientTyped",
          args: [],
          scopeID: "createClientForm",
          attributes: { "type": "text" }
        }, {
          type: CONST.GUITYPE_BTN,
          label: "Save",
          id: CONST.EL_ID_CLIENTSAVEBTN,
          methodPathStr: "uk.co.firmgently.DontDillyDally.newClientFormSave",
          args: [],
          scopeID: "createClientForm",
          parent: "clientNewRow",
          disabled: true
        }, {
          type: CONST.GUITYPE_COLORPICKER,
          id: CONST.CLIENT_FG_COLPICK,
          class: "color-picker",
          parent: "clientsExistingRow"
        }, {
          type: CONST.GUITYPE_COLORPICKER,
          id: CONST.CLIENT_BG_COLPICK,
          class: "color-picker",
          parent: "clientsExistingRow"
        }, {
          type: CONST.GUITYPE_SELECT,
          label: "Existing clients",
          args: [],
          scopeID: "createClientForm",
          parent: "clientsExistingRow",
          methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected",
          id: CONST.EL_ID_SELECTCLIENT,
          contentType: CONST.CONTENTTYPE_CLIENTS
        }
      ]
    }, {
      type: CONST.GUITYPE_COL,
      id: "editJobCol",
      class: CONST.CLASS_COL,
      parent: "main",
    }, {
      type: CONST.GUITYPE_FORM,
      id: "createJobForm",
      class: CONST.CLASS_FORMMAIN,
      title: "Fill in job details",
      parent: "editJobCol",
      hidden: false,
      el_ar: [
        {
          type: CONST.GUITYPE_ROW,
          id: "jobNewRow",
          class: CONST.CLASS_ROW,
          parent: "createJobForm",
        }, {
          type: CONST.GUITYPE_ROW,
          id: "jobsExistingRow",
          class: CONST.CLASS_ROW,
          parent: "createJobForm",
        }, {
          type: CONST.GUITYPE_BTN,
          label: "Create new",
          id: "createNewJobBtn",
          methodPathStr: "uk.co.firmgently.DontDillyDally.newJobCreate",
          scopeID: "createJobForm",
          args: [],
          parent: "jobNewRow"
        }, {
          type: CONST.GUITYPE_TEXTINPUT,
          id: CONST.EL_ID_JOBNAMEIN,
          label: "Job name",
          parent: "jobNewRow",
          attributes: { "type": "text" }
        }, {
          type: CONST.GUITYPE_BTN,
          label: "Save",
          id: CONST.EL_ID_JOBSAVEBTN,
          methodPathStr: "uk.co.firmgently.DontDillyDally.newJobFormSave",
          scopeID: "createJobForm",
          args: [],
          parent: "jobNewRow",
          disabled: true
        }, {
          type: CONST.GUITYPE_COLORPICKER,
          id: CONST.JOB_FG_COLPICK,
          class: "color-picker",
          parent: "jobsExistingRow"
        }, {
          type: CONST.GUITYPE_COLORPICKER,
          id: CONST.JOB_BG_COLPICK,
          class: "color-picker",
          parent: "jobsExistingRow"
        }, {
          type: CONST.GUITYPE_SELECT,
          label: "Existing jobs",
          args: [],
          scopeID: "createJobForm",
          parent: "jobsExistingRow",
          methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected",
          id: "selectJob",
          contentType: CONST.CONTENTTYPE_JOBS
        }
      ]
    }
  ];


  CONST.GUIDATA_NAVMAIN = [
    {
      type: CONST.GUITYPE_BTN,
      class: CONST.CLASS_BTNNAV,
      id: CONST.BODYID_JOBSANDCLIENTS,
      label: "Jobs & Clients",
      methodPathStr: "uk.co.firmgently.DontDillyDally.navClick",
      args: [CONST.PAGETYPE_JOBSANDCLIENTS],
      scopeID: "main",
      parent: "nav-main"
   }, {
      type: CONST.GUITYPE_BTN,
      class: CONST.CLASS_BTNNAV,
      id: CONST.BODYID_CONFIG,
      label: "Preferences",
      methodPathStr: "uk.co.firmgently.DontDillyDally.navClick",
      args: [CONST.PAGETYPE_CONFIG],
      scopeID: "main",
      parent: "nav-main"
     }, {
      type: CONST.GUITYPE_BTN,
      class: CONST.CLASS_BTNNAV,
      id: CONST.BODYID_TIMESHEETS,
      label: "Timesheets",
      methodPathStr: "uk.co.firmgently.DontDillyDally.navClick",
      args: [CONST.PAGETYPE_TIMESHEETS],
      scopeID: "main",
      parent: "nav-main"
    }
  ];


  CONST.GUIDATA_TIMESHEETS = [
		{ type: CONST.GUITYPE_FORM,
			id: "miniNavForm",
			parent: "main",
			el_ar: [
			{
				type: CONST.GUITYPE_BTN,
				class: CONST.CLASS_BTNMININAV,
				label: "Month Previous",
				methodPathStr: "uk.co.firmgently.DontDillyDally.monthPrevClick",
				parent: "miniNavForm"
		 }, {
				type: CONST.GUITYPE_BTN,
				class: CONST.CLASS_BTNMININAV,
				label: "Month Next",
				methodPathStr: "uk.co.firmgently.DontDillyDally.monthNextClick",
				parent: "miniNavForm"
		 }, {
				type: CONST.GUITYPE_BTN,
				class: CONST.CLASS_BTNMININAV,
				label: "Week Previous",
				methodPathStr: "uk.co.firmgently.DontDillyDally.weekPrevClick",
				parent: "miniNavForm"
			 }, {
				type: CONST.GUITYPE_BTN,
				class: CONST.CLASS_BTNMININAV,
				label: "Week Next",
				methodPathStr: "uk.co.firmgently.DontDillyDally.weekNextClick",
				parent: "miniNavForm"
			 }, {
				type: CONST.GUITYPE_BTN,
				class: CONST.CLASS_BTNMININAV,
				label: "Today",
				methodPathStr: "uk.co.firmgently.DontDillyDally.todayClick",
				parent: "miniNavForm"
		   }
			]
		}, {
      type: CONST.GUITYPE_UL,
      id: CONST.TIMESHEETCONTAINER_ID,
      parent: "main"
    }, {
      type: CONST.GUITYPE_METHODCALL,
      methodPathStr: "uk.co.firmgently.DontDillyDally.drawTimesheets",
      scopeID: "main"
    }
  ];


  CONST.GUIDATA_CONFIG = [
    {
      type: CONST.GUITYPE_FORM,
      id: "configForm",
      class: CONST.CLASS_FORMMAIN,
      title: "Set your preferences here",
      parent: "main",
      hidden: false,
      el_ar: [
         {
           type: CONST.GUITYPE_RADIOBTN,
           id: "dateFormat",
           label: "Format used to show dates",
           parent: "configForm",
           options: {
             DATETYPE_DDMMYY: "dd/mm/yy",
             DATETYPE_MMDDYY: "mm/dd/yy",
             DATETYPE_YYMMDD: "yy/mm/dd"
           },
           disabled: true
         }, {
           type: CONST.GUITYPE_RADIOBTN,
           id: "timespan",
           label: "Choose how many days you want to show on the timesheet page",
           parent: "configForm",
           options: {
             timespanWeek: "A week",
             timespanMonth: "A month",
             timespanYear: "A year"
           },
           disabled: true
         }, {
           type: CONST.GUITYPE_RADIOBTN,
           id: "totalsToShow",
           label: "Choose which totals you want totted up and displayed",
           parent: "configForm",
           options: {
             showTotalsWeek: "Show weekly totals",
             showTotalsMonth: "Show monthly totals",
             showTotalsWeekAndMonth: "Show both weekly and monthly totals"
           },
           disabled: true
         }, {
           type: CONST.GUITYPE_RADIOBTN,
           id: "minuteIncrements",
           label: "The shortest length of a time entry",
           parent: "configForm",
           options: {
             minuteIncrement1: "1 minute",
             minuteIncrement15: "15 minutes",
             minuteIncrement30: "30 minutes"
           },
           disabled: true
         }
      ]
    },
  ];


	return CONST;

}());
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
  hexOpacityToRGBA, getRandomHexColor, createElementWithId,
  removeClassname, addClassname, getStyle,
  treatAsUTC, daysBetween, getFormattedDate,
  getFunctionFromString, getGUID, changeSelectByOption, manualEvent,
  logMsg;


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


  hexOpacityToRGBA = function(hexColour, opacity) {
    var r, g, b;
    r = parseInt(hexColour.substring(0,2), 16);
    g = parseInt(hexColour.substring(2,4), 16);
    b = parseInt(hexColour.substring(4,6), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
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
    var
    i, curStyleSheet,
    totalStyleSheets = document.styleSheets.length,
    newStyle = property + ": " + newValue;

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
    registerEventHandler: registerEventHandler,
    unregisterEventHandler: unregisterEventHandler,
    stopPropagation: stopPropagation,
    removeClassname: removeClassname,
    addClassname: addClassname,
    addCSSRule: addCSSRule,
    hexOpacityToRGBA: hexOpacityToRGBA,
    getRandomHexColor: getRandomHexColor,
    createElementWithId: createElementWithId,
    getFunctionFromString: getFunctionFromString,
    getFormattedDate: getFormattedDate,
    treatAsUTC: treatAsUTC,
    daysBetween: daysBetween,
    logMsg: logMsg,
    getIEVersion: getIEVersion,
    getStyle: getStyle,
    isTouchDevice: isTouchDevice,
		changeSelectByOption: changeSelectByOption,
		manualEvent: manualEvent,
		getGUID: getGUID
  };

}());
/*
---------------------------------------------------------
  Firm Gently HTMLBuild
  Collection of functions for creating HTML elements
  Mark Mayes 2016
---------------------------------------------------------
*/
// create namespace: uk.co.firmgently
var uk = (uk !== undefined) ? uk : {};
uk.co = (uk.co !== undefined) ? uk.co : {};
uk.co.firmgently = (uk.co.firmgently !== undefined) ? uk.co.firmgently : {};
//
uk.co.firmgently.FGHTMLBuild = (function() {
	"use strict";

	var
	fillHTMLFromOb,
	createButtonFromOb, createRadioFromOb, createCheckboxFromOb,
	createInputFromOb, createSelectFromOb,
	createFormFromOb,
	addLIsFromOb, createBasicElementFromOb, createColorPickerFromOb
	;


	fillHTMLFromOb = function(ob) {
    for (var prop in ob) {
      if (document.getElementById(prop)) {
        document.getElementById(prop).innerHTML = ob[prop];
      }
    }
  };


	/* -----------------------------------------------------------------------------
    create individual specific elements
  ----------------------------------------------------------------------------- */

  createButtonFromOb = function(ob) {
    var
    button_el,
    // ob.parent can be the ID(string) of the parent
    // or a reference to the HTML node/element itself
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    if (ob.id) {
      button_el = createElementWithId("button", ob.id);
    } else {
      button_el = document.createElement("button");
    }
    parent_el.appendChild(button_el);

    if (ob.class) { addClassname(button_el, ob.class); }
    button_el.innerHTML = ob.label;
    button_el.ob = ob;

    if (ob.disabled) { button_el.disabled = ob.disabled; }

		return button_el;
  };


  createInputFromOb = function(ob) {
    var
    prop, input_el, label_el,
    innerHTML = "",
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    if (ob.id) {
      if (ob.label) {
        label_el = document.createElement("label");
        label_el.innerHTML = ob.label;
        parent_el.appendChild(label_el);
        label_el.htmlFor = ob.id;
      }
      input_el = createElementWithId("input", ob.id);
      input_el.name = ob.id;
      input_el.id = ob.id;
    } else {
      input_el = document.createElement("input");
    }
    if (ob.class) { addClassname(input_el, ob.class); }
    parent_el.appendChild(input_el);

    if (ob.attributes) {
      for (prop in ob.attributes) {
        input_el.setAttribute("" + prop, "" + ob.attributes[prop]);
      }
    }

    input_el.ob = ob;

		return input_el;
  };


  createSelectFromOb = function(ob) {
    var
    i, prop, select_el, label_el, option_el, clientOrJob_ob,
    dayPrefix, placeholderOption,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    if (ob.id) {
      if (ob.label) {
        label_el = document.createElement("label");
        label_el.innerHTML = ob.label;
        parent_el.appendChild(label_el);
        label_el.htmlFor = ob.id;
      }
      select_el = createElementWithId("select", ob.id);
      select_el.name = ob.id;
      select_el.id = ob.id;
    } else {
      select_el = document.createElement("select");
    }
    if (ob.class) { addClassname(select_el, ob.class); }
    parent_el.appendChild(select_el);

    select_el.setAttribute("size", "1"); // HACK maybe to allow styling of individual options

		if (ob.placeholderText) {
			placeholderOption = new Option(ob.placeholderText, "");
			placeholderOption.disabled = true;
			placeholderOption.selected = true;
			placeholderOption.hidden = true;
			select_el.options[select_el.options.length] = placeholderOption;
		}

    if (ob.contentType) { // clients / jobs options get treated differently to normal options
      if (ob.contentType === CONTENTTYPE_CLIENTS) {
				addClassname(select_el, CLASS_CLIENTSELECT);
      } else if (ob.contentType === CONTENTTYPE_JOBS) {
				addClassname(select_el, CLASS_JOBSELECT);
      }
      for (prop in ob.options) {
        clientOrJob_ob = ob.options[prop];
        option_el = select_el.options[select_el.options.length] = new Option(clientOrJob_ob.name, clientOrJob_ob.class);
        addClassname(option_el, clientOrJob_ob.class);
      }
    } else { // normal options
      for (prop in ob.options) {
        select_el.options[select_el.options.length] = new Option(ob.options[prop], prop);
      }
    }

    select_el.ob = ob;

		return select_el;
  };


  createCheckboxFromOb = function(ob) {
    var
    prop, checkbox_el, label_el, div_el,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    if (ob.label) {
      label_el = document.createElement("label");
      label_el.innerHTML = ob.label;
      parent_el.appendChild(label_el);
    }

		if (ob.id) {
			checkbox_el.id = ob.id;
			checkbox_el.name = ob.id;
			if (ob.label) {
				label_el.htmlFor = ob.id;
			}
		}

    checkbox_el = document.createElement("input");
    if (ob.class) { addClassname(checkbox_el, ob.class); }

    checkbox_el.setAttribute("type", "checkbox");
    checkbox_el.ob = ob;
    checkbox_el.checked = ob.checked;
		if (ob.wrapLabel) {
			label_el.appendChild(checkbox_el);
			if (ob.addDivToLabel) { // add empty div to facilitate 'toggle switch' CSS
				div_el = document.createElement("div");
				label_el.appendChild(div_el);
			}
		} else {
    	parent_el.appendChild(checkbox_el);
		}

		return checkbox_el;
  };


  createRadioFromOb = function(ob) {
    var
    prop, description_el, radio_el, label_el,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    if (ob.label) {
      description_el = document.createElement("p");
      description_el.innerHTML = ob.label;
      parent_el.appendChild(description_el);
    }

    for (prop in ob.options) {
      label_el = document.createElement("label");
      label_el.innerHTML = ob.options[prop];
      parent_el.appendChild(label_el);

      radio_el = document.createElement("input");
      if (ob.class) { addClassname(radio_el, ob.class); }
      parent_el.appendChild(radio_el);

      radio_el.setAttribute("type", "radio");
      radio_el.id = ob.id;
      radio_el.name = ob.id;
      radio_el.value = prop;
			logMsg("ob.checkIfMatched: " + ob.checkIfMatched);
      if (prop === ob.checkIfMatched) { radio_el.checked = true; }
      label_el.htmlFor = ob.id;
    }

		return radio_el;
  };


  addLIsFromOb = function(ob) {
    var
    i, li_el, UL_el,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

		if (ob.id) {
			UL_el = createElementWithId("ul", ob.id)
		} else {
			UL_el = document.createElement("ul");
		}

    addClassname(UL_el, CLASS_ROW);

		if (ob.ar) {
	    for (i = 0; i < ob.ar.length; i++) {
	      li_el = document.createElement("li");
	      li_el.innerHTML = ob.ar[i];
	      UL_el.appendChild(li_el);
	      if (ob.class) { addClassname(li_el, ob.class); }
	    }
		}

    parent_el.appendChild(UL_el);
  };


  createBasicElementFromOb = function(ob) {
    var
    el, elType,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    switch (ob.type) {
      case GUITYPE_COL:
      case GUITYPE_ROW:
        elType = "span";
        break;
      case GUITYPE_SECTION:
        elType = "section";
        break;
      default:
        elType = "div";
        break;
    }

    if (ob.id) {
      el = createElementWithId(elType, ob.id);
    } else {
      el = document.createElement(elType);
    }
    parent_el.appendChild(el);
    if (ob.class) { addClassname(el, ob.class); }

		return el;
  };


  createColorPickerFromOb = function(ob) {
    var
    el,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;
    if (ob.id) {
      el = createElementWithId("span", ob.id);
    } else {
      el = document.createElement("span");
    }
    parent_el.appendChild(el);
    if (ob.class) { addClassname(el, ob.class); }

		return el;
  };






	return {
		/*
		---------------------------------------------------------
								PUBLIC
		---------------------------------------------------------
		*/
		fillHTMLFromOb: fillHTMLFromOb,
		createButtonFromOb: createButtonFromOb,
		createSelectFromOb: createSelectFromOb,
		createInputFromOb: createInputFromOb,
		createRadioFromOb: createRadioFromOb,
		createCheckboxFromOb: createCheckboxFromOb,
		addLIsFromOb: addLIsFromOb,
		createBasicElementFromOb: createBasicElementFromOb,
		createColorPickerFromOb: createColorPickerFromOb
	};

}());
/*
---------------------------------------------------------
  Firm Gently
  DontDillyDally
  Mark Mayes 2016
---------------------------------------------------------
*/
// create namespace: uk.co.firmgently
var uk = (uk !== undefined) ? uk : {};
uk.co = (uk.co !== undefined) ? uk.co : {};
uk.co.firmgently = (uk.co.firmgently !== undefined) ? uk.co.firmgently : {};
//
uk.co.firmgently.DontDillyDally = (function() {
  "use strict";

  /* ---------------------------------------------------------------------------
		declare / init vars
	--------------------------------------------------------------------------- */
	var
  // variables
  prop, dateDisplayStart, dateDisplaySelected, dateToday, //timespanDisplay,
  clientNameInput_el, jobNameInput_el, clientSaveBtn_el, jobSaveBtn_el,
  colPickClientFG_el, colPickClientBG_el, colPickJobFG_el, colPickJobBG_el,

	// methods
  doSetup, selectPage, drawPage, clearPage, drawGUIFromAr,
  createFormFromOb, addTask, removeTask,
  callMethodFromObOnElement, callMethodFromOb,
	onFormClick, onScroll,
  drawTimesheets, getNextID, newClientCreate, newJobCreate,
  navClick, todayClick, weekNextClick, weekPrevClick, monthNextClick, monthPrevClick,
	onClientTyped, onJobTyped, onFormSubmit, onUpdateInput, onIsMoneyTaskChkChange,
	onSaveBtnClick,
  dataStoragePossible, initData,
	dataStoreObject, dataRetrieveObject, dataUpdateObject,
	clientAndJobStyleSheet, createClientOrJobFromOb, createCSSForClientOrJobFromOb,
	getJobOrClientIDFromElement, updateDataFromWorkItemEl,
  newClientFormSave, newJobFormSave, clientInputWasLastEmpty,
	handleFileSelect,
  updateLayoutRefs, updateSelected, addUIWorkItem, removeWorkItem 
	;


  /* ---------------------------------------------------------------------------
    create local references to public members from external sources
	--------------------------------------------------------------------------- */

  // constants
  // these aren't real constants, are declared with var
  // denoted by ALL_CAPS
  for (prop in uk.co.firmgently.DDDConsts) {
    this[prop] = uk.co.firmgently.DDDConsts[prop];
  }

  // general utility methods
	for (prop in uk.co.firmgently.FGUtils) {
		this[prop] = uk.co.firmgently.FGUtils[prop];
	}

  // HTML/DOM creation methods
	for (prop in uk.co.firmgently.FGHTMLBuild) {
		this[prop] = uk.co.firmgently.FGHTMLBuild[prop];
	}



  /* -----------------------------------------------------------------------------
    data storage methods
  ----------------------------------------------------------------------------- */

  dataStoragePossible = function() {
    if(typeof(Storage) === "undefined") {
      logMsg(TXT_STORAGE_UNSUPPORTED);
    } else {
      return true;
    }
  };

	// TODO ensure defaults are still being created on first run
  initData = function() {
		var item, container;
    // if no preferences are stored create some defaults
    if (!dataRetrieveObject(PREFS_STR)) {
			// create default preferences object
      dataStoreObject(PREFS_STR, {
        pagetype: PAGETYPE_DEFAULT,
        timespan: TIMESPAN_DEFAULT,
        dateFormat: DATETYPE_DEFAULT,
        totalsToShow: SHOWTOTALS_DEFAULT,
        minuteIncrements: MINUTEINCREMENTS_DEFAULT
      });

			// create client/job unitBigers and set them to zero
			// unitBigers are used to save having to iterate through objects
			// to see how many children they have
      dataStoreObject(CLIENTSTOTAL_STR, 0);
      dataStoreObject(JOBSTOTAL_STR, 0);

			// create new object to store clients and fill it with some defaults
      dataStoreObject(CLIENTS_STR, {});
      createClientOrJobFromOb(CLIENT_DEFAULT_1, DATATYPE_CLIENT);
      createClientOrJobFromOb(CLIENT_DEFAULT_2, DATATYPE_CLIENT);

			// create new object to store jobs and fill it with some defaults
      dataStoreObject(JOBS_STR, {});
      createClientOrJobFromOb(JOB_DEFAULT_1, DATATYPE_JOB);
      createClientOrJobFromOb(JOB_DEFAULT_2, DATATYPE_JOB);

			// new empty object to store days
			// (work items are stored in days)
      dataStoreObject(DAYS_STR, {});
    } else {
			// customise client/job styles based on existing data
			container = dataRetrieveObject(CLIENTS_STR);
			for (item in container) {
				createCSSForClientOrJobFromOb(container[item], DATATYPE_CLIENT);
			}
			container = dataRetrieveObject(JOBS_STR);
			for (item in container) {
				createCSSForClientOrJobFromOb(container[item], DATATYPE_JOB);
			}
		}
  };


  dataStoreObject = function(category, ob) {
    localStorage.setItem(APP_ID + "_" + category, JSON.stringify(ob));
  };


  dataRetrieveObject = function(category) {
    return JSON.parse(localStorage.getItem(APP_ID + "_" + category));
  };


  dataUpdateObject = function(category, key, value) {
    var prop,
    ob = dataRetrieveObject(category);
    for (prop in ob) {
      if (prop === key) {
        ob[prop] = value;
        break;
      }
    }
    dataStoreObject(category, ob);
  };


  handleFileSelect = function(event) {
    var
		file = event.target.files[0], // FileList object first item (as only single file)
		reader = new FileReader();
		reader.onload = function(event) {
			console.log(event.target.result);
		};
		reader.readAsText(file);
		console.log(file);
  };


	onSaveBtnClick = function(event) {
		var obj = {}, data, el;
		obj[PREFS_STR] = dataRetrieveObject(PREFS_STR);
		obj[JOBS_STR] = dataRetrieveObject(JOBS_STR);
		obj[JOBSTOTAL_STR] = dataRetrieveObject(JOBSTOTAL_STR);
		obj[CLIENTS_STR] = dataRetrieveObject(CLIENTS_STR);
		obj[CLIENTSTOTAL_STR] = dataRetrieveObject(CLIENTSTOTAL_STR);
		obj[DAYS_STR] = dataRetrieveObject(DAYS_STR);

		data  = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

		el       = document.createElement("a");
		el.href      = "data:" + data;
		el.download  = SAVE_FILENAME + ".txt";
		el.innerHTML = "download .txt file of json";

		document.body.appendChild(el);
		el.click();
	};



  /* -----------------------------------------------------------------------------
    setup methods
  ----------------------------------------------------------------------------- */

  doSetup = function() {
    dateDisplayStart = new Date();
    dateDisplaySelected = new Date();
    dateToday = new Date();
   //localStorage.clear();
    if(dataStoragePossible()) {
      initData();
      drawGUIFromAr(GUIDATA_NAVMAIN);
      if (location.hash) {
        selectPage(decodeURIComponent(location.hash.substring(1)));
      } else {
        selectPage(dataRetrieveObject(PREFS_STR).pagetype);
      }
    }
		registerEventHandler(document.getElementById("file-chooser"), "change", handleFileSelect, false);
		registerEventHandler(document.getElementById("file-save"), "click", onSaveBtnClick, false);
  //  registerEventHandler(window, "scroll", onScroll);
  };


  selectPage = function(pagetype) {
    dataUpdateObject(PREFS_STR, "pagetype", pagetype);
    location.hash = pagetype;
		document.body.id = "";
    clearPage();
    setTimeout(drawPage, 1); // on timer to force reflow after clearPage()
  };


  clearPage = function() {
    removeClassname(document.getElementById(LOADINGINDICATOR_ID), "hidden");
    document.getElementById("main").innerHTML = "";
  };


  drawPage = function() {
    document.getElementById("main").appendChild(createElementWithId("h1", "pageTitle"));
    document.getElementById("main").appendChild(createElementWithId("h2", "intro"));
    switch (dataRetrieveObject(PREFS_STR).pagetype) {
      case PAGETYPE_TIMESHEETS:
        document.body.id = BODYID_TIMESHEETS;
        fillHTMLFromOb(PAGEDATA_TIMESHEETS);
        drawGUIFromAr(GUIDATA_TIMESHEETS);
        break;
      case PAGETYPE_CONFIG:
        document.body.id = BODYID_CONFIG;
        fillHTMLFromOb(PAGEDATA_CONFIG);
        drawGUIFromAr(GUIDATA_CONFIG);
        break;
      case PAGETYPE_JOBSANDCLIENTS:
        document.body.id = BODYID_JOBSANDCLIENTS;
        fillHTMLFromOb(PAGEDATA_JOBSANDCLIENTS);
        drawGUIFromAr(GUIDATA_JOBSANDCLIENTS);
        break;
      default:
        break;
    }
    updateLayoutRefs();
    addClassname(document.getElementById(LOADINGINDICATOR_ID), "hidden");
  };


  drawGUIFromAr = function(ar) {
    var i, ob, el_temp;
    for (i = 0; i < ar.length; i++) {
      ob = ar[i];
      switch (ob.type) {
        case GUITYPE_BTN:
          el_temp = createButtonFromOb(ob);
          if (ob.methodPathStr) {
            registerEventHandler(el_temp, "mousedown", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_FORM:
          createFormFromOb(ob);
          break;
        case GUITYPE_TEXTINPUT:
          el_temp = createInputFromOb(ob);
          if (ob.methodPathStr) {
            registerEventHandler(el_temp, "change", callMethodFromObOnElement);
            registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
            registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
            registerEventHandler(el_temp, "input", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_SELECT:
          el_temp = createSelectFromOb(ob);
          if (ob.methodPathStr) {
            registerEventHandler(el_temp, "change", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_RADIOBTN:
          // TODO this checkIfMatched should not be added here it should
          // be included in main data higher up
          ob.checkIfMatched = dataRetrieveObject(PREFS_STR)[ob.id];
          el_temp = createRadioFromOb(ob);
          if (ob.methodPathStr) {
            registerEventHandler(el_temp, "change", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_UL:
          addLIsFromOb(ob);
          break;
        case GUITYPE_SECTION: // intentional rollthrough
        case GUITYPE_COL: // intentional rollthrough
        case GUITYPE_ROW:
          createBasicElementFromOb(ob);
          break;
        case GUITYPE_COLORPICKER:
          createColorPickerFromOb(ob);
          break;
        case GUITYPE_METHODCALL:
          callMethodFromOb(ob);
          break;
        default:
          break;
      }
    }
  };


  createFormFromOb = function(ob) {
    var
    i, form_el,
    parent_el = document.getElementById(ob.parent);

    if (ob.id) {
      form_el = createElementWithId("form", ob.id);
    } else {
      form_el = document.createElement("form");
    }
    parent_el.appendChild(form_el);

    if (ob.class) { addClassname(form_el, ob.class); }
    if (ob.title) { form_el.innerHTML = "<h2>" + ob.title + "</h2>"; }
    if (ob.el_ar) { drawGUIFromAr(ob.el_ar); }
    if (ob.hidden) { form_el.style.display = "none"; }

    form_el.ob = ob;
    registerEventHandler(form_el, "submit", onFormSubmit);
    registerEventHandler(form_el, "click", onFormClick);

		return form_el;
  };


  // addTask is called from the scope of the 'add task' button
  addTask = function() {
    addUIWorkItem(this.parentNode);
  };

	removeTask = function() {
		removeWorkItem(this);
	};

	// get next available ID for job or client
  getNextID = function(type) {
		var prefix, name, n;
		if (type === DATATYPE_JOB) {
			n = 0 + (dataRetrieveObject(JOBSTOTAL_STR)) + 1;
			dataStoreObject(JOBSTOTAL_STR, n);
			prefix = JOB_STR;
		} else if (type === DATATYPE_CLIENT) {
			n = 0 + (dataRetrieveObject(CLIENTSTOTAL_STR)) + 1;
			dataStoreObject(CLIENTSTOTAL_STR, n);
			prefix = CLIENT_STR;
		}
		return prefix + n;
  };



  /* ---------------------------------------------------------------------------

	--------------------------------------------------------------------------- */

  createClientOrJobFromOb = function(ob, dataType) {
    var
    id, ar, n, containerObjectName, input_el;

		// create unique identifier for this job or client
    if (dataType === DATATYPE_CLIENT) {
			// input_el will only be present on 'jobs & clients' page
      input_el = document.getElementById(EL_ID_CLIENTNAMEIN);
      containerObjectName = CLIENTS_STR;
    } else if (dataType === DATATYPE_JOB) {
      input_el = document.getElementById(EL_ID_JOBNAMEIN);
      containerObjectName = JOBS_STR;
    }
    id = getNextID(dataType);
		ob.id = ob.class = id;

		// store the new client or job in its relevant container
    ar = dataRetrieveObject(containerObjectName);
    ar[ob.id] = ob;
    dataStoreObject(containerObjectName, ar);

		//
		createCSSForClientOrJobFromOb(ob, dataType);
  };


	createCSSForClientOrJobFromOb = function(ob, dataType) {
    var
		selector =	"." + ob.class + ", " +
								"." + ob.class + ":hover, " +
								"." + ob.class + ":active",
    colorPickerFGSelector, colorPickerBGSelector;

		// add main CSS for eg. timesheets page
    if (dataType === DATATYPE_CLIENT || dataType === DATATYPE_JOB) {
      addCSSRule(selector, "color", ob.color + " !important");
      addCSSRule(selector, "background-color", ob.bgcolor + " !important");
    } else {
      addCSSRule(selector, "color", ob.color);
      addCSSRule(selector, "background-color", ob.bgcolor);
    }

		// colorPicker used on "jobs & clients" page
    if (dataType === DATATYPE_CLIENT) {
      colorPickerFGSelector = "#" + CLIENT_FG_COLPICK;
      colorPickerBGSelector = "#" + CLIENT_BG_COLPICK;
    } else if (dataType === DATATYPE_JOB) {
      colorPickerFGSelector = "#" + JOB_FG_COLPICK;
      colorPickerBGSelector = "#" + JOB_BG_COLPICK;
    }
    addCSSRule(colorPickerFGSelector, "background-color", ob.color);
    addCSSRule(colorPickerBGSelector, "background-color", ob.bgcolor);
	};


  callMethodFromObOnElement = function(event) {
    callMethodFromOb(event.target.ob, event);
  };


  callMethodFromOb = function(ob, event) {
    var scope;

    if (ob.scope) {
      scope = ob.scope;
    } else if (ob.scopeID) {
      scope = document.getElementById(ob.scopeID);
    } else {
      scope = undefined;
    }

    if (event) {
      if (ob.args) {
        ob.args.push(event);
      } else {
        ob.args = [event];
      }
    }

    getFunctionFromString(ob.methodPathStr).apply(scope, ob.args);
  };


  onClientTyped = function() {
    clientSaveBtn_el.disabled = clientNameInput_el.value.isEmpty();
  };


  onJobTyped = function() {
    jobSaveBtn_el.disabled = jobNameInput_el.value.isEmpty();
  };


  onScroll = function() {
    var i, day, rect,
    days = document.getElementById(TIMESHEETCONTAINER_ID).childNodes;
    
    for (i=0; i < days.length; i++) {
      day = days[i];
      rect = day.getBoundingClientRect();
      if (rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) ) {
        day.style.left = "-9999em";
      } else {
        day.style.left = "0";
      }
    }
  }


  /* ---------------------------------------------------------------------------
		page drawing methods
	--------------------------------------------------------------------------- */

  drawTimesheets = function() {
    var
    i, j, daysToDraw, isOddDay, weekdayCur, day_str,
    isToday, rowClassname,
    day_el, date_el, dayDataContainer_el,
		hrs_el, client_el, job_el,
    ob_temp, dayWorkItems, workItem,
    weekStartDay = 1, // 0 = Sunday, 1 = Monday etc
    parent_el = document.getElementById(TIMESHEETCONTAINER_ID),
    // TODO timesheet should be <ul>
    workingFragment = document.createDocumentFragment(),
    allWorkItems = dataRetrieveObject(DAYS_STR),
    dayCur = new Date();

    switch(dataRetrieveObject(PREFS_STR).timespan) {
      case TIMESPAN_WEEK:
        weekdayCur = dayCur.getDay(); // 0 = Sunday, 1 = Monday etc
        dayCur.setDate(dayCur.getDate() - weekdayCur + weekStartDay); // first day of week
        daysToDraw = DAYSINWEEK;
        break;
      case TIMESPAN_MONTH:
        dayCur.setDate(1);
        daysToDraw = dayCur.monthDays();
        break;
      case TIMESPAN_YEAR:
        dayCur.setMonth(0);
        dayCur.setDate(1);
        daysToDraw = DAYSINYEAR;
        if (dayCur.isLeapYear()) { daysToDraw += 1; }
        break;
      default:
        break;
    }

    isOddDay = false;
    for (i = 0; i < daysToDraw; i++) {
      day_str = dayCur.getShortISO();
      rowClassname = "day row ";
      isToday = !Math.round(daysBetween(dayCur, dateToday));
      if (isToday) { rowClassname += CLASS_TODAY + " "; }
      if (isOddDay) { rowClassname += "odd "; }
      isOddDay = !isOddDay; // flip state
      if (dayCur.getDay() === weekStartDay) { rowClassname += "week-start "; }
      if (dayCur.getDate() === 1) { rowClassname += "month-start "; }
      day_el = createElementWithId("li", day_str);
      addClassname(day_el, rowClassname);
      // create days in documentFragment to avoid unneccessary reflows
      workingFragment.appendChild(day_el);

      // date
      date_el = document.createElement("p");
      addClassname(date_el, "date col");
      // TODO DATETYPE_DEFAULT being used here is that correct?
      if (isToday) {
      date_el.innerHTML = "<em>" + dayCur.getWeekDay(1) + "</em>" + getFormattedDate(dayCur, DATETYPE_DEFAULT.label) + "<span>" + TODAY_STR + "</span>";
      } else {
        date_el.innerHTML = "<em>" + dayCur.getWeekDay(1) + "</em>" + getFormattedDate(dayCur, DATETYPE_DEFAULT.label);
      }
      dayCur.setDate(dayCur.getDate() + 1);
      day_el.appendChild(date_el);

      dayDataContainer_el = document.createElement("ul");
      addClassname(dayDataContainer_el, "day-data col");
      day_el.appendChild(dayDataContainer_el);

      dayWorkItems = allWorkItems[day_str];
      if (dayWorkItems === undefined) {
        addUIWorkItem(dayDataContainer_el);
      } else {
				for (workItem in dayWorkItems) {
          addUIWorkItem(dayDataContainer_el, workItem, dayWorkItems[workItem]);
        }
      }
    }

    parent_el.appendChild(workingFragment);
  };


  addUIWorkItem = function(dayDataContainer_el, itemID, itemData_ob) {
    var
    hrs_el, money_el, ob_temp, el_temp, item_el, wrappedCheckbox_el, numberValue_ar,
    day_el = dayDataContainer_el.parentNode;

		if (itemID === undefined) { itemID = getGUID(); }

    item_el = createElementWithId("li", itemID);
    dayDataContainer_el.appendChild(item_el);

    // 'add task' button
    el_temp = createButtonFromOb({
      class: "addTaskBtn",
      label: "&#xe821;",
      parent: item_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.addTask",
      scopeID: itemID
    });
    registerEventHandler(el_temp, "mousedown", callMethodFromObOnElement);


    
		// 'money/task' checkbox
    el_temp = createCheckboxFromOb({
      class: "ios-switch isMoneyTaskChk",
      label: " ", // a label is needed for wrapLabel/addDivToLabel to work
			wrapLabel: true,
			addDivToLabel: true,
      parent: item_el,
      checked: false,
      methodPathStr: "uk.co.firmgently.DontDillyDally.onIsMoneyTaskChkChange",
      scopeID: itemID
    });
		registerEventHandler(el_temp, "change", callMethodFromObOnElement);
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_MONEY) {
			// after checking this box its onChange method has to be called, but not yet
			// as it depends on other elements added below... see bottom of this function
			el_temp.checked = true;
      //
      if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
        numberValue_ar = itemData_ob[DATAINDICES.numberValue].split(SEPARATOR_CASH);
      }
		} else {
      if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
        numberValue_ar = itemData_ob[DATAINDICES.numberValue].split(SEPARATOR_TIME);
      }
    }

    // hours/money big units
    el_temp = createInputFromOb({
      class: "unitBig hrs",
      parent: item_el,
      attributes: {
        "type": "number", "value": "00"
      },
      methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
      scopeID: itemID
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_TIME) {
      el_temp.min = 0;
      el_temp.max = 23;
    } 
    if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
			el_temp.value = numberValue_ar[0];
			// TODO 'negative' class is not being added when field is pre-filled with saved data	
		//	onUpdateInput.call(el_temp);
		}

    // hours/money small units
    el_temp = createInputFromOb({
      class: "unitSmall hrs",
      parent: item_el,
      attributes: {
        "type": "number", "value": "00"
      },
      methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
      scopeID: itemID
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_TIME) {
      el_temp.min = 0;
      el_temp.max = 59;
      switch(dataRetrieveObject(PREFS_STR).minuteIncrements) {
        case MINUTEINCREMENTS_15:
          el_temp.step = 15;
          break;
        case MINUTEINCREMENTS_30:
          el_temp.step = 30;
          break;
        case MINUTEINCREMENTS_1: // intentional rollthrough
        default:
          el_temp.step = 1;
          break;
      }
    } else {
      el_temp.min = 0;
      el_temp.max = 99;
    }
		if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
			el_temp.value = numberValue_ar[1];
			// TODO 'negative' class is not being added when field is pre-filled with saved data	
		//	onUpdateInput.call(el_temp);
		}

    // client select/dropdown
    el_temp = createSelectFromOb({
      contentType: CONTENTTYPE_CLIENTS,
      placeholderText: CLIENT_SELECT_PLACEHOLDER,
      options: dataRetrieveObject(CLIENTS_STR),
      parent: item_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected",
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
		if (itemData_ob && itemData_ob[DATAINDICES.clientID]
		&& itemData_ob[DATAINDICES.clientID].length > 0) {
			changeSelectByOption(el_temp, itemData_ob[DATAINDICES.clientID]);
			manualEvent(el_temp, "change");
		}

    // job select/dropdown
    el_temp = createSelectFromOb({
      contentType: CONTENTTYPE_JOBS,
      placeholderText: JOB_SELECT_PLACEHOLDER,
      options: dataRetrieveObject(JOBS_STR),
      parent: item_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected"
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
		if (itemData_ob && itemData_ob[DATAINDICES.jobID]
		&& itemData_ob[DATAINDICES.jobID].length > 0) {
			changeSelectByOption(el_temp, itemData_ob[DATAINDICES.jobID]);
			manualEvent(el_temp, "change");
		}

    // job/money notes
    el_temp = createInputFromOb({
      class: "notes job",
      parent: item_el,
      attributes: { "type": "text", "placeholder": JOBNOTES_PLACEHOLDER },
      methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
      scopeID: itemID
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);
		if (itemData_ob && itemData_ob[DATAINDICES.notes]) { el_temp.value = itemData_ob[DATAINDICES.notes]; }

    // 'remove task' button
    el_temp = createButtonFromOb({
      class: "removeTaskBtn",
      label: "&#xe83d;",
      parent: item_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.removeTask",
      scopeID: itemID
    });
    registerEventHandler(el_temp, "mousedown", callMethodFromObOnElement);
		
		// if this item is being filled with stored data,
		// and the money checkbox is checked, we have to call the onChange function here
		// as it depends on the other elements such as "notes" being present
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_MONEY) {
			onIsMoneyTaskChkChange.call(item_el);
		}
  };

	removeWorkItem = function(item_el) {
		var
		days_ar = dataRetrieveObject(DAYS_STR),
		day_ob = days_ar[item_el.parentNode.parentNode.id];
		
		delete day_ob[item_el.id];
		item_el.parentNode.removeChild(item_el);
		dataStoreObject(DAYS_STR, days_ar);
	};

/*  updateColoursFromPickers = function(type, fgCol, bgCol) {

  };

*/

  updateLayoutRefs = function() {
    clientNameInput_el = document.getElementById(EL_ID_CLIENTNAMEIN);
    clientSaveBtn_el = document.getElementById(EL_ID_CLIENTSAVEBTN);
    colPickClientFG_el = document.getElementById(CLIENT_FG_COLPICK);
    colPickClientBG_el = document.getElementById(CLIENT_BG_COLPICK);
    jobNameInput_el = document.getElementById(EL_ID_JOBNAMEIN);
    jobSaveBtn_el = document.getElementById(EL_ID_JOBSAVEBTN);
    colPickJobFG_el = document.getElementById(JOB_FG_COLPICK);
    colPickJobBG_el = document.getElementById(JOB_BG_COLPICK);
  };





  /* ---------------------------------------------------------------------------
		FORMS
	--------------------------------------------------------------------------- */

  onFormClick = function(e) {
    var form = e.target.form;
    if (form && form.id) {
      switch (form.id) {
        case "configForm":
          dataUpdateObject(PREFS_STR, "timespan", form.timespan.value);
          // dateFormat is an object, the form just stores the name of it so grab it here
          //dataUpdateObject(PREFS_STR, "dateFormat", uk.co.firmgently.DDDConsts[form.dateFormat.value]);
          dataUpdateObject(PREFS_STR, "dateFormat", form.dateFormat.value);
          dataUpdateObject(PREFS_STR, "totalsToShow", form.totalsToShow.value);
          dataUpdateObject(PREFS_STR, "minuteIncrements", form.minuteIncrements.value);
          break;
        default:
          break;
      }
    }
  };


  onFormSubmit = function(e) {
    logMsg("FORM SUBMITTED");
    stopPropagation(e);
  };


  onUpdateInput = function(event) {
		if (document.body.contains(this)) {
			// TODO needs to handle negative small unit eg. -£0.13
			if (this.className.indexOf("unitBig") !== -1) {
				if (this.value < 0) {
					addClassname(this, "negative");
					addClassname(this.parentNode.getElementsByClassName("unitSmall")[0], "negative");
				} else {
					removeClassname(this, "negative");
					removeClassname(this.parentNode.getElementsByClassName("unitSmall")[0], "negative");
				}
			}
			updateDataFromWorkItemEl(this.parentNode);
		}
  };


  onIsMoneyTaskChkChange = function() {
    var
    checkbox = this.getElementsByClassName("isMoneyTaskChk")[0],
    unitBigInput = this.getElementsByClassName("unitBig")[0],
    unitSmallInput = this.getElementsByClassName("unitSmall")[0],
    notesInput = this.getElementsByClassName("notes")[0];
    if (checkbox.checked) {
      addClassname(unitBigInput, "money");
      addClassname(unitSmallInput, "money");
      removeClassname(unitBigInput, "hrs");
      removeClassname(unitSmallInput, "hrs");
      addClassname(notesInput, "money");
      removeClassname(notesInput, "job");
      notesInput.placeholder = MONEYNOTES_PLACEHOLDER;
    } else {
      addClassname(unitBigInput, "hrs");
      addClassname(unitSmallInput, "hrs");
      removeClassname(unitBigInput, "money");
      removeClassname(unitSmallInput, "money");
      addClassname(notesInput, "job");
      removeClassname(notesInput, "money");
      notesInput.placeholder = JOBNOTES_PLACEHOLDER;
    }
		if (document.body.contains(this)) { updateDataFromWorkItemEl(this); }
  };


  newClientCreate = function() {
    var
    fgCol = getRandomHexColor("dark"),
    bgCol = getRandomHexColor("light");
    logMsg("newClientCreate()");
    document.getElementById(EL_ID_CLIENTNAMEIN).value = getNextID(DATATYPE_CLIENT);
    addCSSRule("#" + CLIENT_FG_COLPICK, "background-color", fgCol);
    addCSSRule("#" + CLIENT_BG_COLPICK, "background-color", bgCol);
    addCSSRule("#" + EL_ID_CLIENTNAMEIN, "color", fgCol);
    addCSSRule("#" + EL_ID_CLIENTNAMEIN, "background-color", bgCol);

    clientSaveBtn_el.disabled = false;
    updateLayoutRefs();
  };


  newJobCreate = function() {
    var
    fgCol = getRandomHexColor("light"),
    bgCol = getRandomHexColor("dark");
    logMsg("newJobCreate()");

    document.getElementById(EL_ID_JOBNAMEIN).value = getNextID(DATATYPE_JOB);
    addCSSRule("#" + JOB_FG_COLPICK, "background-color", fgCol);
    addCSSRule("#" + JOB_BG_COLPICK, "background-color", bgCol);
    addCSSRule("#" + EL_ID_JOBNAMEIN, "color", fgCol);
    addCSSRule("#" + EL_ID_JOBNAMEIN, "background-color", bgCol);

    jobSaveBtn_el.disabled = false;
    updateLayoutRefs();
  };


  newClientFormSave = function() {
    createClientOrJobFromOb({
      name: document.getElementById(EL_ID_CLIENTNAMEIN).value,
      color: getStyle(colPickClientFG_el, "background-color"),
      bgcolor: getStyle(colPickClientBG_el, "background-color")
    }, DATATYPE_CLIENT);
    drawPage();
  };


  newJobFormSave = function() {
    createClientOrJobFromOb({
      name: document.getElementById(EL_ID_JOBNAMEIN).value,
      color: getStyle(colPickJobFG_el, "background-color"),
      bgcolor: getStyle(colPickJobBG_el, "background-color")
    }, DATATYPE_JOB);
    drawPage();
  };





  /* ---------------------------------------------------------------------------

	--------------------------------------------------------------------------- */


  navClick = function(e) {
    selectPage(arguments[0]);
  };


	weekPrevClick = function(e) {
		document.getElementsByClassName(CLASS_TODAY)[0].scrollIntoView();
	};


	weekNextClick = function(e) {
		document.getElementsByClassName(CLASS_TODAY)[0].scrollIntoView();
	};


	monthPrevClick = function(e) {
		document.getElementsByClassName(CLASS_TODAY)[0].scrollIntoView();
	};


	monthNextClick = function(e) {
		document.getElementsByClassName(CLASS_TODAY)[0].scrollIntoView();
	};


	todayClick = function(e) {
		document.getElementsByClassName(CLASS_TODAY)[0].scrollIntoView();
	};


  updateSelected = function() {
    var
		pageType = dataRetrieveObject(PREFS_STR).pagetype,
    option_selector = this.value;
    switch (pageType) {
      case PAGETYPE_TIMESHEETS: // run on to next case
      case PAGETYPE_JOBSANDCLIENTS:
				if (this.className.indexOf(CLASS_CLIENTSELECT) !== -1) {
					this.className = CLASS_CLIENTSELECT + " " + option_selector;
				} else if (this.className.indexOf(CLASS_JOBSELECT) !== -1) {
					this.className = CLASS_JOBSELECT + " " + option_selector;
				}
        break;
      case PAGETYPE_CONFIG:
        break;
      default:
        break;
    }
    if (pageType === PAGETYPE_TIMESHEETS) {
			if (document.body.contains(this)) {
				updateDataFromWorkItemEl(this.parentNode);
			}
    }
  };


	updateDataFromWorkItemEl = function (el) {
		var
		days_ar, day_ob, workItem_ar,
		isMoneyTaskChk_el, unitBigInput_el, unitSmallInput_el, clientSelect_el, jobSelect_el, notesInput_el,
		pageType = dataRetrieveObject(PREFS_STR).pagetype,
		day_el = el.parentNode.parentNode,
		day_str = day_el.id;
		
		isMoneyTaskChk_el = el.getElementsByClassName("isMoneyTaskChk")[0];
		unitBigInput_el = el.getElementsByClassName("unitBig")[0];
		unitSmallInput_el = el.getElementsByClassName("unitSmall")[0];
		clientSelect_el = el.getElementsByClassName(CLASS_CLIENTSELECT)[0];
		jobSelect_el = el.getElementsByClassName(CLASS_JOBSELECT)[0];
		notesInput_el = el.getElementsByClassName("notes")[0]; 
		days_ar = dataRetrieveObject(DAYS_STR);
		day_ob = days_ar[day_str];
		if (day_ob === undefined) { day_ob = {}; }

		workItem_ar = [];
		if (isMoneyTaskChk_el.checked) {
			workItem_ar[DATAINDICES.itemType] = ITEMTYPE_MONEY;
      workItem_ar[DATAINDICES.numberValue] = unitBigInput_el.value + SEPARATOR_CASH + unitSmallInput_el.value;
		} else {
			workItem_ar[DATAINDICES.itemType] = ITEMTYPE_TIME;
      workItem_ar[DATAINDICES.numberValue] = unitBigInput_el.value + SEPARATOR_TIME + unitSmallInput_el.value;
		}
		workItem_ar[DATAINDICES.clientID] = getJobOrClientIDFromElement(clientSelect_el);
		workItem_ar[DATAINDICES.jobID] = getJobOrClientIDFromElement(jobSelect_el);
		workItem_ar[DATAINDICES.notes] = notesInput_el.value;

		day_ob[el.id] = workItem_ar; // write work item to day
		days_ar[day_str] = day_ob; // write updated day
		dataStoreObject(DAYS_STR, days_ar);
	};


	getJobOrClientIDFromElement = function(el) {
		var i, id, curClass, class_ar;
		if (el) {
			class_ar = el.className.split(" ");
			for (i =0; i < class_ar.length; i++) {
				curClass = class_ar[i];
				if (curClass !== CLASS_JOBSELECT && curClass !== CLASS_CLIENTSELECT) {
					return curClass;
				}
			}
		}
	};



	/* ---------------------------------------------------------------------------
		BEGIN...
	--------------------------------------------------------------------------- */

  doSetup();

  return {
    drawTimesheets: drawTimesheets,
    addTask: addTask,
    removeTask: removeTask,
    navClick: navClick,
    todayClick: todayClick,
    weekNextClick: weekNextClick,
    weekPrevClick: weekPrevClick,
    monthNextClick: monthNextClick,
    monthPrevClick: monthPrevClick,
    newClientCreate: newClientCreate,
    newJobCreate: newJobCreate,
    newClientFormSave: newClientFormSave,
    newJobFormSave: newJobFormSave,
    updateSelected: updateSelected,
    onUpdateInput: onUpdateInput,
    onIsMoneyTaskChkChange: onIsMoneyTaskChkChange,
    onClientTyped: onClientTyped
  };


// 'this' would be undefined because of "use strict",
// calling the function with .call(this) fixes it
}).call(this);
