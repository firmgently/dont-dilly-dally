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

    PAGETYPE_TIMESHEETS: " > timesheets",
    PAGETYPE_CONFIG: " > preferences",
    PAGETYPE_JOBSANDCLIENTS: " > jobsAndClients",
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
    CLASS_FORMMAIN: "formMain",
    CLASS_COL: "col",
    CLASS_ROW: "row",
    CLASS_CLIENTSELECT: "select-client",
    CLASS_JOBSELECT: "select-job",

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
      id: CONST.BODYID_TIMESHEETS,
      label: "Timesheets",
      methodPathStr: "uk.co.firmgently.DontDillyDally.navClick",
      args: [CONST.PAGETYPE_TIMESHEETS],
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
      id: CONST.BODYID_CONFIG,
      label: "Preferences",
      methodPathStr: "uk.co.firmgently.DontDillyDally.navClick",
      args: [CONST.PAGETYPE_CONFIG],
      scopeID: "main",
      parent: "nav-main"
    }
  ];


  CONST.GUIDATA_TIMESHEETS = [
    {
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
