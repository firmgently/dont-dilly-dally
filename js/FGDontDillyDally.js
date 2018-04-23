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
    COLORPICKER_CHANGEEVENT_ID: "colorpickerchange",
    COLORPICKER_CONFIRMEVENT_ID: "colorpickerconfirm",

    DATASTORE_CATEGORY_PREFIX: "_",

		AUTOREPEAT_RATE: 500,
    RECALCULATETOTALS_DELAY: 1000,
    DAYSDRAWN_UPDATE_FREQ: 12, // lower number means more frequent updates on loading indicator
    LOADER_CSSWIDTH_SCALE: 2, // eg. 2 if 'full' width should be 50% (100/2)

    PAGETYPE_TIMESHEETS: "timesheet",
    PAGETYPE_CONFIG: "preferences",
    PAGETYPE_JOBSANDCLIENTS: "jobs-and-clients",
    PAGETYPE_PRIVACY: "privacy",
    BODYID_TIMESHEETS: "timesheet",
    BODYID_CONFIG: "config",
    BODYID_JOBSANDCLIENTS: "jobsClients",
    BODYID_PRIVACY: "privacy",

    MONTH_NAMES: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],

    GUITYPE_PARA: "GUITypePara",
    GUITYPE_COL: "GUITypeCol",
    GUITYPE_ROW: "GUITypeRow",
    GUITYPE_BTN: "GUITypeBtn",
    GUITYPE_HEADING: "GUITypeHeading",
    GUITYPE_COLORPICKER: "GUITypeColorPicker",
    GUITYPE_RADIOBTN: "GUITypeRadioBtn",
    GUITYPE_TEXTINPUT: "GUITypeTextInput",
    GUITYPE_SELECT: "GUITypeSelect",
    GUITYPE_FORM: "GUITypeForm",
    GUITYPE_SECTION: "GUITypeSection",
    GUITYPE_METHODCALL: "GUITypeMethodCall",
    GUITYPE_UL: "GUITypeUL",
    GUITYPE_HELP: "GUITypeHelp",
    GUITYPE_SPACER: "GUITypeSpacer",

    CLASS_SHEET: "sheet",
    CLASS_BTNNAV: "btnNav",
    CLASS_BTNMININAV: "btnMiniNav",
    CLASS_FORMMAIN: "formMain",
    CLASS_COL: "col",
    CLASS_ROW: "row",
    CLASS_CLIENTSELECT: "select-client",
    CLASS_JOBSELECT: "select-job",
		CLASS_TODAY: "today",
    CLASS_SPINNER_UNITBIG: "unitBig",
    CLASS_SPINNER_UNITSMALL: "unitSmall",
    CLASS_NOTESINPUT: "notes",
    CLASS_NEGATIVE: "negative",
    CLASS_HIDDEN: "hidden",
		CLASS_ANIM_ATTRACT: "attract",
    CLASS_ANIM_WORKING: "working",
    CLASS_TOTALSWEEK: "totals-week",
    CLASS_TOTALSMONTH: "totals-month",
    CLASS_TOTALSYEAR: "totals-year",
    CLASS_SPACER_EXPAND_VERT: "expand-vert",

    TURNOVER_STR: "earned",
    PROFIT_STR: "profit",
    EXPENDITURE_STR: "spent",
    INCOME_STR: "earned",
    HOURSWORKED_STR: "hours",

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
    CLIENTSORJOBS_USED: "used",
    CLIENT_SELECT_PLACEHOLDER: "select client",
    JOB_SELECT_PLACEHOLDER: "select job",
    JOBNOTES_PLACEHOLDER: "enter job notes",
    MONEYNOTES_PLACEHOLDER: "enter money notes",
    SEPARATOR_CASH: ".",
    SEPARATOR_TIME: ":",
    TODAY_STR: "today",
    WEEK_ENDING_STR: "w/e ",

		LABEL_MONTHPREV: "previous month",
		LABEL_MONTHNEXT: "next month",
		LABEL_WEEKPREV: "previous week",
		LABEL_WEEKNEXT: "next week",
		LABEL_ADDITEM: "add item",
		LABEL_REMOVEITEM: "remove item",

    EL_ID_COLHEADING: "column-headings",
    EL_ID_JOBNAMEIN: "jobNameIn",
    EL_ID_CLIENTNAMEIN: "clientNameIn",
    EL_ID_CLIENTSAVEBTN: "saveNewClientBtn",
    EL_ID_JOBSAVEBTN: "saveNewJobBtn",
    EL_ID_SELECTCLIENT: "selectClient",
    EL_ID_SELECTJOB: "selectJob",
    EL_ID_WEEKNEXTBTN: "weekNextBtn",
    EL_ID_WEEKPREVBTN: "weekPrevBtn",
    EL_ID_MONTHNEXTBTN: "monthNextBtn",
    EL_ID_MONTHPREVBTN: "monthPrevBtn",

    EL_ID_MAINCONTAINER: "main",
    EL_ID_TIMESHEETCONTAINER: "timesheetContainer",
    EL_ID_LOADINGINDICATOR: "loading-indicator",


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

    PAGEDATA_JOBSANDCLIENTS: {
      pageTitle: "Jobs and Clients",
      intro: "Add jobs or clients with [+], remove with [x]. | Tap names to edit them. | Tap squares to edit colours."
    },
    PAGEDATA_TIMESHEETS: {
      pageTitle: "Timesheet",
      intro: "Add items with [+], remove with [x]. | An item is about either time or money, tap [-o] to swap."
    },
    PAGEDATA_CONFIG: {
      pageTitle: "Settings",
      intro: "Show and hide things and customise settings."
    },
    PAGEDATA_PRIVACY: {
      pageTitle: "Privacy",
      intro: "Info about data you create with this application."
    },

    /*DATETYPE_YYMMDD: {
      id: "yymmdd",
      label: "yy/mm/dd"
    },
    DATETYPE_DDMMYY: {
      id: "ddmmyy",
      label: "dd/mm/yy"
    },
    DATETYPE_MMDDYY: {
      id: "mmddyy",
      label: "mm/dd/yy"
    },*/

    DATETYPES: {
      yymmdd: {
        id: "yymmdd",
        label: "yy/mm/dd"
      },
      ddmmyy: {
        id: "ddmmyy",
        label: "dd/mm/yy"
      },
      mmddyy: {
        id: "mmddyy",
        label: "mm/dd/yy"
      },
    },

    JOB_DEFAULTS: [
      {
        name: "Purchasing",
        color: "#000",
        bgcolor: "#0ff"
      }, {
        name: "Administration",
        color: "#0f0",
        bgcolor: "#123"
      }, {
        name: "Design",
        color: "#0ff",
        bgcolor: "#111"
      }
    ],

    CLIENT_DEFAULTS: [
      {
        name: "ACME CO",
        color: "#fff",
        bgcolor: "#f00"
      }, {
        name: "General Corp.",
        color: "#435",
        bgcolor: "#89a"
      }
    ],

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
  CONST.DATETYPE_DEFAULT = "ddmmyy";
  CONST.PAGETYPE_DEFAULT = CONST.PAGETYPE_TIMESHEETS;



	/* ---------------------------------------------------------------------------
    the data to DEFINE THE GUIs depends on constants from this file,
    so we add them to the CONST object here (we couldn't do it during the
    CONST object definition above as the object's properties don't exist
    until the object has been defined)
	--------------------------------------------------------------------------- */

  CONST.GUIDATA_PRIVACY = [
    {
      type: CONST.GUITYPE_ROW,
      id: "privacyInfo",
      class: CONST.CLASS_ROW,
      parent: "main",
      text: "Basic information"
    }, {
      type: CONST.GUITYPE_UL,
      id: "privacyMainPoints",
      class: CONST.CLASS_ROW,
      parent: "main",
      ar: [
        "All data you create and your preference settings are saved in your browser, nothing is sent across the internet or stored on any servers.",
        "It is expected that you'll save (export) and load (import) files in the same way as you'd use traditional office software.",
        "When you export your data to a file, it will be saved on your device in a plain text format.",
        "If you want to share data between devices you can manually move an exported file or save it to your choice of cloud storage.",
        "You can wipe your data at any time by using the 'wipe data' button or clearing your browser cache."
      ]
    }, {
      type: CONST.GUITYPE_ROW,
      id: "privacyTechInfo",
      class: CONST.CLASS_ROW,
      parent: "main",
      text: "Technical information"
    }, {
      type: CONST.GUITYPE_UL,
      id: "privacyTechPoints",
      class: CONST.CLASS_ROW,
      parent: "main",
      ar: [
        "Data is stored using the localStorage API. It is stored as plain, unencrypted text in JSON format.",
        "You can view currently stored data by using the developer tools built into eg. desktop versions of Firefox or Chrome.",
        "If you clear your browser cache, depending on your settings localStorage may be cleared in which case you'll lose any unsaved data.",
        "CSS/JS has been minified but not obfuscated - you can read it in developer tools. It will be easier if you prettify it first.",
        "No 3rd-party scripts are loaded on this site. No tracking or advertising is carried out."
      ]
    }
  ];


  CONST.GUIDATA_JOBSANDCLIENTS = [
    {
      type: CONST.GUITYPE_COL,
      id: "clientsExisting",
      class: CONST.CLASS_COL + " " + CONST.CLASS_SHEET,
      parent: "main",
    }, {
      type: CONST.GUITYPE_COL,
      id: "jobsExisting",
      class: CONST.CLASS_COL + " " + CONST.CLASS_SHEET,
      parent: "main",
    }, {
      type: CONST.GUITYPE_HEADING,
      heirarchy: 4,
      text: CONST.CLIENTS_STR,
      parent: "clientsExisting"
    }, {
      type: CONST.GUITYPE_HEADING,
      heirarchy: 4,
      text: CONST.JOBS_STR,
      parent: "jobsExisting"
    }, {
      type: CONST.GUITYPE_METHODCALL,
      methodPathStr: "uk.co.firmgently.DontDillyDally.drawJobsAndClients",
      scopeID: "main"
    }
  ];


  CONST.GUIDATA_NAVMAIN = [
    {
      type: CONST.GUITYPE_BTN,
      class: CONST.CLASS_BTNNAV,
      id: CONST.BODYID_TIMESHEETS,
      label: "Timesheet",
      event_ar: [
        {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.navClick",
          args: [CONST.PAGETYPE_TIMESHEETS],
          scopeID: "main"
        }
      ],
      parent: "nav-main"
    }, {
      type: CONST.GUITYPE_BTN,
      class: CONST.CLASS_BTNNAV,
      id: CONST.BODYID_JOBSANDCLIENTS,
      label: "Jobs & Clients",
      event_ar: [
        {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.navClick",
          args: [CONST.PAGETYPE_JOBSANDCLIENTS],
          scopeID: "main"
        }
      ],
      parent: "nav-main"
    }, {
      type: CONST.GUITYPE_SPACER,
      class: CONST.CLASS_SPACER_EXPAND_VERT,
      parent: "nav-main"
    }, {
      type: CONST.GUITYPE_BTN,
      class: CONST.CLASS_BTNNAV,
      id: CONST.BODYID_CONFIG,
      label: "Settings",
      event_ar: [
        {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.navClick",
          args: [CONST.PAGETYPE_CONFIG],
          scopeID: "main"
        }
      ],
      parent: "nav-main"
    }, {
      type: CONST.GUITYPE_BTN,
      class: CONST.CLASS_BTNNAV,
      id: CONST.BODYID_PRIVACY,
      label: "Privacy",
      event_ar: [
        {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.navClick",
          args: [CONST.PAGETYPE_PRIVACY],
          scopeID: "main"
        }
      ],
      parent: "nav-main"
    }
  ];


  CONST.GUIDATA_TIMESHEETS = [
    {
      type: CONST.GUITYPE_FORM,
      id: "miniNavForm",
      parent: "main",
      event_ar: [
        {
          eventType: "submit",
          methodPathStr: "uk.co.firmgently.DontDillyDally.onFormSubmit",
          scopeID: "miniNavForm"
        }, {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.onFormClick",
          scopeID: "miniNavForm"
        }
      ]
    }, {
      type: CONST.GUITYPE_BTN,
      id: CONST.EL_ID_MONTHPREVBTN,
      class: CONST.CLASS_BTNMININAV,
      label: CONST.LABEL_MONTHPREV,
      event_ar: [
        {
          eventType: "mousedown",
          methodPathStr: "uk.co.firmgently.DontDillyDally.dayJump",
        }, {
          eventType: "touchstart",
          methodPathStr: "uk.co.firmgently.DontDillyDally.dayJump",
        }
      ],
      parent: "miniNavForm"
    },  {
      type: CONST.GUITYPE_PARA,
      text: "month",
      parent: "miniNavForm"
    }, {
      type: CONST.GUITYPE_BTN,
      id: CONST.EL_ID_MONTHNEXTBTN,
      class: CONST.CLASS_BTNMININAV,
      label: CONST.LABEL_MONTHNEXT,
      event_ar: [
        {
          eventType: "mousedown",
          methodPathStr: "uk.co.firmgently.DontDillyDally.dayJump",
        }, {
          eventType: "touchstart",
          methodPathStr: "uk.co.firmgently.DontDillyDally.dayJump",
        }
      ],
      parent: "miniNavForm"
    }, {
      type: CONST.GUITYPE_BTN,
      id: CONST.EL_ID_WEEKPREVBTN,
      class: CONST.CLASS_BTNMININAV,
      label: CONST.LABEL_WEEKPREV,
      event_ar: [
        {
          eventType: "mousedown",
          methodPathStr: "uk.co.firmgently.DontDillyDally.dayJump",
        }, {
          eventType: "touchstart",
          methodPathStr: "uk.co.firmgently.DontDillyDally.dayJump",
        }
      ],
      parent: "miniNavForm"
    }, {
      type: CONST.GUITYPE_PARA,
      text: "week",
      parent: "miniNavForm"
    }, {
      type: CONST.GUITYPE_BTN,
      id: CONST.EL_ID_WEEKNEXTBTN,
      class: CONST.CLASS_BTNMININAV,
      label: CONST.LABEL_WEEKNEXT,
      event_ar: [
        {
          eventType: "mousedown",
          methodPathStr: "uk.co.firmgently.DontDillyDally.dayJump",
        }, {
          eventType: "touchstart",
          methodPathStr: "uk.co.firmgently.DontDillyDally.dayJump",
        }
      ],
      parent: "miniNavForm"
    }, {
      type: CONST.GUITYPE_BTN,
      class: CONST.CLASS_BTNMININAV,
      label: "today",
      event_ar: [
        {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.todayClick",
        }
      ],
      parent: "miniNavForm"
    }, {
      type: CONST.GUITYPE_UL,
      id: CONST.EL_ID_TIMESHEETCONTAINER,
      class: CONST.CLASS_SHEET,
      parent: "main"
    }, {
      type: CONST.GUITYPE_METHODCALL,
      methodPathStr: "uk.co.firmgently.DontDillyDally.drawTimesheet",
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
      event_ar: [
        {
          eventType: "submit",
          methodPathStr: "uk.co.firmgently.DontDillyDally.onFormSubmit",
          scopeID: "configForm"
        }, {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.onFormClick",
          scopeID: "configForm"
        }
      ]
    }, {
      type: CONST.GUITYPE_COL,
      id: "configCol1",
      class: CONST.CLASS_COL + " " + CONST.CLASS_SHEET,
      parent: "configForm"
    }, {
      type: CONST.GUITYPE_RADIOBTN,
      id: "dateFormat",
      label: "How dates look:",
      swapLabelPos: true,
      parent: "configCol1",
      options: {
        ddmmyy: "dd/mm/yy",
        mmddyy: "mm/dd/yy",
        yymmdd: "yy/mm/dd"
      },
      disabled: true
    }, {
      type: CONST.GUITYPE_COL,
      id: "configCol2",
      class: CONST.CLASS_COL + " " + CONST.CLASS_SHEET,
      parent: "configForm"
    }, {
      type: CONST.GUITYPE_RADIOBTN,
      id: "timespan",
      label: "The timesheet shows:",
      swapLabelPos: true,
      parent: "configCol2",
      options: {
        timespanWeek: "A week",
        timespanMonth: "A month",
        timespanYear: "A year"
      },
      disabled: true
    }, {
      type: CONST.GUITYPE_COL,
      id: "configCol3",
      class: CONST.CLASS_COL + " " + CONST.CLASS_SHEET,
      parent: "configForm"
    }, {
      type: CONST.GUITYPE_RADIOBTN,
      id: "totalsToShow",
      label: "When calculating totals:",
      swapLabelPos: true,
      parent: "configCol3",
      options: {
        showTotalsWeek: "Show weekly totals",
        showTotalsMonth: "Show monthly totals",
        showTotalsWeekAndMonth: "Show both weekly and monthly totals"
      },
      disabled: true
    }, {
      type: CONST.GUITYPE_COL,
      id: "configCol4",
      class: CONST.CLASS_COL + " " + CONST.CLASS_SHEET,
      parent: "configForm"
    }, {
      type: CONST.GUITYPE_RADIOBTN,
      id: "minuteIncrements",
      label: "Smallest time that can be entered is:",
      swapLabelPos: true,
      parent: "configCol4",
      options: {
        minuteIncrement1: "1 minute",
        minuteIncrement15: "15 minutes",
        minuteIncrement30: "30 minutes"
      },
      disabled: true
    }
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
  hexOpacityToRGBA, rgbToHex, getRandomHexColor, getRandomContrastingHexColor,
  hexToRGB_ar, getBrightnessFromRGBAr, floatToArray,
  createElementWithId,
  removeClassname, addClassname, getStyle, padString,
  treatAsUTC, daysBetween, getFormattedDate,
  getFunctionFromString, getGUID, changeSelectByOption, manualEvent,
  updateSelectOptionList,
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
      element.className = element.className.replace(" " + name,"");
    }
  };


  addClassname = function(element, name) {
    if (element) {
      name = " " + name;
      element.className = element.className.replace(name,"");
      element.className = element.className + name;
    }
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


  padString = function(str, pad) {
    var return_str = str;
    if (str.length < pad.length) {
      return_str = pad.substr(0, (pad.length - str.length)) + str;
    }
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
    logMsg("float: " + float);
    logMsg("numStr: " + numStr);
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
    getIEVersion: getIEVersion,
    getStyle: getStyle,
    isTouchDevice: isTouchDevice,
		changeSelectByOption: changeSelectByOption,
		updateSelectOptionList: updateSelectOptionList,
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
	SPINNER_REPEAT_RATE = 250, SPINNER_REPEAT_ACCEL = 1.04,
  SPINNER_CLASSNAME = "spinner", SPINNER_UPBTN_CLASSNAME = "spin-button-up", SPINNER_DOWNBTN_CLASSNAME = "spin-button-down",

  COLORPICKER_IMG_ID = "color-picker-img", COLORPICKER_CANVAS_ID = "color-picker-canvas", COLORPICKER_IMG_PATH = "/images/wheel.png",

  HELPITEM_CLASSNAME = "helpItem",

	fillHTMLFromOb,
	createButtonFromOb, createRadioFromOb, createCheckboxFromOb,
	createInputFromOb, createSpinnerFromOb, createSelectFromOb,
	createFormFromOb, createHelpItemFromOb,
	addLIsFromOb, createBasicElementFromOb, createColorPickerFromOb,

	onSpinnerStart, onSpinnerMouseUp, doSpinStep, spinnerTimer,
	onIncreaseSpinnerMouseDown, onDecreaseSpinnerMouseDown,

  onColorPickerClick, onColorPickerCanvasClick, onColorPickerClickOutside,
  onColorPickerCanvasMoveOver, onColorPickerImageLoad, colorPickerImage, colorPickerCanvas,
  colorPickerClose, colorPickerCanvasClickCount,
  colorPickerSelectedCurrent
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


  createSpinnerFromOb = function(ob) {
    var
    prop, input_el, label_el, up_el, down_el,
    innerHTML = "",
    wrapper_el = document.createElement("div"),
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    parent_el.appendChild(wrapper_el);
    input_el = document.createElement("input");
    if (ob.class) { addClassname(input_el, ob.class); }

    addClassname(wrapper_el, SPINNER_CLASSNAME);
    wrapper_el.appendChild(input_el);

		input_el.ob = ob;
		input_el.spin_ob = {};
		for (prop in ob.attributes) {
			input_el.spin_ob[prop] = ob.attributes[prop];
		}

    up_el = document.createElement("button");
    up_el.innerHTML = "&#x25B2;";
    up_el.spinner = input_el;
    addClassname(up_el, SPINNER_UPBTN_CLASSNAME);
    wrapper_el.appendChild(up_el);
    up_el.setAttribute('tabIndex', -1);
    registerEventHandler(up_el, "mousedown", onIncreaseSpinnerMouseDown);
    registerEventHandler(up_el, "touchstart", onIncreaseSpinnerMouseDown);
    registerEventHandler(up_el, "mouseup", onSpinnerMouseUp);
    registerEventHandler(up_el, "mouseout", onSpinnerMouseUp);
    registerEventHandler(up_el, "touchend", onSpinnerMouseUp);
    
    down_el = document.createElement("button");
    down_el.innerHTML = "&#x25BC;";
    down_el.spinner = input_el;
    addClassname(down_el, SPINNER_DOWNBTN_CLASSNAME);
    wrapper_el.appendChild(down_el);
    down_el.setAttribute('tabIndex', -1);
    registerEventHandler(down_el, "mousedown", onDecreaseSpinnerMouseDown);
    registerEventHandler(down_el, "touchstart", onDecreaseSpinnerMouseDown);
    registerEventHandler(down_el, "mouseup", onSpinnerMouseUp);
    registerEventHandler(down_el, "mouseout", onSpinnerMouseUp);
    registerEventHandler(down_el, "touchend", onSpinnerMouseUp);

		return input_el;
  };


	onIncreaseSpinnerMouseDown = function() {
		onSpinnerStart(this.spinner, 1);
	};


	onDecreaseSpinnerMouseDown = function() {
		onSpinnerStart(this.spinner, -1);
	};


	onSpinnerStart = function(spinner, dir) {
		spinner.isChanging = true;
		spinner.curRepeatRate = SPINNER_REPEAT_RATE;
		doSpinStep(spinner, dir);
	};


	onSpinnerMouseUp = function() {
		this.spinner.isChanging = false;
		clearTimeout(spinnerTimer);
	};


	doSpinStep = function(spinner, dir) {
		var valNew = parseInt(spinner.value) + (parseInt(spinner.spin_ob.step) * dir);
		if (isNaN(valNew)) { valNew = 0; }
		if (valNew < spinner.spin_ob.min) {
			if (spinner.spin_ob.wrapNum) {
				valNew = spinner.spin_ob.max;
			} else {
				valNew = spinner.spin_ob.min;
			}
		} else if (valNew > spinner.spin_ob.max) {
			if (spinner.spin_ob.wrapNum) {
				valNew = spinner.spin_ob.min;
			} else {
				valNew = spinner.spin_ob.max;
			}
		}
		spinner.value = valNew;
		manualEvent(spinner, "change");
		clearTimeout(spinnerTimer);
		if (spinner.isChanging) {
			spinner.curRepeatRate /= SPINNER_REPEAT_ACCEL;
			spinnerTimer = setTimeout(doSpinStep, spinner.curRepeatRate, spinner, dir);
		}
	};


  createSelectFromOb = function(ob) {
    var i, prop, select_el, label_el, option_el, clientOrJob_ob,
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
    prop, description_el, radio_el, label_el, optionID,
    optionCount = 0,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    if (ob.label) {
      description_el = document.createElement("p");
      description_el.innerHTML = ob.label;
      parent_el.appendChild(description_el);
    }

    for (prop in ob.options) {
      optionID = ob.id + optionCount;
      optionCount ++;

      label_el = document.createElement("label");
      label_el.innerHTML = ob.options[prop];

      radio_el = document.createElement("input");
      if (ob.class) { addClassname(radio_el, ob.class); }


      if (ob.swapLabelPos) {
        parent_el.appendChild(radio_el);
        parent_el.appendChild(label_el);
      } else {
        parent_el.appendChild(label_el);
        parent_el.appendChild(radio_el);
      }

      radio_el.setAttribute("type", "radio");
      radio_el.id = optionID;
      radio_el.name = ob.id;
      radio_el.value = prop;
      if (prop === ob.checkIfMatched) { radio_el.checked = true; }
      label_el.htmlFor = optionID;
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
    if (ob.class) { addClassname(UL_el, ob.class); }

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
      case GUITYPE_PARA:
        elType = "p";
        break;
      case GUITYPE_SECTION:
        elType = "section";
        break;
      case GUITYPE_HEADING:
        elType = "h" + ob.heirarchy;
        break;
      case GUITYPE_SPACER:
        elType = "hr";
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
    if (ob.text) { el.innerHTML = ob.text; }

		return el;
  };


  createFormFromOb = function(ob) {
    var i, form_el,
				parent_el = document.getElementById(ob.parent);

    if (ob.id) {
      form_el = createElementWithId("form", ob.id);
    } else {
      form_el = document.createElement("form");
    }
    parent_el.appendChild(form_el);

    if (ob.class) { addClassname(form_el, ob.class); }
    if (ob.title) { form_el.innerHTML = "<h2>" + ob.title + "</h2>"; }
    if (ob.hidden) { form_el.style.display = "none"; }

    form_el.ob = ob;

		return form_el;
  };


  createColorPickerFromOb = function(ob) {
    var
    el, label_el, 
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;
    el = createElementWithId("input", ob.id);
    el.type = "checkbox";
    parent_el.appendChild(el);
    if (ob.class) { addClassname(el, ob.class); }

    label_el = document.createElement("label");
    label_el.htmlFor = ob.id;
    label_el.style.backgroundColor = ob.color;
    parent_el.appendChild(label_el);

    if (!colorPickerImage) {
      colorPickerImage = createElementWithId("img", COLORPICKER_IMG_ID);
      colorPickerImage.src = COLORPICKER_IMG_PATH;
      registerEventHandler(colorPickerImage, "load", onColorPickerImageLoad);
    }

    registerEventHandler(label_el, "mousedown", onColorPickerClick);

		return el;
  };


  onColorPickerImageLoad = function() {
    colorPickerCanvas = createElementWithId("canvas", COLORPICKER_CANVAS_ID);
    colorPickerCanvas.width = colorPickerImage.width;
    colorPickerCanvas.height = colorPickerImage.height;
    colorPickerCanvas.getContext('2d').drawImage(colorPickerImage, 0, 0, colorPickerImage.width, colorPickerImage.height);
    document.body.appendChild(colorPickerCanvas);
  };


  onColorPickerClick = function(event) {
    var xPos = event.clientX,
        yPos = event.clientY;
    
    colorPickerSelectedCurrent = event.currentTarget;
    colorPickerCanvas.style.display = "inline-block";
    
    if (xPos + colorPickerCanvas.offsetWidth > window.innerWidth) {
      xPos -= colorPickerCanvas.offsetWidth;
    }
    if (xPos < 0) {
      xPos += colorPickerCanvas.offsetWidth;
    }
    
    if (yPos + colorPickerCanvas.offsetHeight > window.innerHeight) {
      yPos -= colorPickerCanvas.offsetHeight;
    }
    if (yPos < 0) {
      yPos += colorPickerCanvas.offsetHeight;
    }

    colorPickerCanvas.style.left = xPos + "px";
    colorPickerCanvas.style.top = yPos + "px";

    colorPickerCanvasClickCount = 0;
    registerEventHandler(document.body, "click", onColorPickerCanvasClick);
    registerEventHandler(colorPickerCanvas, "mousemove", onColorPickerCanvasMoveOver);
  };


  onColorPickerCanvasClick = function(event) {
    var activeAreaClicked = false,
        pixelData = colorPickerCanvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;

    if (pixelData[3] > 0) { activeAreaClicked = true; }
    
    if (activeAreaClicked) {
      manualEvent(colorPickerSelectedCurrent.parentNode, COLORPICKER_CONFIRMEVENT_ID);
      colorPickerClose();
    } else {
      // HACK event is registered on document.body, so initial click was
      // triggering this function and making the picker close as soon as it opened
      // increment a counter so that we can ignore this first erroneous click
      if (colorPickerCanvasClickCount > 1) {
        colorPickerClose();
      }
      colorPickerCanvasClickCount ++;
    }
  };


  onColorPickerCanvasMoveOver = function(event) {
    var pixelData = colorPickerCanvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
    colorPickerSelectedCurrent.style.backgroundColor = "#" + rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
    manualEvent(colorPickerSelectedCurrent.parentNode, COLORPICKER_CHANGEEVENT_ID);
    if (pixelData[3] > 0) {
      colorPickerCanvas.style.cursor = "crosshair";
    } else {
      colorPickerCanvas.style.cursor = "default";
    }
  };


  colorPickerClose = function() {
    colorPickerCanvas.style.display = "none";
    unregisterEventHandler(document.body, "click", onColorPickerCanvasClick);
    unregisterEventHandler(colorPickerCanvas, "mousemove", onColorPickerCanvasMoveOver);
  };


  createHelpItemFromOb = function(ob) {
    var i, el, temp_el, for_el;
    el = createElementWithId("div", ob.id);
    
    document.body.appendChild(el);
    addClassname(el, HELPITEM_CLASSNAME);

    for (i = 0; i < ob.items.length; i++) {
      temp_el = document.createElement("span");
      temp_el.innerHTML = ob.items[i].text;
      el.appendChild(temp_el);
    }
    temp_el = document.createElement("div");
    addClassname(temp_el, "cover-left");


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
		createFormFromOb: createFormFromOb,
		createSpinnerFromOb: createSpinnerFromOb,
		onSpinnerStart: onSpinnerStart,
		onSpinnerMouseUp: onSpinnerMouseUp,
		onIncreaseSpinnerMouseDown: onIncreaseSpinnerMouseDown,
		onDecreaseSpinnerMouseDown: onDecreaseSpinnerMouseDown,
		doSpinStep: doSpinStep,
		createRadioFromOb: createRadioFromOb,
		createCheckboxFromOb: createCheckboxFromOb,
		addLIsFromOb: addLIsFromOb,
		createBasicElementFromOb: createBasicElementFromOb,
		createColorPickerFromOb: createColorPickerFromOb,
    createHelpItemFromOb: createHelpItemFromOb
	};

}());
/*
---------------------------------------------------------
  Firm Gently
  DontDillyDally
  Mark Mayes 2018

  TODO  horizontal layout of workitem, + X buttons, wrap for portrait
  TODO  pageIntro from Consts needs to be able to define more complex data (eg. ul, li, icons)
	TODO	look out for autorepeat getting stuck on dayJump (make sure timer gets cancelled on mouseup etc)
  TODO  add 'year start date' preference
  TODO  ensure big/small units update min/max/step when changing from money to hours or viceversa
  FIXME timesheet container not getting scroll focus
  TODO  add ARIA attributes (eg. hide up/down spinner buttons)
	FIXME	spinners: numbers should pad eg. 00:45h, £10.00
  TODO  all strings should be constants
  TODO  display month/week start correctly
  FIXME press/hold to jump back through months, page reloads with ? in querystring
  TODO  number spinners should fade up quickly with short delay (to avoid flickering on 'remove item' etc)
  TODO  only show month/week jump buttons if they make sense OR make them work everywhere (ie. flip month/week page)
  TODO  validate all input data
          time/money
          notes - max length
          client/job names in clients/jobs page
	FIXME	if empty or bad time/money data is **stored in JSON**, correct it to zero
	FIXME	£-0.77 must register as negative
  TODO  test everything on touchscreen
  TODO  test everything on narrow (phone) layout
  TODO  portrait CSS
        - workItem bottom margin increase
        - notes input move left margin to be right margin on unitSmall
  TODO  remove old dynamic classes (jobs/clients) 
  TODO  nav buttons shouldnt be chopped off
  TODO  import button wrong colour (white) on rollover
  TODO  feedback:
        - [on startup] data and settings restored from previous session (localStorage)
        - [first usage] default data and settings created
        - [on load] data and settings loaded from $filename


  DONE dots in loaderbar
  DONE  loader should only appear on timesheets page
  DONE  leave gap between months on timesheet
  DONE  after loading file current page must update (redraw) be it timesheets, J&Cs or preferences
  DONE  file load isn't loading data yet
  DONE  workitem remove button shoudnt disappear when firstchild, should remove item then create a new one
        - removeItem should decrement
        - change event should decrement current selection (if it exists) then increment new selection{
	DONE 1st day of following year is showing
  DONE  remove button should be closer to item it is removing
  DONE  notes input field even more faded when its not focused and has no data
  DONE client select dropdown styles broken (CSS not being written after loading data file?)
  DONE  clicking anywhere off colorpicker should close it without changing colours (currently working on transparent pixels of png, needs to be the same for all the rest of the screen
  DONE  spinners ony show for hovered/focused day
  DONE if page is changed while timesheets are being drawn, bugs out (clear timeout)
  DONE  fix widths of client/job selects on timesheets page, use text-overflow: ellipsis
	DONE	add 'wipe data' buttons with confirmation prompt
  DONE  visual feedback when saving (even though it's happening all the time)...appears on change, fades out after 2 secs
  DONE  jobs/clients
        - boxes fill bg
        - add titles to boxes
  DONE number spinners inconsistent colours
  DONE  use spritesheet png instead of fonts??
  DONE  use updatefrequency to refresh "days drawn" only on % === 0
  DONE icons on buttons too small, positioned badly
  DONE  delete job/client check if any records are referencing them, prompt if so
  DONE  refactor month/week click etc to all use 1 function
  DONE next/prev week/month buttons not working
  DONE  redesign logo
  DONE when first day of timesheet is first of month, don't show previous month totals
  DONE  loading bar
	DONE	select client/job - day remains highlighted (eg. darker date text)
  DONE tab nav - position wrong while page is loading (gap)
	DONE	add year to timesheet special days eg: "January 2018", "2018 week 4", "totals for January 2018"
	DONE	add privacy page/statement
					by default all data is saved in your browser (localStorage)
					you can wipe your data at any time
					you can export your data to a file (in JSON format) and import it into another browser or device
					we don't see any of your personal data
  DONE  remove unnecessary form from clients/job page
  DONE  implement 'used' var in client/job data objects, keep count of how many times it's used on current timesheet
  DONE	blank object being stored in data object results in missing day in UI
  DONE  add week/month/year calculations
  DONE  after updating client/job, styles are not universally updating
  DONE colour palette can push off side of screen resulting in resize on Android
  DONE	 number spinners
  DONE  match all button styles
  DONE 	blank space appears at bottom of page (seems related to LOADING element)
	DONE	clients/jobs page - color pickers do not need to  be checkboxes
  DONE	negative money values should attach negative classname on initial page load
  DONE  borders around inputs and colorpickers on clients/jobs page
	DONE	preference changes not taking effect
  DONE  month/week should flash briefly after day jump
  DONE   jobs and clients list existing jobs/clients
  DONE   jobs and clients proper colour picker
  DONE	 minify JS on save
  DONE  delete temporary <a> created when file is saved
	DONE	'even' class wrongly being applied to child elements
  DONE  month/week skip buttons should auto-repeat
  DONE	 spinners: hour/minute units can wrap
  DONE  'import from file' button doesn't get focus outline
  DONE	 spinners: NaN gets converted to 0
  DONE	spinners: other events should trigger mouseup to prevent stuck spin
	DONE	spinners: unit should be denoted, with £/h and ./:
  
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

		ALL_CAPS denotes fake constants (declared with var) imported from DDDConsts.js

	--------------------------------------------------------------------------- */
	var
  key, dateDisplayStart, dateDisplaySelected, dateToday, 
  tsDaysToDraw, tsDaysToDrawTotal, curDrawnDay, tsWorkingFragment, // ts - timesheet
	
	// refs to important HTML elements
  loadingIndicator_el, mainContainer_el, timesheet_el, workingIndicator_el,
	
	// handles for setTimeout
	eventAutoRepeatTimer, timesheetDrawDayTimer, recalculateTotalsTimer,
	
	// callbacks
  onFormSubmit, onUpdateInput, onIsMoneyTaskChkChange,
	onClearDataBtnClick, onSaveBtnClick, onColorChangeConfirm,
	onFormClick, onScroll, onFileSelect,

	// other methods
  doSetup, selectPage, refreshPage, drawPage, clearPage, drawGUIFromAr,
	eventAutoRepeat, eventAutoRepeatStop, eventAutoRepeatStart,
  recalculateAllTotals, calculateTotalsFromDateSpan, getNumberDataFromWorkItem,
  addItem, removeItem, addClient, removeClientOrJob, addJob,
  attachEventArrayToElement, callMethodsFromObOnElement, callMethodFromOb,
  drawTimesheet, drawNextDay, drawJobsAndClients, drawClientOrJobFromOb, drawTotalsContainer,
  getNextID, getNewClient, getNewJob, resetJobAndClientCounts, updateJobOrClientCount,
  navClick, todayClick, dayJump, startCSSAnimation,
  dataStoragePossible, initData, dataStoreObject, dataRetrieveObject, dataUpdateObject,
	clientAndJobStyleSheet, createClientOrJobFromOb, createCSSForClientOrJobFromOb,
	getJobOrClientIDFromElement, updateDataFromWorkItemEl, updateDataFromClientOrJobEl,
	updateColoursFromPickers, updateSelected, drawUIWorkItem, removeWorkItem 
	;




  /* ---------------------------------------------------------------------------
    create local references to public members from external (pre-concated)
		sources (like import/require etc)
		TODO make sure there isn't something existing to do this in this situ!
	--------------------------------------------------------------------------- */

	uk.co.firmgently.FGUtils.makeLocal(this, uk.co.firmgently.DDDConsts);
	uk.co.firmgently.FGUtils.makeLocal(this, uk.co.firmgently.FGUtils);
	uk.co.firmgently.FGUtils.makeLocal(this, uk.co.firmgently.FGHTMLBuild);




  /* -----------------------------------------------------------------------------
    data access/storage related
  ----------------------------------------------------------------------------- */

  dataStoragePossible = function() {
    if(typeof(Storage) === "undefined") {
      logMsg(TXT_STORAGE_UNSUPPORTED);
    } else {
      return true;
    }
  };


  initData = function() {
		var item, data_ob, tmp_ob, tmp_id;
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
      for (item in CLIENT_DEFAULTS) {
        tmp_id = getNextID(DATATYPE_CLIENT);
        tmp_ob = CLIENT_DEFAULTS[item];
        tmp_ob.id = tmp_id;
        tmp_ob.class = tmp_id;
        createClientOrJobFromOb(tmp_ob, DATATYPE_CLIENT);
      }

			// create new object to store jobs and fill it with some defaults
      dataStoreObject(JOBS_STR, {});
      for (item in JOB_DEFAULTS) {
        tmp_id = getNextID(DATATYPE_JOB);
        tmp_ob = JOB_DEFAULTS[item];
        tmp_ob.id = tmp_id;
        tmp_ob.class = tmp_id;
        createClientOrJobFromOb(tmp_ob, DATATYPE_JOB);
      }

			// new empty object to store days
			// (work items are stored in days)
      dataStoreObject(DAYS_STR, {});
    } else {
			// customise client/job styles based on existing data
			data_ob = dataRetrieveObject(CLIENTS_STR);
			for (item in data_ob) {
				createCSSForClientOrJobFromOb(data_ob[item], DATATYPE_CLIENT);
			}
			data_ob = dataRetrieveObject(JOBS_STR);
			for (item in data_ob) {
				createCSSForClientOrJobFromOb(data_ob[item], DATATYPE_JOB);
			}
		}
  };


  dataStoreObject = function(category, ob) {
    localStorage.setItem(APP_ID + DATASTORE_CATEGORY_PREFIX + category, JSON.stringify(ob));
    startCSSAnimation(workingIndicator_el, CLASS_ANIM_WORKING);
  };


  dataRetrieveObject = function(category) {
    return JSON.parse(localStorage.getItem(APP_ID + DATASTORE_CATEGORY_PREFIX + category));
  };


  dataUpdateObject = function(category, key, value) {
    var keyCurrent,
				ob = dataRetrieveObject(category);
    for (keyCurrent in ob) {
      if (keyCurrent === key) {
        ob[key] = value;
        break;
      }
    }
    dataStoreObject(category, ob);
  };


	updateDataFromWorkItemEl = function (el) {
		var days_ar, day_ob, workItem_ar,
        previouslySelectedClientID, previouslySelectedJobID,
        isMoneyTaskChk_el = el.getElementsByClassName("isMoneyTaskChk")[0],
        clientSelect_el = el.getElementsByClassName(CLASS_CLIENTSELECT)[0],
        jobSelect_el = el.getElementsByClassName(CLASS_JOBSELECT)[0],
        notesInput_el = el.getElementsByClassName(CLASS_NOTESINPUT)[0], 
        selectedClientID = getJobOrClientIDFromElement(clientSelect_el),
        selectedJobID = getJobOrClientIDFromElement(jobSelect_el),
        day_el = el.parentNode.parentNode,
        day_str = day_el.id;

		days_ar = dataRetrieveObject(DAYS_STR);
		day_ob = days_ar[day_str];
		if (day_ob === undefined) { day_ob = {}; }

		workItem_ar = [];
		if (isMoneyTaskChk_el && isMoneyTaskChk_el.checked) {
			workItem_ar[DATAINDICES.itemType] = ITEMTYPE_MONEY;
		} else {
			workItem_ar[DATAINDICES.itemType] = ITEMTYPE_TIME;
		}
    workItem_ar[DATAINDICES.numberValue] = getNumberDataFromWorkItem(el).value;
  
    if (day_ob[el.id]) {
      previouslySelectedClientID = day_ob[el.id][DATAINDICES.clientID];
      previouslySelectedJobID = day_ob[el.id][DATAINDICES.jobID];
    }
    if (previouslySelectedClientID !== selectedClientID) {
      updateJobOrClientCount(CLIENTS_STR, previouslySelectedClientID, -1);
      updateJobOrClientCount(CLIENTS_STR, selectedClientID, 1)
    }
    if (previouslySelectedJobID !== selectedJobID) {
      updateJobOrClientCount(JOBS_STR, previouslySelectedJobID, -1);
      updateJobOrClientCount(JOBS_STR, selectedJobID, 1);
    }

		workItem_ar[DATAINDICES.clientID] = selectedClientID;
		workItem_ar[DATAINDICES.jobID] = selectedJobID;
		workItem_ar[DATAINDICES.notes] = notesInput_el.value;

		day_ob[el.id] = workItem_ar; // write work item to day
		days_ar[day_str] = day_ob; // write updated day
		dataStoreObject(DAYS_STR, days_ar);
	};


  updateDataFromClientOrJobEl = function(el) {
    var i, inputNodes, currentNode, fg_el, bg_el, textInput_el,
        items_ob, itemType, dataType, update_ob;
    
    inputNodes = el.getElementsByTagName("INPUT");
    for (i = 0; i < inputNodes.length; i++) {
      currentNode = inputNodes[i];
      if (currentNode.type === "text") {
        textInput_el = currentNode;
      } else if (currentNode.className.indexOf("color-picker") !== -1) {
        if (currentNode.className.indexOf("bg") !== -1) {
          bg_el = currentNode.nextSibling;
        } else if (currentNode.className.indexOf("fg") !== -1) {
          fg_el = currentNode.nextSibling;
        }
      }
    }

    if (el.id.indexOf(CLIENT_STR) !== -1) {
      itemType = CLIENTS_STR;
      dataType = DATATYPE_CLIENT;
    } else if (el.id.indexOf(JOB_STR) !== -1) {
      itemType = JOBS_STR;
      dataType = DATATYPE_JOB;
    }
    items_ob = dataRetrieveObject(itemType);

    update_ob = {
      id: el.id,
      class: el.id,
      name: textInput_el.value, // TODO  validate input
      color: getStyle(fg_el, "background-color"),
      bgcolor: getStyle(bg_el, "background-color")
    }

    items_ob[el.id] = update_ob;
    dataStoreObject(itemType, items_ob);
    createCSSForClientOrJobFromOb(update_ob, dataType);
  };




  /* ---------------------------------------------------------------------------
		page drawing methods
	--------------------------------------------------------------------------- */
  
  selectPage = function(pagetype) {
    dataUpdateObject(PREFS_STR, "pagetype", pagetype);
    location.hash = pagetype;
    refreshPage();
    if (pagetype === PAGETYPE_TIMESHEETS) {
      removeClassname(loadingIndicator_el, CLASS_HIDDEN);
    }
  };


  refreshPage = function() {
    clearPage();
    setTimeout(drawPage, 0); // on timer to force reflow after clearPage()
  };


  clearPage = function() {
		document.body.id = "";
		clearTimeout(eventAutoRepeatTimer);
		clearTimeout(timesheetDrawDayTimer);
		clearTimeout(recalculateTotalsTimer);
    mainContainer_el.innerHTML = "";
  };


  drawPage = function() {
    mainContainer_el.appendChild(createElementWithId("h1", "pageTitle"));
    mainContainer_el.appendChild(createElementWithId("h2", "intro"));
    switch (dataRetrieveObject(PREFS_STR).pagetype) {
      case PAGETYPE_TIMESHEETS:
        document.body.id = BODYID_TIMESHEETS;
        fillHTMLFromOb(PAGEDATA_TIMESHEETS);
        drawGUIFromAr(GUIDATA_TIMESHEETS);
				timesheet_el = document.getElementById(EL_ID_TIMESHEETCONTAINER);
        break;
      case PAGETYPE_CONFIG:
        document.body.id = BODYID_CONFIG;
        fillHTMLFromOb(PAGEDATA_CONFIG);
        drawGUIFromAr(GUIDATA_CONFIG);
        addClassname(loadingIndicator_el, CLASS_HIDDEN);
        break;
      case PAGETYPE_JOBSANDCLIENTS:
        document.body.id = BODYID_JOBSANDCLIENTS;
        fillHTMLFromOb(PAGEDATA_JOBSANDCLIENTS);
        drawGUIFromAr(GUIDATA_JOBSANDCLIENTS);
        addClassname(loadingIndicator_el, CLASS_HIDDEN);
        break;
      case PAGETYPE_PRIVACY:
        document.body.id = BODYID_PRIVACY;
        fillHTMLFromOb(PAGEDATA_PRIVACY);
        drawGUIFromAr(GUIDATA_PRIVACY);
        addClassname(loadingIndicator_el, CLASS_HIDDEN);
        break;
      default:
        break;
    }
  };


  drawGUIFromAr = function(ar) {
    var i, j, ob, eventToAdd_ob, tmp_el;
    for (i = 0; i < ar.length; i++) {
      ob = ar[i];
      switch (ob.type) {
        case GUITYPE_BTN:
          tmp_el = createButtonFromOb(ob);
          break;
        case GUITYPE_FORM:
          tmp_el = createFormFromOb(ob);
          break;
        case GUITYPE_TEXTINPUT:
          tmp_el = createInputFromOb(ob);
          break;
        case GUITYPE_SELECT:
          tmp_el = createSelectFromOb(ob);
          break;
        case GUITYPE_RADIOBTN:
          ob.checkIfMatched = dataRetrieveObject(PREFS_STR)[ob.id];
          tmp_el = createRadioFromOb(ob);
          break;
        case GUITYPE_UL:
          tmp_el = addLIsFromOb(ob);
          break;
        case GUITYPE_PARA: // intentional rollthrough
        case GUITYPE_SECTION: // intentional rollthrough
        case GUITYPE_COL: // intentional rollthrough
        case GUITYPE_ROW: // intentional rollthrough
        case GUITYPE_HEADING: // intentional rollthrough
        case GUITYPE_SPACER:
          tmp_el = createBasicElementFromOb(ob);
          break;
        case GUITYPE_COLORPICKER:
          tmp_el = createColorPickerFromOb(ob);
          break;
        case GUITYPE_METHODCALL:
          callMethodFromOb(ob);
          break;
        case GUITYPE_HELP:
          tmp_el = createHelpItemFromOb(ob);
          break;
        default:
          break;
      }


     /* if (tmp_el && ob.event_ar && ob.event_ar.length > 0) {
        attachEventArrayToElement(tmp_el, ob.event_ar);
      }*/


      if (ob.event_ar) { // contains an array of objects
        for (j = 0; j < ob.event_ar.length; j++) {
          eventToAdd_ob = ob.event_ar[j];
          if (eventToAdd_ob.eventType) {
            registerEventHandler(tmp_el, eventToAdd_ob.eventType, callMethodsFromObOnElement);
          }
        }
      }
    }
  };


  drawTotalsContainer = function(data_ob) {
    var row_el, cell_el,
        heading_el = document.createElement("h4"),
        table_el = document.createElement("table");

    addClassname(table_el, "totals-container");
    table_el.endDate = data_ob.endDate;
    table_el.timeSpan = data_ob.timeSpan;

    heading_el.innerHTML = data_ob.heading;
    data_ob.parent_el.appendChild(heading_el);

    // TODO numbers should be padded here
    row_el = table_el.appendChild(document.createElement("tr"));

    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = HOURSWORKED_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00"; 
    addClassname(cell_el, "total-hoursworked");
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = INCOME_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00";
    addClassname(cell_el, "total-income");

    row_el = table_el.appendChild(document.createElement("tr"));

    cell_el = row_el.appendChild(document.createElement("td"));
//    cell_el.colSpan = "2";
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = EXPENDITURE_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00"; 
    addClassname(cell_el, "total-spend");

    row_el = table_el.appendChild(document.createElement("tr"));

    cell_el = row_el.appendChild(document.createElement("td"));
    //cell_el.colSpan = "2";
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = PROFIT_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00"; 
    addClassname(cell_el, "total-profit");

    data_ob.parent_el.appendChild(table_el);
  };


  drawJobsAndClients = function() {
    var container_el, key, item_ar;

    item_ar = dataRetrieveObject(CLIENTS_STR);
    container_el = document.createElement("ul");
    addClassname(container_el, CLIENTS_STR);
    document.getElementById("clientsExisting").appendChild(container_el);
    for (key in item_ar) {
      drawClientOrJobFromOb(item_ar[key]);
    }

    item_ar = dataRetrieveObject(JOBS_STR);
    container_el = document.createElement("ul");
    addClassname(container_el, JOBS_STR);
    document.getElementById("jobsExisting").appendChild(container_el);
    for (key in item_ar) {
      drawClientOrJobFromOb(item_ar[key]);
    }
  };


  drawClientOrJobFromOb = function(item) {
    var item_el, tmp_el, parent_el, removeMethodPath, addMethodPath;

    item_el = createElementWithId("li", item.id);
    registerEventHandler(item_el, COLORPICKER_CHANGEEVENT_ID, updateColoursFromPickers);
    registerEventHandler(item_el, COLORPICKER_CONFIRMEVENT_ID, onColorChangeConfirm);

    if (item.id.indexOf(CLIENT_STR) !== -1) {
      addMethodPath = "uk.co.firmgently.DontDillyDally.addClient";
      parent_el = document.getElementById("clientsExisting").getElementsByTagName("UL")[0];
    } else if (item.id.indexOf(JOB_STR) !== -1) {
      addMethodPath = "uk.co.firmgently.DontDillyDally.addJob";
      parent_el = document.getElementById("jobsExisting").getElementsByTagName("UL")[0];
    }
    parent_el.appendChild(item_el);
    removeMethodPath = "uk.co.firmgently.DontDillyDally.removeClientOrJob";

    // 'add task' button
    tmp_el = createButtonFromOb({
      class: "addItemBtn",
      label: LABEL_ADDITEM,
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
          eventType: "click",
          methodPathStr: addMethodPath,
          scopeID: item.id
        }
    ]);

    tmp_el = createInputFromOb({
      class: item.id,
      parent: item_el,
      attributes: { "type": "text", "value": item.name },
    });
    attachEventArrayToElement(tmp_el, [
      {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "keyup",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "paste",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "input",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }
    ]);

    tmp_el = createColorPickerFromOb({
      parent: item_el,
      class: "color-picker bg",
      id: "cpbg-" + item.id,
      color: item.bgcolor
    });

    tmp_el = createColorPickerFromOb({
      parent: item_el,
      class: "color-picker fg",
      id: "cpfg-" + item.id,
      color: item.color
    });

    // 'remove task' button
    tmp_el = createButtonFromOb({
      class: "removeItemBtn",
     	label: LABEL_REMOVEITEM,
      parent: item_el,
    });
		attachEventArrayToElement(tmp_el, [
			{
				eventType: "click",
				methodPathStr: removeMethodPath,
				scopeID: item.id
			}
		]);

    manualEvent(item_el, COLORPICKER_CHANGEEVENT_ID); // ensure input's colours are updated
  };


  drawNextDay = function() {
    var day_str,
				isToday, significance_str, rowClassname,
				monthHeader_el, day_el, date_el, dayDataContainer_el, totals_el,
				dayWorkItems, itemID,
				prevDay = new Date(),
        totalsToShow = dataRetrieveObject(PREFS_STR).totalsToShow,
        showWeekTotals = (totalsToShow === "showTotalsWeek" || totalsToShow === "showTotalsWeekAndMonth"), 
        showMonthTotals = (totalsToShow === "showTotalsMonth" || totalsToShow === "showTotalsWeekAndMonth"), 
				weekStartDay = 1, // 0 = Sunday, 1 = Monday etc
				allWorkItems = dataRetrieveObject(DAYS_STR),
        percentDrawn = 100 * (tsDaysToDraw / tsDaysToDrawTotal),
        scaledPercent = percentDrawn / LOADER_CSSWIDTH_SCALE;

		prevDay.setTime(curDrawnDay.getTime());
		prevDay.setDate(curDrawnDay.getDate() - 1);
    day_str = curDrawnDay.getShortISO();
    day_el = createElementWithId("li", day_str);

    // work out what special info is attached to this day (eg. first of week/month etc)
    rowClassname = "day row ";
    significance_str = "";
    isToday = !Math.round(daysBetween(curDrawnDay, dateToday));
    if (isToday) {
      rowClassname += CLASS_TODAY + " ";
      significance_str += "TODAY";
    }
    if (curDrawnDay.getDay() === weekStartDay) {
    //if (curDrawnDay.getDay() === weekStartDay && curDrawnDay.getWeekNumber() > 1) {
      rowClassname += "week-start ";
      significance_str += "week " + curDrawnDay.getWeekNumber();
      // if this is week 1 and month is December, must be week 1 of next year
      if (curDrawnDay.getWeekNumber() === 1 && curDrawnDay.getMonth() === 11) {
        significance_str += " (" + (curDrawnDay.getFullYear() + 1) + ")";
      }
      if (showWeekTotals && tsDaysToDraw !== tsDaysToDrawTotal) {
        totals_el = document.createElement("li");
        addClassname(totals_el, CLASS_TOTALSWEEK);
        tsWorkingFragment.appendChild(totals_el);
        drawTotalsContainer({
          heading: "week " + curDrawnDay.getWeekNumber() + " totals",
          parent_el: totals_el,
          endDate: new Date(curDrawnDay.getTime()),
          timeSpan: TIMESPAN_WEEK
        });
      }
    }
    if (curDrawnDay.getDate() === 1) {
    //if (curDrawnDay.getDate() === 1 && curDrawnDay.getMonth() > 0) {
      rowClassname += "month-start ";
      monthHeader_el = document.createElement("h4");
      monthHeader_el.innerHTML = MONTH_NAMES[curDrawnDay.getMonth()] + " " + curDrawnDay.getFullYear();
      day_el.appendChild(monthHeader_el);
      if (showMonthTotals && tsDaysToDraw !== tsDaysToDrawTotal) {
        totals_el = document.createElement("li");
        addClassname(totals_el, CLASS_TOTALSMONTH);
        tsWorkingFragment.appendChild(totals_el);
        drawTotalsContainer({
          heading: MONTH_NAMES[curDrawnDay.getMonth() - 1] + " " + curDrawnDay.getFullYear(),
          parent_el: totals_el,
          endDate: new Date(curDrawnDay.getTime()),
          timeSpan: TIMESPAN_MONTH
        });
      }
    }
    addClassname(day_el, rowClassname);
    tsWorkingFragment.appendChild(day_el);

    // add date
    date_el = document.createElement("p");
    addClassname(date_el, "date col");
    if (significance_str !== "") {
    //if (isToday) {
      date_el.innerHTML = "<em>" + curDrawnDay.getWeekDay(1) + "</em>" + getFormattedDate(curDrawnDay, DATETYPES[dataRetrieveObject(PREFS_STR).dateFormat].label) + "<span>" + significance_str + "</span>";
    } else {
      date_el.innerHTML = "<em>" + curDrawnDay.getWeekDay(1) + "</em>" + getFormattedDate(curDrawnDay, DATETYPES[dataRetrieveObject(PREFS_STR).dateFormat].label);
    }
    day_el.appendChild(date_el);

    // add day data (work/money etc)
    dayDataContainer_el = document.createElement("ul");
    addClassname(dayDataContainer_el, "day-data col");
    day_el.appendChild(dayDataContainer_el);
    
    dayWorkItems = allWorkItems[day_str];
    if (dayWorkItems === undefined || isEmpty(dayWorkItems)) {
      drawUIWorkItem(dayDataContainer_el);
    } else {
      for (itemID in dayWorkItems) {
        drawUIWorkItem(dayDataContainer_el, itemID, dayWorkItems[itemID]);
      }
    }
        
    loadingIndicator_el.getElementsByTagName("EM")[0].style.paddingRight = scaledPercent + "%";

    if (tsDaysToDraw > 1) {
      if (tsDaysToDraw % DAYSDRAWN_UPDATE_FREQ === 0) {
				timesheetDrawDayTimer = setTimeout(drawNextDay, 0);
				// re-calling the function via setTimeout means it will happen *after* the 
				// flow of execution leaves this context - so the following increment/decrement happen
				// before the next drawNextDay() call
				// TODO check terminology of above comment!
				curDrawnDay.setDate(curDrawnDay.getDate() + 1);
				tsDaysToDraw --;
      } else {
				curDrawnDay.setDate(curDrawnDay.getDate() + 1);
				tsDaysToDraw --;
				drawNextDay();
			}
    } else {
      // add year totals
      totals_el = document.createElement("li");
      addClassname(totals_el, CLASS_TOTALSYEAR);
      drawTotalsContainer({
        heading: "timesheet totals",
        //heading: (curDrawnDay.getFullYear() - 1) + " totals",
        parent_el: totals_el,
        endDate: new Date(curDrawnDay.getTime()),
        timeSpan: TIMESPAN_YEAR
      });
      tsWorkingFragment.appendChild(totals_el);

      // add fragment to DOM
      timesheet_el.appendChild(tsWorkingFragment);
      addClassname(loadingIndicator_el, CLASS_HIDDEN);

      recalculateAllTotals();
    }
  };


  drawTimesheet = function() {
    var i, j, weekdayCur,
				totals_el, weekStartDay = 1; // 0 = Sunday, 1 = Monday etc
    
    resetJobAndClientCounts();
    tsWorkingFragment = document.createDocumentFragment(); // work in a fragment to improve performance
    curDrawnDay = new Date();

    // how many days do we want to draw?
   switch(dataRetrieveObject(PREFS_STR).timespan) {
      case TIMESPAN_WEEK:
        weekdayCur = curDrawnDay.getDay(); // 0 = Sunday, 1 = Monday etc
        curDrawnDay.setDate(curDrawnDay.getDate() - weekdayCur + weekStartDay); // first day of week
        tsDaysToDraw = DAYSINWEEK;
        break;
      case TIMESPAN_MONTH:
        curDrawnDay.setDate(1);
        tsDaysToDraw = curDrawnDay.monthDays();
        break;
      case TIMESPAN_YEAR:
        curDrawnDay.setMonth(0);
        curDrawnDay.setDate(1);
        tsDaysToDraw = DAYSINYEAR;
        if (curDrawnDay.isLeapYear()) { tsDaysToDraw += 1; }
        break;
      default:
        break;
    }

    tsDaysToDrawTotal = tsDaysToDraw;
    // draw days asynchronously with a timer
    // to enable us to give UI feedback on progress
    timesheetDrawDayTimer = setTimeout(drawNextDay, 0);
  };


	// monster function but really to abstract it out into sub-functions seems
	// like it would add complexity...
	// it just draws a work item (main row in the timesheet) and all the things inside it
	// the pattern is simple:
	// - create element
	// - attach event handlers to it
	// - pre-fill it with stored data if some exists
  drawUIWorkItem = function(dayDataContainer_el, itemID, itemData_ob) {
    var money_el, tmp_ob, tmp_el, item_el, wrappedCheckbox_el, tmpNum, numberValue_ar,
				day_el = dayDataContainer_el.parentNode;

		if (itemID === undefined) { itemID = getGUID(); }
    item_el = createElementWithId("li", itemID);
    dayDataContainer_el.insertBefore(item_el, dayDataContainer_el.firstChild);

		//////////
    // 'add item' button
    tmp_el = createButtonFromOb({
      class: "addItemBtn",
      label: LABEL_ADDITEM,
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.addItem",
          scopeID: itemID
        }
    ]);
		//////////
    // client select/dropdown
    tmp_el = createSelectFromOb({
      contentType: CONTENTTYPE_CLIENTS,
      placeholderText: CLIENT_SELECT_PLACEHOLDER,
      options: dataRetrieveObject(CLIENTS_STR),
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected",
        scope: tmp_el
        }
    ]);
		if (itemData_ob && itemData_ob[DATAINDICES.clientID]
		&& itemData_ob[DATAINDICES.clientID].length > 0) {
			changeSelectByOption(tmp_el, itemData_ob[DATAINDICES.clientID]);
      updateJobOrClientCount(CLIENTS_STR, itemData_ob[DATAINDICES.clientID], 1);
			manualEvent(tmp_el, "change");
		}
		//////////
    // job select/dropdown
    tmp_el = createSelectFromOb({
      contentType: CONTENTTYPE_JOBS,
      placeholderText: JOB_SELECT_PLACEHOLDER,
      options: dataRetrieveObject(JOBS_STR),
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected",
        scope: tmp_el
        }
    ]);
		if (itemData_ob && itemData_ob[DATAINDICES.jobID] && itemData_ob[DATAINDICES.jobID].length > 0) {
			changeSelectByOption(tmp_el, itemData_ob[DATAINDICES.jobID]);
      updateJobOrClientCount(JOBS_STR, itemData_ob[DATAINDICES.jobID], 1);
			manualEvent(tmp_el, "change");
		}
		//////////
		// 'money/task' checkbox
    tmp_el = createCheckboxFromOb({
      class: "ios-switch isMoneyTaskChk",
      label: " ", // a label is needed for wrapLabel/addDivToLabel to work
			wrapLabel: true,
			addDivToLabel: true,
      parent: item_el,
      checked: false,
    });
    attachEventArrayToElement(tmp_el, [
        {
          eventType: "change",
          methodPathStr: "uk.co.firmgently.DontDillyDally.onIsMoneyTaskChkChange",
          scopeID: itemID
        }
    ]);
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_MONEY) {
			// after checking this box its onChange method has to be called, but not yet
			// as it depends on other elements added below... see bottom of this function
			tmp_el.checked = true;
      //
      if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
        tmpNum = parseInt(itemData_ob[DATAINDICES.numberValue], 10);
        //numberValue_ar = itemData_ob[DATAINDICES.numberValue].split(SEPARATOR_CASH);
        // TODO optimise this (following)
        numberValue_ar = floatToArray(tmpNum/100); // cash is stored in pennies
      }
			addClassname(item_el, "money");
		} else {
      if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
        tmpNum = parseInt(itemData_ob[DATAINDICES.numberValue], 10);
        //numberValue_ar = itemData_ob[DATAINDICES.numberValue].split(SEPARATOR_TIME);
        numberValue_ar = [
          (tmpNum - (tmpNum % 60)) / 60,
          tmpNum % 60
        ]
      }
			addClassname(item_el, "hrs");
    }
    if (numberValue_ar) { logMsg(numberValue_ar.join("/")); }
		//////////
    // hours/money big unit spinner input
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_TIME) {
      tmp_ob = { min: 0, max: 23, step: 1, wrapNum: true, pad: "00" };
    } else {
      tmp_ob = { min: -999999999, max: 999999999, step: 1, pad: "    " };
    }
    tmp_el = createSpinnerFromOb({
      class: CLASS_SPINNER_UNITBIG,
      parent: item_el,
      attributes: tmp_ob,
    });
    attachEventArrayToElement(tmp_el, [
      {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "keyup",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "paste",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "input",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }
    ]);
    if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
			tmp_el.value = numberValue_ar[0];
			manualEvent(tmp_el, "change");
		} else {
      tmp_el.value = "00";
    } 
		//////////
    // hours/money small unit spinner input
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_TIME) {
      tmp_ob = { min: 0, max: 59, wrapNum: true, pad: "00" };
      switch(dataRetrieveObject(PREFS_STR).minuteIncrements) {
        case MINUTEINCREMENTS_15:
          tmp_ob.step = 15;
          break;
        case MINUTEINCREMENTS_30:
          tmp_ob.step = 30;
          break;
        case MINUTEINCREMENTS_1: // intentional rollthrough
        default:
          tmp_ob.step = 1;
          break;
      }
    } else {
      tmp_ob = { min: 0, max: 99, step: 1, wrapNum: true, pad: "00" };
    }
    tmp_el = createSpinnerFromOb({
      class: CLASS_SPINNER_UNITSMALL,
      parent: item_el,
      attributes: tmp_ob,
    });
    attachEventArrayToElement(tmp_el, [
      {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "keyup",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "paste",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "input",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }
    ]);
		if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
			tmp_el.value = numberValue_ar[1];
			manualEvent(tmp_el, "change");
		} else {
      tmp_el.value = "00";
    }
    if (getNumberDataFromWorkItem(item_el).value < 0) {
      addClassname(tmp_el.parentNode.parentNode, CLASS_NEGATIVE);
    }
		//////////
    // job/money notes
    tmp_el = createInputFromOb({
      class: CLASS_NOTESINPUT,
      parent: item_el,
      attributes: { "type": "text", "placeholder": JOBNOTES_PLACEHOLDER },
    });
    attachEventArrayToElement(tmp_el, [
      {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "keyup",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "paste",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "input",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }
    ]);
		if (itemData_ob && itemData_ob[DATAINDICES.notes]) { tmp_el.value = itemData_ob[DATAINDICES.notes]; }
		//////////
    // 'remove item' button
    tmp_el = createButtonFromOb({
      class: "removeItemBtn",
      label: LABEL_REMOVEITEM,
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.removeItem",
          scopeID: itemID
        }
    ]);
		
		// if this item is being filled with stored data,
		// and the money checkbox is checked, we have to call the onChange function here
		// as it depends on the other elements such as "notes" being present
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_MONEY) {
			onIsMoneyTaskChkChange.call(item_el);
		}
  };


	removeClientOrJob = function() {
		var data_ob, type_str, msgItemType, usedCount;

    if (this.id.indexOf(CLIENT_STR) !== -1) {
      type_str = CLIENTS_STR;
      msgItemType = CLIENT_STR;
    } else if (this.id.indexOf(JOB_STR) !== -1) {
      type_str = JOBS_STR;
      msgItemType = JOB_STR;
    }
      
    data_ob = dataRetrieveObject(type_str);
    usedCount = data_ob[this.id][CLIENTSORJOBS_USED];
    if (!usedCount || confirm("This " + msgItemType  + " is used " + usedCount  + " time(s) in the current timesheet, really delete it?")) {
		  delete data_ob[this.id];
		  dataStoreObject(type_str, data_ob);
		  this.parentNode.removeChild(this);
    }
	};


  removeWorkItem = function(el) {
    var workItem_ob, previouslySelectedClientID, previouslySelectedJobID,
        days_ar = dataRetrieveObject(DAYS_STR),
        day_ob = days_ar[el.parentNode.parentNode.id];

    if (day_ob) {
      workItem_ob = day_ob[el.id];
      if (workItem_ob) {
        previouslySelectedClientID = workItem_ob[DATAINDICES.clientID];
        previouslySelectedJobID = workItem_ob[DATAINDICES.jobID];
        if (previouslySelectedClientID) {
          updateJobOrClientCount(CLIENTS_STR, previouslySelectedClientID, -1);
        }
        if (previouslySelectedJobID) {
          updateJobOrClientCount(JOBS_STR, previouslySelectedJobID, -1);
        }
      }
      delete day_ob[el.id];
    }

    el.parentNode.removeChild(el);
    dataStoreObject(DAYS_STR, days_ar);
  };


  updateColoursFromPickers = function(event) {
    var i, inputNodes, currentNode, fg_el, bg_el, textInput_el;
    
    inputNodes = this.getElementsByTagName("INPUT");
    for (i = 0; i < inputNodes.length; i++) {
      currentNode = inputNodes[i];
      if (currentNode.type === "text") {
        textInput_el = currentNode;
      } else if (currentNode.className.indexOf("color-picker") !== -1) {
        if (currentNode.className.indexOf("bg") !== -1) {
          bg_el = currentNode.nextSibling;
        } else if (currentNode.className.indexOf("fg") !== -1) {
          fg_el = currentNode.nextSibling;
        }
      }
    }
    textInput_el.className = "";
    textInput_el.style.color = getStyle(fg_el, "background-color");
    textInput_el.style.backgroundColor = getStyle(bg_el, "background-color");
  };




  /* ---------------------------------------------------------------------------
		callbacks/event handlers
	--------------------------------------------------------------------------- */


  /*onSelectFocus = function(event) {
    this.previousSelection = this.value;
  };*/


  onColorChangeConfirm = function(event) {
    updateDataFromClientOrJobEl(this);
  };


  onFileSelect = function(event) {
    var data_ob,
        file = event.target.files[0], // FileList object first item (as only single file)
				reader = new FileReader();
	
    reader.onload = function(event) {
      var data_ob, currentPage;
      
      if (confirm("REPLACE\n all your data, clients, jobs and preferences\nwith file?")) {
        currentPage = dataRetrieveObject(PREFS_STR).pagetype;
        data_ob = JSON.parse(event.target.result);
        dataStoreObject(PREFS_STR, data_ob[PREFS_STR]);
        dataStoreObject(JOBS_STR, data_ob[JOBS_STR]);
        dataStoreObject(JOBSTOTAL_STR, data_ob[JOBSTOTAL_STR]);
        dataStoreObject(CLIENTS_STR, data_ob[CLIENTS_STR]);
        dataStoreObject(CLIENTSTOTAL_STR, data_ob[CLIENTSTOTAL_STR]);
        dataStoreObject(DAYS_STR, data_ob[DAYS_STR]);
        // stay on same page rather than redirecting to page from stored prefs
        dataUpdateObject(PREFS_STR, "pagetype", currentPage);
        initData();
        refreshPage();
      }
		};
		reader.readAsText(file);
  };

  
  onClearDataBtnClick = function(event) {
    if (confirm("Delete all your data, clients, jobs and preferences?")) {
      localStorage.clear();
      initData();
      // TODO some form of page refresh/reload - do same after loading data
      refreshPage();
    }
  };


	onSaveBtnClick = function(event) {
		var obj = {}, data, el;
		obj[PREFS_STR] = dataRetrieveObject(PREFS_STR);
		obj[JOBS_STR] = dataRetrieveObject(JOBS_STR);
		obj[JOBSTOTAL_STR] = dataRetrieveObject(JOBSTOTAL_STR);
		obj[CLIENTS_STR] = dataRetrieveObject(CLIENTS_STR);
		obj[CLIENTSTOTAL_STR] = dataRetrieveObject(CLIENTSTOTAL_STR);
		obj[DAYS_STR] = dataRetrieveObject(DAYS_STR);

		data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

		// create a phantom element, attach encoded JSON to it
		// add it to DOM, click then remove
		el = document.createElement("a");
		el.href = "data:" + data;
		el.download = SAVE_FILENAME + ".txt";
		el.innerHTML = "download .txt file of json";
		document.body.appendChild(el);
		el.click();
    document.body.removeChild(el);
	};


  onFormClick = function(event) {
    var form = this,
        prefs_ob = dataRetrieveObject(PREFS_STR);
    if (form && form.id) {
      switch (form.id) {
        case "configForm":
          prefs_ob.timespan = form.timespan.value;
          prefs_ob.dateFormat = form.dateFormat.value;
          prefs_ob.totalsToShow = form.totalsToShow.value;
          prefs_ob.minuteIncrements = form.minuteIncrements.value;
          dataStoreObject(PREFS_STR, prefs_ob);
          break;
        default:
          break;
      }
    }
  };


  onFormSubmit = function(event) {
    stopPropagation(event);
  };


  onUpdateInput = function(event) {
    switch (dataRetrieveObject(PREFS_STR).pagetype) {
      case PAGETYPE_TIMESHEETS:
        if (this.className.indexOf(CLASS_NOTESINPUT) !== -1) {
          // TODO validate notes input
          updateDataFromWorkItemEl(this.parentNode);
        } else {
          if (isNaN(parseInt(this.value))) { this.value = 0; }

          // TODO needs to handle negative small unit eg. -£0.13
          if (this.className.indexOf(CLASS_SPINNER_UNITBIG) !== -1) {
            if (parseInt(this.value) < 0) {
              addClassname(this.parentNode.parentNode, CLASS_NEGATIVE);
            } else {
              removeClassname(this.parentNode.parentNode, CLASS_NEGATIVE);
            }
          }
          if (document.body.contains(this)) {
            updateDataFromWorkItemEl(this.parentNode.parentNode);
          }
          this.value = padString(this.value, this.spin_ob.pad);

          clearTimeout(recalculateTotalsTimer);
          recalculateTotalsTimer = setTimeout(recalculateAllTotals, RECALCULATETOTALS_DELAY);
        }
        break;
      case PAGETYPE_CONFIG:
        break;
      case PAGETYPE_JOBSANDCLIENTS:
        updateDataFromClientOrJobEl(this.parentNode);
        break;
      default:
        break;
    }
  };


  onIsMoneyTaskChkChange = function() {
    var checkbox = this.getElementsByClassName("isMoneyTaskChk")[0],
				notesInput = this.getElementsByClassName(CLASS_NOTESINPUT)[0];
    if (checkbox.checked) {
			addClassname(this, "money");
			removeClassname(this, "hrs");
      notesInput.placeholder = MONEYNOTES_PLACEHOLDER;
    } else {
			addClassname(this, "hrs");
			removeClassname(this, "money");
      notesInput.placeholder = JOBNOTES_PLACEHOLDER;
    }
		if (document.body.contains(this)) { updateDataFromWorkItemEl(this); }
  };




  /* ---------------------------------------------------------------------------
    housekeeping/calculations
	--------------------------------------------------------------------------- */


  // convert displayed numeric values into correct formats for storing
  getNumberDataFromWorkItem = function(item_el) {
    var return_ob,
        spinners = item_el.getElementsByClassName("spinner"),
        val1 = parseInt(spinners[0].getElementsByTagName("INPUT")[0].value, 10),
        val2 = parseInt(spinners[1].getElementsByTagName("INPUT")[0].value, 10);

    logMsg("val1: " + val1);
    logMsg("val2: " + val2);
    if (item_el.className.indexOf("money") !== -1) {
      return_ob = { type: ITEMTYPE_MONEY };
      // val1/val2 = before/after the decimal point
      // value stored as pennies eg. £7.24 = 724
      if (val1 < 0) { // negative value, need to subtract small units (not add)
        return_ob.value = 0 + (val1*100) - val2
      } else {
        return_ob.value = 0 + (val1*100) + val2
      }
    } else if (item_el.className.indexOf("hrs") !== -1) {
      return_ob = {
        type: ITEMTYPE_TIME,
        // value stored as minutes
        // val1 = hours, val2 = mins
        value: 0 + (val1 * 60) + val2
      };
    }
    return return_ob;
  };


  /*getNumberDataFromWorkItemData = function(data_ob) {
    var return_ob,
        spinners = item_el.getElementsByClassName("spinner"),
        val1 = parseInt(spinners[0].getElementsByTagName("INPUT")[0].value, 10),
        val2 = parseInt(spinners[0].getElementsByTagName("INPUT")[0].value, 10);

    if (item_el.className.indexOf("money") !== -1) {
      return_ob = {
        type: ITEMTYPE_MONEY,
        value: 0 + val1 + (val2/10) // val2 = after the decimal point
      };
    } else if (item_el.className.indexOf("hrs") !== -1) {
      return_ob = {
        type: ITEMTYPE_TIME,
        value: 0 + (val1 * 60) + val2 // val1 = hours, val2 = mins
      };
    }
    return return_ob;
  };*/


  resetJobAndClientCounts = function() {
    var item, data_ob;
    
    data_ob = dataRetrieveObject(CLIENTS_STR);
    for (item in data_ob) {
      data_ob[item][CLIENTSORJOBS_USED] = 0;
    }
    dataStoreObject(CLIENTS_STR, data_ob);

    data_ob = dataRetrieveObject(JOBS_STR);
    for (item in data_ob) {
      data_ob[item][CLIENTSORJOBS_USED] = 0;
    }
    dataStoreObject(JOBS_STR, data_ob);
  };


  // dataType: CLIENTS_STR or JOBS_STR
  // id: client or job id
  // value: 1 or -1 (for increment or decrement)
  updateJobOrClientCount = function(dataType, id, value) {
    var data_ob = dataRetrieveObject(dataType);
    if (id && data_ob[id]) {
      if (!data_ob[id][CLIENTSORJOBS_USED]) { data_ob[id][CLIENTSORJOBS_USED] = 0; }
      data_ob[id][CLIENTSORJOBS_USED] += value;
      dataStoreObject(dataType, data_ob);
    }
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


  recalculateAllTotals = function() {
    var i, curContainer, curTotalsData,
        totalsContainers = timesheet_el.getElementsByClassName("totals-container");

    for (i = 0; i < totalsContainers.length; i++) {
      curContainer = totalsContainers[i];
      curTotalsData = calculateTotalsFromDateSpan(curContainer.endDate, curContainer.timeSpan);
      curContainer.getElementsByClassName("total-income")[0].innerHTML = curTotalsData.incomeTotal;
      curContainer.getElementsByClassName("total-spend")[0].innerHTML = curTotalsData.spendTotal;
      curContainer.getElementsByClassName("total-hoursworked")[0].innerHTML = curTotalsData.timeTotal;
      curContainer.getElementsByClassName("total-profit")[0].innerHTML = curTotalsData.incomeTotal + curTotalsData.spendTotal; // spendTotal is a negative value
    }
  };


  calculateTotalsFromDateSpan = function(dateEnd, timeSpan) {
    var i, j, daysToCalculate, dayCur, day_str, tmpVal,
				dayWorkItems, itemID, itemCur, daysInPrevMonth, dateStart,
        return_ob = { timeTotal: 0, incomeTotal: 0, spendTotal: 0 },
				allWorkItems = dataRetrieveObject(DAYS_STR);
    
    dateStart = new Date(dateEnd.getTime());

    if (timeSpan === TIMESPAN_WEEK) {
			dateStart.setDate(dateStart.getDate() - DAYSINWEEK);
		} else if (timeSpan === TIMESPAN_MONTH) {
			daysInPrevMonth = new Date(dateStart.getDate() - 1).monthDays();
			dateStart.setDate(dateStart.getDate() - daysInPrevMonth);
		} else if (timeSpan === TIMESPAN_YEAR) {
			dateStart.setDate(dateStart.getDate() - DAYSINYEAR);
		}
    daysToCalculate = daysBetween(dateStart, dateEnd);
    dayCur = dateStart;
		
    for (i = 0; i < daysToCalculate; i++) {
      day_str = dayCur.getShortISO();
      dayWorkItems = allWorkItems[day_str];
      if (dayWorkItems) {
				for (itemID in dayWorkItems) {
          itemCur = dayWorkItems[itemID];
          if (itemCur[DATAINDICES.itemType] === ITEMTYPE_MONEY) {
            //tmpVal = getNumberDataFromWorkItem(n
            tmpVal = parseInt(itemCur[DATAINDICES.numberValue], 10);
            if (tmpVal < 0) {
              return_ob.spendTotal += parseInt(itemCur[DATAINDICES.numberValue], 10);
            } else {
              return_ob.incomeTotal += parseInt(itemCur[DATAINDICES.numberValue], 10);
            }
          } else if (itemCur[DATAINDICES.itemType] === ITEMTYPE_TIME) {
            return_ob.timeTotal += parseInt(itemCur[DATAINDICES.numberValue], 10);
          }
        }
      }
      dayCur.setDate(dayCur.getDate() + 1);
    }
    return_ob.spendTotal = return_ob.spendTotal / 100;
    return_ob.incomeTotal = return_ob.incomeTotal / 100;
    // convert minutes to hh/mm
    tmpVal = return_ob.timeTotal;
    return_ob.timeTotal = ((tmpVal - (tmpVal % 60)) / 60) + SEPARATOR_TIME + (tmpVal % 60) ;
    return return_ob;
  };


  // addItem is called from the scope of the 'add task' button
  addItem = function() {
    drawUIWorkItem(this.parentNode);
  };


	removeItem = function() {
    if (this.parentNode.children.length === 1) {
      // make sure there's always at least one item for each day (for UI purposes)
      drawUIWorkItem(this.parentNode);
    }
    removeWorkItem(this);
	};


  addClient = function() {
    var ob = getNewClient();
    createClientOrJobFromOb(ob, DATATYPE_CLIENT);
    drawClientOrJobFromOb(ob);
  };


  addJob = function() {
    var ob = getNewJob();
    createClientOrJobFromOb(ob, DATATYPE_JOB);
    drawClientOrJobFromOb(ob);
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

  createClientOrJobFromOb = function(ob, dataType) {
    var id, ar, n, containerObjectName, input_el;

		// create unique identifier for this job or client
    if (dataType === DATATYPE_CLIENT) {
      containerObjectName = CLIENTS_STR;
    } else if (dataType === DATATYPE_JOB) {
      containerObjectName = JOBS_STR;
    }
    ar = dataRetrieveObject(containerObjectName);
    ar[ob.id] = ob;
    dataStoreObject(containerObjectName, ar);

		createCSSForClientOrJobFromOb(ob, dataType);
  };


	createCSSForClientOrJobFromOb = function(ob, dataType) {
		var colorPickerFGSelector, colorPickerBGSelector,
        selector =	"." + ob.class + ", " +
										"." + ob.class + ":hover, " +
										"." + ob.class + ":active";

		// add main CSS for eg. timesheets page
    if (dataType === DATATYPE_CLIENT || dataType === DATATYPE_JOB) {
      addCSSRule(selector, "color", ob.color + " !important");
      addCSSRule(selector, "background-color", ob.bgcolor + " !important");
    } else {
      addCSSRule(selector, "color", ob.color);
      addCSSRule(selector, "background-color", ob.bgcolor);
    }
		addCSSRule(selector, "font-style", "normal");
	};


  getNewClient = function() {
    var id = getNextID(DATATYPE_CLIENT);
    return {
      id: id,
      name: id,
      class: id,
      color: getRandomHexColor("dark"),
      bgcolor: getRandomHexColor("light")
    };
  };


  getNewJob = function() {
    var id = getNextID(DATATYPE_JOB);
    return {
      id: id,
      name: id,
      class: id,
      color: getRandomHexColor("light"),
      bgcolor: getRandomHexColor("dark")
    };
  };




  /* ---------------------------------------------------------------------------
    Special event handling.
    In order to allow event handlers to be attached to elements and
    methods which may not have been defined at the time of creation
    the following methods are used
	--------------------------------------------------------------------------- */

  // attaches an array of objects defining event handlers to an element
  // and sets up a generic handler for each event type (eg. click, touchstart)
  attachEventArrayToElement = function(el, ar) {
    var i;

    if (!el.ob) { el.ob = {}; }
    if (!el.ob.event_ar) { el.ob.event_ar = [] ; }

    for (i = 0; i < ar.length; i++) {
      if (ar[i].eventType) {
        el.ob.event_ar.push(ar[i]);
        registerEventHandler(el, ar[i].eventType, callMethodsFromObOnElement);
      }
    }
  };


  // calls all methods of a certain type (eg. click) which have been
  // attached to an element previously via its ob.event_ar
  // bubbles up through parents if 'ob' data object isn't found
  callMethodsFromObOnElement = function(event) {
    var i, node, event_ar;

    node = event.target;
    // TODO make sure this loop cant get infinite
    while (!node.ob && node !== document.body) {
      node = node.parentNode;
    }

    event_ar = node.ob.event_ar;
    for (i = 0; i < event_ar.length; i++) {
      if (event_ar[i].eventType === event.type) {
        callMethodFromOb(event_ar[i], event);
      }
    }
  };


  // calls a method based on a data object which defines
  // the method name, scope and other arguments
	// (with optional event passthrough to the called method)
  callMethodFromOb = function(ob, event) {
    var scope;

    if (ob && ob.scope) { // ob.scope is an element
      scope = ob.scope;
    } else if (ob && ob.scopeID) { // ob.scope is an ID string
      scope = document.getElementById(ob.scopeID);
    } else {
      scope = undefined;
    }

    if (ob.eventType) {
      if (ob.args) {
        ob.args.push(event);
      } else {
        ob.args = [event];
      }
    }
    getFunctionFromString(ob.methodPathStr).apply(scope, ob.args);
  };




  /* ---------------------------------------------------------------------------
    UI click handlers
	--------------------------------------------------------------------------- */

  navClick = function(event) {
    selectPage(arguments[0]);
  };


  dayJump = function(event) {
    var i, day, dayNodes,
				btnID = event.target.id,
        scrollTop = mainContainer_el.scrollTop;

    if (btnID === EL_ID_WEEKNEXTBTN || btnID === EL_ID_WEEKPREVBTN) {
        dayNodes = document.getElementsByClassName("week-start");
		} else if (btnID === EL_ID_MONTHNEXTBTN || btnID === EL_ID_MONTHPREVBTN) {
        dayNodes = document.getElementsByClassName("month-start");
    }
    
		if (btnID === EL_ID_WEEKNEXTBTN || btnID === EL_ID_MONTHNEXTBTN) { // search forward
      // look for matching nodes which are past the top of the scroll window
      // breaking when we find a match (leaving 'day' set to our match)
      // the +1 is to make sure we don't repeatedly match the same node after scrolling it to the top of the window
      for (i = 0; i < dayNodes.length; i++) {
        day = dayNodes[i];
        if (day.offsetTop > scrollTop + 1) { break; } 
      }
    } else if (btnID === EL_ID_WEEKPREVBTN || btnID === EL_ID_MONTHPREVBTN) { // search backward
      for (i = dayNodes.length - 1; i >= 0; i--) {
        day = dayNodes[i];
        if (day.offsetTop < scrollTop - 1) { break; }
      }
    }
    day.scrollIntoView();

		if (btnID === EL_ID_WEEKNEXTBTN || btnID === EL_ID_WEEKPREVBTN) {
			startCSSAnimation(day.getElementsByTagName("P")[0].getElementsByTagName("SPAN")[0], CLASS_ANIM_ATTRACT);
		} else if (btnID === EL_ID_MONTHNEXTBTN || btnID === EL_ID_MONTHPREVBTN) {
			startCSSAnimation(day.getElementsByTagName("H4")[0], CLASS_ANIM_ATTRACT);
		}

    eventAutoRepeatStart(event);
  };


	todayClick = function(event) {
		document.getElementsByClassName(CLASS_TODAY)[0].scrollIntoView();
	};


	startCSSAnimation = function(el, animClass) {
		removeClassname(el, animClass);
		// HACK - trigger a reflow, needed to properly remove class and allow 
		// us to restart the animation
		el.offsetTop;
		addClassname(el, animClass);
	};


	eventAutoRepeatStart = function(event) {
    eventAutoRepeat(event);
    registerEventHandler(event.target, "mouseup", eventAutoRepeatStop);
    registerEventHandler(event.target, "mouseout", eventAutoRepeatStop);
    registerEventHandler(event.target, "touchend", eventAutoRepeatStop);
	};
	
	
	eventAutoRepeat = function(event) {
		clearTimeout(eventAutoRepeatTimer);
		eventAutoRepeatTimer = setTimeout(function() { manualEvent(event.target, event.type); }, AUTOREPEAT_RATE);
	};


	eventAutoRepeatStop = function() {
		clearTimeout(eventAutoRepeatTimer);
	};


  updateSelected = function() {
    var pagetype = dataRetrieveObject(PREFS_STR).pagetype; // refers to current page

    if (pagetype === PAGETYPE_TIMESHEETS || pagetype === PAGETYPE_JOBSANDCLIENTS) {
      if (this.className.indexOf(CLASS_CLIENTSELECT) !== -1) {
        this.className = CLASS_CLIENTSELECT + " " + this.value;
      } else if (this.className.indexOf(CLASS_JOBSELECT) !== -1) {
        this.className = CLASS_JOBSELECT + " " + this.value;
      }
    }

    if (pagetype === PAGETYPE_TIMESHEETS) {
			if (document.body.contains(this)) {
				updateDataFromWorkItemEl(this.parentNode);
			}
    } 
  };




	/* ---------------------------------------------------------------------------
		BEGIN...
	--------------------------------------------------------------------------- */
  
  doSetup = function() {
    loadingIndicator_el = document.getElementById(EL_ID_LOADINGINDICATOR);
		mainContainer_el = document.getElementById(EL_ID_MAINCONTAINER);
    workingIndicator_el = document.getElementById("sidebar-main").getElementsByTagName("H1")[0].getElementsByTagName("EM")[0];
    dateDisplayStart = new Date();
    dateDisplaySelected = new Date();
    dateToday = new Date();
    if(dataStoragePossible()) {
      initData();
      drawGUIFromAr(GUIDATA_NAVMAIN);
      if (location.hash) {
        selectPage(decodeURIComponent(location.hash.substring(1)));
      } else {
        selectPage(dataRetrieveObject(PREFS_STR).pagetype);
      }
    }
		registerEventHandler(document.getElementById("file-chooser"), "change", onFileSelect, false);
		registerEventHandler(document.getElementById("file-save"), "click", onSaveBtnClick, false);
		registerEventHandler(document.getElementById("clear-data"), "click", onClearDataBtnClick, false);
  };


  doSetup();


	// return references to methods (make them public) that will be called
	// from eg. callbacks which don't have a reference to this scope
  return {
    drawTimesheet: drawTimesheet,
    drawJobsAndClients: drawJobsAndClients,
    addItem: addItem,
    removeItem: removeItem,
    addJob: addJob,
    removeClientOrJob: removeClientOrJob,
    addClient: addClient,
    navClick: navClick,
    todayClick: todayClick,
    dayJump: dayJump,
    getNewClient: getNewClient,
    onFormClick: onFormClick,
    onFormSubmit: onFormSubmit,
    getNewJob: getNewJob,
    updateSelected: updateSelected,
    onUpdateInput: onUpdateInput,
    onIsMoneyTaskChkChange: onIsMoneyTaskChkChange
  };


// 'this' would be undefined because of "use strict",
// calling the function with .call(this) fixes it
}).call(this);
