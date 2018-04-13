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

    PAGETYPE_TIMESHEETS: "timesheets",
    PAGETYPE_CONFIG: "preferences",
    PAGETYPE_JOBSANDCLIENTS: "jobs-and-clients",
    PAGETYPE_PRIVACY: "privacy",
    BODYID_TIMESHEETS: "timesheets",
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
    GUITYPE_COLORPICKER: "GUITypeColorPicker",
    GUITYPE_RADIOBTN: "GUITypeRadioBtn",
    GUITYPE_TEXTINPUT: "GUITypeTextInput",
    GUITYPE_SELECT: "GUITypeSelect",
    GUITYPE_FORM: "GUITypeForm",
    GUITYPE_SECTION: "GUITypeSection",
    GUITYPE_METHODCALL: "GUITypeMethodCall",
    GUITYPE_UL: "GUITypeUL",
    GUITYPE_HELP: "GUITypeHelp",

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
    CLASS_TOTALSWEEK: "totals-week",
    CLASS_TOTALSMONTH: "totals-month",
    CLASS_TOTALSYEAR: "totals-year",

    TURNOVER_STR: "Turnover",
    PROFIT_STR: "Profit",
    EXPENDITURE_STR: "Expenditure",
    INCOME_STR: "Income",
    HOURSWORKED_STR: "Hours worked",

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
      intro: "Add, delete or edit jobs and clients. Click the squares to edit colours."
    },
    PAGEDATA_TIMESHEETS: {
      pageTitle: "Timesheets",
      intro: "Keep track of where you spend your time. Also record payments in and expenses paid out."
    },
    PAGEDATA_CONFIG: {
      pageTitle: "Preferences",
      intro: "Show and hide things and customise settings."
    },
    PAGEDATA_PRIVACY: {
      pageTitle: "Privacy",
      intro: "Info about data you create with this application."
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
  CONST.DATETYPE_DEFAULT = CONST.DATETYPE_DDMMYY;
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
      class: CONST.CLASS_COL,
      parent: "main",
    }, {
      type: CONST.GUITYPE_COL,
      id: "jobsExisting",
      class: CONST.CLASS_COL,
      parent: "main",
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
      id: CONST.BODYID_PRIVACY,
      label: "Privacy",
      methodPathStr: "uk.co.firmgently.DontDillyDally.navClick",
      args: [CONST.PAGETYPE_PRIVACY],
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
      id: CONST.BODYID_JOBSANDCLIENTS,
      label: "Jobs & Clients",
      methodPathStr: "uk.co.firmgently.DontDillyDally.navClick",
      args: [CONST.PAGETYPE_JOBSANDCLIENTS],
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
          type: CONST.GUITYPE_PARA,
          text: "month",
          parent: "miniNavForm"
        }, {
          type: CONST.GUITYPE_BTN,
          class: CONST.CLASS_BTNMININAV,
          label: "&#x25B2;",
          methodPathStr: "uk.co.firmgently.DontDillyDally.monthPrevClick",
          parent: "miniNavForm"
        }, {
          type: CONST.GUITYPE_BTN,
          class: CONST.CLASS_BTNMININAV,
          label: "&#x25BC;",
          methodPathStr: "uk.co.firmgently.DontDillyDally.monthNextClick",
          parent: "miniNavForm"
        }, {
          type: CONST.GUITYPE_PARA,
          text: "week",
          parent: "miniNavForm"
        }, {
          type: CONST.GUITYPE_BTN,
          class: CONST.CLASS_BTNMININAV,
          label: "&#x25B2;",
          methodPathStr: "uk.co.firmgently.DontDillyDally.weekPrevClick",
          parent: "miniNavForm"
        }, {
          type: CONST.GUITYPE_BTN,
          class: CONST.CLASS_BTNMININAV,
          label: "&#x25BC;",
          methodPathStr: "uk.co.firmgently.DontDillyDally.weekNextClick",
          parent: "miniNavForm"
        }, {
          type: CONST.GUITYPE_BTN,
          class: CONST.CLASS_BTNMININAV,
          label: "today",
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
      type: CONST.GUITYPE_COL,
      id: "configCol1",
      class: CONST.CLASS_COL,
      parent: "configForm"
    }, {
      type: CONST.GUITYPE_COL,
      id: "configCol2",
      class: CONST.CLASS_COL,
      parent: "configForm"
    }, {
           type: CONST.GUITYPE_RADIOBTN,
           id: "dateFormat",
           label: "Date display format:",
           parent: "configCol1",
           options: {
             DATETYPE_DDMMYY: "dd/mm/yy",
             DATETYPE_MMDDYY: "mm/dd/yy",
             DATETYPE_YYMMDD: "yy/mm/dd"
           },
           disabled: true
         }, {
           type: CONST.GUITYPE_RADIOBTN,
           id: "timespan",
           label: "Timespan shown on the timesheet page:",
           parent: "configCol1",
           options: {
             timespanWeek: "A week",
             timespanMonth: "A month",
             timespanYear: "A year"
           },
           disabled: true
         }, {
           type: CONST.GUITYPE_RADIOBTN,
           id: "totalsToShow",
           label: "Which totals should be calculated and displayed:",
           parent: "configCol2",
           options: {
             showTotalsWeek: "Show weekly totals",
             showTotalsMonth: "Show monthly totals",
             showTotalsWeekAndMonth: "Show both weekly and monthly totals"
           },
           disabled: true
         }, {
           type: CONST.GUITYPE_RADIOBTN,
           id: "minuteIncrements",
           label: "Time entry increments:",
           parent: "configCol2",
           options: {
             minuteIncrement1: "1 minute",
             minuteIncrement15: "15 minutes",
             minuteIncrement30: "30 minutes"
           },
           disabled: true
         }
      ]
    }
  ];


	return CONST;

}());
