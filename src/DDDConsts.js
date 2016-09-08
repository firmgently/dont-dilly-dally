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
		fake constants -

    ** EVERYTHING ADDED HERE UNDER var MUST ALSO BE ADDED TO THE
       OBJECT IN THE RETURN STATEMENT **

    This is a hackabout but lets us achieve a separate file of 'constants'
    that can be concatanated into place...
	--------------------------------------------------------------------------- */

	var
  APP_ID = "FGDDD",

  PAGETYPE_TIMESHEETS = " > timesheets",
  PAGETYPE_CONFIG = " > settings",
  PAGETYPE_JOBSANDCLIENTS = " > jobsAndClients",
  PAGETYPE_DEFAULT = PAGETYPE_TIMESHEETS,
  BODYID_TIMESHEETS = "timesheets",
  BODYID_CONFIG = "config",
  BODYID_JOBSANDCLIENTS = "jobsClients",

  GUITYPE_COL = "GUITypeCol",
  GUITYPE_ROW = "GUITypeRow",
  GUITYPE_BTN = "GUITypeBtn",
  GUITYPE_COLORPICKER = "GUITypeColorPicker",
  GUITYPE_RADIOBTN = "GUITypeRadioBtn",
  GUITYPE_TEXTINPUT = "GUITypeTextInput",
  GUITYPE_SELECT = "GUITypeSelect",
  GUITYPE_FORM = "GUITypeForm",
  GUITYPE_SECTION = "GUITypeSection",
  GUITYPE_METHODCALL = "GUITypeMethodCall",
  GUITYPE_UL = "GUITypeUL",

  CLASS_BTNNAV = "btnNav",
  CLASS_FORMMAIN = "formMain",
  CLASS_COL = "col",
  CLASS_ROW = "row",

  CLIENT_STR = "client",
  JOB_STR = "job",

  EL_ID_COLHEADING = "column-headings",
  EL_ID_JOBNAMEIN = "jobNameIn",
  EL_ID_CLIENTNAMEIN = "clientNameIn",
  EL_ID_CLIENTSAVEBTN = "saveNewClientBtn",
  EL_ID_JOBSAVEBTN = "saveNewJobBtn",
  EL_ID_SELECTCLIENT = "selectClient",
  EL_ID_SELECTJOB = "selectJob",

  CLIENT_FG_COLPICK = "clientFGPicker",
  CLIENT_BG_COLPICK = "clientBGPicker",
  JOB_FG_COLPICK = "jobFGPicker",
  JOB_BG_COLPICK = "jobBGPicker",

  DATATYPE_JOB = "dataTypeJob",
  DATATYPE_CLIENT = "dataTypeClient",

  CONTENTTYPE_CLIENTS = "contentTypeClients",
  CONTENTTYPE_JOBS = "contentTypeJobs",

  TIMESHEETCONTAINER_ID = "timesheetContainer",

  GUIDATA_NAVMAIN = [
    {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      id: BODYID_TIMESHEETS,
      label: "Timesheets",
      methodName: "navClick",
      args: [PAGETYPE_TIMESHEETS],
      scopeID: "main",
      parent: "nav-main"
    }, {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      id: BODYID_JOBSANDCLIENTS,
      label: "Jobs & Clients",
      methodName: "navClick",
      args: [PAGETYPE_JOBSANDCLIENTS],
      scopeID: "main",
      parent: "nav-main"
    }, {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      id: BODYID_CONFIG,
      label: "Settings",
      methodName: "navClick",
      args: [PAGETYPE_CONFIG],
      scopeID: "main",
      parent: "nav-main"
    }, {
      type: GUITYPE_UL,
      ar: [
        "date", "hrs", "client", "job", "job notes", "£", "£ notes"
      ],
      ulID: EL_ID_COLHEADING,
      class: CLASS_COL,
      parent: "header-main"
    }
  ],


  PAGEDATA_JOBSANDCLIENTS = {
    pageTitle: "Jobs and Clients",
    intro: "Add, delete or edit jobs and clients."
  },
  GUIDATA_JOBSANDCLIENTS = [
    {
      type: GUITYPE_COL,
      id: "editClientCol",
      class: CLASS_COL,
      parent: "main",
    }, {
      type: GUITYPE_FORM,
      id: "createClientForm",
      class: CLASS_FORMMAIN,
      title: "Fill in client details",
      // method: null,
      parent: "editClientCol",
      el_ar: [
        {
          type: GUITYPE_ROW,
          id: "clientNewRow",
          class: CLASS_ROW,
          parent: "createClientForm",
        }, {
          type: GUITYPE_ROW,
          id: "clientsExistingRow",
          class: CLASS_ROW,
          parent: "createClientForm",
        }, {
          type: GUITYPE_BTN,
          label: "Create new",
          id: "createNewClientBtn",
          methodName: "newClientCreate",
          args: [],
          scopeID: "createClientForm",
          parent: "clientNewRow"
        }, {
          type: GUITYPE_TEXTINPUT,
          id: EL_ID_CLIENTNAMEIN,
          label: "Client name",
          parent: "clientNewRow",
          methodName: "onClientTyped",
          args: [],
          scopeID: "createClientForm",
          attributes: { "type": "text" }
        }, {
          type: GUITYPE_BTN,
          label: "Save",
          id: EL_ID_CLIENTSAVEBTN,
          methodName: "newClientFormSave",
          args: [],
          scopeID: "createClientForm",
          parent: "clientNewRow",
          disabled: true
        }, {
          type: GUITYPE_COLORPICKER,
          id: CLIENT_FG_COLPICK,
          class: "color-picker",
          parent: "clientsExistingRow"
        }, {
          type: GUITYPE_COLORPICKER,
          id: CLIENT_BG_COLPICK,
          class: "color-picker",
          parent: "clientsExistingRow"
        }, {
          type: GUITYPE_SELECT,
          label: "Existing clients",
          args: [],
          scopeID: "createClientForm",
          parent: "clientsExistingRow",
          methodName: "updateSelected",
          id: EL_ID_SELECTCLIENT,
          contentType: CONTENTTYPE_CLIENTS
        }
      ]
    }, {
      type: GUITYPE_COL,
      id: "editJobCol",
      class: CLASS_COL,
      parent: "main",
    }, {
      type: GUITYPE_FORM,
      id: "createJobForm",
      class: CLASS_FORMMAIN,
      title: "Fill in job details",
      // methodName: null,
      parent: "editJobCol",
      hidden: false,
      el_ar: [
        {
          type: GUITYPE_ROW,
          id: "jobNewRow",
          class: CLASS_ROW,
          parent: "createJobForm",
        }, {
          type: GUITYPE_ROW,
          id: "jobsExistingRow",
          class: CLASS_ROW,
          parent: "createJobForm",
        }, {
          type: GUITYPE_BTN,
          label: "Create new",
          id: "createNewJobBtn",
          methodName: "newJobCreate",
          scopeID: "createJobForm",
          args: [],
          parent: "jobNewRow"
        }, {
          type: GUITYPE_TEXTINPUT,
          id: EL_ID_JOBNAMEIN,
          label: "Job name",
          parent: "jobNewRow",
          attributes: { "type": "text" }
        }, {
          type: GUITYPE_BTN,
          label: "Save",
          id: EL_ID_JOBSAVEBTN,
          methodName: "newJobFormSave",
          scopeID: "createJobForm",
          args: [],
          parent: "jobNewRow",
          disabled: true
        }, {
          type: GUITYPE_COLORPICKER,
          id: JOB_FG_COLPICK,
          class: "color-picker",
          parent: "jobsExistingRow"
        }, {
          type: GUITYPE_COLORPICKER,
          id: JOB_BG_COLPICK,
          class: "color-picker",
          parent: "jobsExistingRow"
        }, {
          type: GUITYPE_SELECT,
          label: "Existing jobs",
          args: [],
          scopeID: "createJobForm",
          parent: "jobsExistingRow",
          methodName: "updateSelected",
          id: "selectJob",
          contentType: CONTENTTYPE_JOBS
        }
      ]
    }
  ],

  PAGEDATA_TIMESHEETS = {
    pageTitle: "Timesheets",
    intro: "This is where you keep track of actual work."
  },
  GUIDATA_TIMESHEETS = [
    {
      type: GUITYPE_SECTION,
      id: TIMESHEETCONTAINER_ID,
      parent: "main"
    }, {
      type: GUITYPE_METHODCALL,
      methodName: "drawTimesheets",
      scopeID: "main"
    }
  ],

  PAGEDATA_CONFIG = {
    pageTitle: "Settings",
    intro: "Show and hide things and customise settings."
  },
  GUIDATA_CONFIG = [
    {
      type: GUITYPE_FORM,
      id: "configForm",
      class: CLASS_FORMMAIN,
      title: "Set your preferences here",
      parent: "main",
      hidden: false,
      el_ar: [
         {
           type: GUITYPE_RADIOBTN,
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
           type: GUITYPE_RADIOBTN,
           id: "timesheetRange",
           label: "Choose how many days you want to show on the timesheet page",
           parent: "configForm",
           options: {
             timespanWeek: "A week",
             timespanMonth: "A month",
             timespanYear: "A year"
           },
           disabled: true
         }, {
           type: GUITYPE_RADIOBTN,
           id: "totalsToShow",
           label: "Choose which totals you want totted up and displayed",
           parent: "configForm",
           options: {
             showTotalsWeek: "Show weekly totals",
             showTotalsMonth: "Show monthly totals",
             showTotalsWeekAndMonth: "Show both weekly and monthly totals"
           },
           disabled: true
         }
      ]
    },
  ],

  DATETYPE_YYMMDD = {
    label: "yy/mm/dd"
  },
  DATETYPE_DDMMYY = {
    label: "dd/mm/yy"
  },
  DATETYPE_MMDDYY = {
    label: "mm/dd/yy"
  },
  DATETYPE_DEFAULT = DATETYPE_DDMMYY,

  JOB_DEFAULT_1 = {
    name: "Purchasing",
    color: "#000",
    bgcolor: "#0ff"
  },

  JOB_DEFAULT_2 = {
    name: "Administration",
    color: "#0f0",
    bgcolor: "#123"
  },

  CLIENT_DEFAULT_1 = {
    name: "Will @ ACME CO",
    color: "#fff",
    bgcolor: "#f00"
  },

  CLIENT_DEFAULT_2 = {
    name: "Diamond Jules",
    color: "#435",
    bgcolor: "#821"
  },

  // these string values have to match those used in the GUIDATA_CONFIG options
  TIMESPAN_WEEK = "timespanWeek",
  TIMESPAN_MONTH = "timespanMonth",
  TIMESPAN_YEAR = "timespanYear",
  TIMESPAN_DEFAULT = TIMESPAN_MONTH,
  DAYSINWEEK = 7,
  DAYSINMONTH = 31, // set to maxiumum possible (only used for display purposes)
  DAYSINYEAR = 365,

  // which totals to showing
  SHOWTOTALS_WEEK = "showTotalsWeek",
  SHOWTOTALS_MONTH = "showTotalsMonth",
  SHOWTOTALS_BOTH = "showTotalsWeekAndMonth",
  SHOWTOTALS_DEFAULT = SHOWTOTALS_BOTH,

  TXT_STORAGE_UNSUPPORTED = "Sorry - storage is not supported on this device or browser"
  ;


  /* ---------------------------------------------------------------------------
		Return an object mirroring all the constants created above
    ** EVERYTHING ADDED ABOVE UNDER var MUST ALSO BE ADDED HERE **
	--------------------------------------------------------------------------- */
	return {
    APP_ID: APP_ID,
    GUIDATA_NAVMAIN: GUIDATA_NAVMAIN,
    PAGETYPE_TIMESHEETS: PAGETYPE_TIMESHEETS,
    PAGETYPE_CONFIG: PAGETYPE_CONFIG,
    PAGETYPE_JOBSANDCLIENTS: PAGETYPE_JOBSANDCLIENTS,
    PAGETYPE_DEFAULT: PAGETYPE_DEFAULT,
    BODYID_TIMESHEETS: BODYID_TIMESHEETS,
    BODYID_CONFIG: BODYID_CONFIG,
    BODYID_JOBSANDCLIENTS: BODYID_JOBSANDCLIENTS,
    GUITYPE_COL: GUITYPE_COL,
    GUITYPE_ROW: GUITYPE_ROW,
    GUITYPE_BTN: GUITYPE_BTN,
    GUITYPE_RADIOBTN: GUITYPE_RADIOBTN,
    GUITYPE_FORM: GUITYPE_FORM,
    GUITYPE_SELECT: GUITYPE_SELECT,
    GUITYPE_TEXTINPUT: GUITYPE_TEXTINPUT,
    GUITYPE_SECTION: GUITYPE_SECTION,
    GUITYPE_METHODCALL: GUITYPE_METHODCALL,
    GUITYPE_COLORPICKER: GUITYPE_COLORPICKER,
    GUITYPE_UL: GUITYPE_UL,
    TIMESHEETCONTAINER_ID: TIMESHEETCONTAINER_ID,
    PAGEDATA_JOBSANDCLIENTS: PAGEDATA_JOBSANDCLIENTS,
    GUIDATA_JOBSANDCLIENTS: GUIDATA_JOBSANDCLIENTS,
    PAGEDATA_TIMESHEETS: PAGEDATA_TIMESHEETS,
    GUIDATA_TIMESHEETS: GUIDATA_TIMESHEETS,
    PAGEDATA_CONFIG: PAGEDATA_CONFIG,
    GUIDATA_CONFIG: GUIDATA_CONFIG,
    DATETYPE_YYMMDD: DATETYPE_YYMMDD,
    DATETYPE_DDMMYY: DATETYPE_DDMMYY,
    DATETYPE_MMDDYY: DATETYPE_MMDDYY,
    DATETYPE_DEFAULT: DATETYPE_DEFAULT,
    TIMESPAN_WEEK: TIMESPAN_WEEK,
    TIMESPAN_MONTH: TIMESPAN_MONTH,
    TIMESPAN_YEAR: TIMESPAN_YEAR,
    TIMESPAN_DEFAULT: TIMESPAN_DEFAULT,
    DAYSINWEEK: DAYSINWEEK,
    DAYSINMONTH: DAYSINMONTH,
    DAYSINYEAR: DAYSINYEAR,
    CLASS_BTNNAV: CLASS_BTNNAV,
    CLASS_FORMMAIN: CLASS_FORMMAIN,
    CLASS_COL: CLASS_COL,
    CLASS_ROW: CLASS_ROW,
    EL_ID_COLHEADING: EL_ID_COLHEADING,
    CLIENT_STR: CLIENT_STR,
    JOB_STR: JOB_STR,
    EL_ID_JOBNAMEIN: EL_ID_JOBNAMEIN,
    EL_ID_CLIENTNAMEIN: EL_ID_CLIENTNAMEIN,
    JOB_FG_COLPICK: JOB_FG_COLPICK,
    JOB_BG_COLPICK: JOB_BG_COLPICK,
    CLIENT_FG_COLPICK: CLIENT_FG_COLPICK,
    CLIENT_BG_COLPICK: CLIENT_BG_COLPICK,
    TXT_STORAGE_UNSUPPORTED: TXT_STORAGE_UNSUPPORTED,
    JOB_DEFAULT_1: JOB_DEFAULT_1,
    JOB_DEFAULT_2: JOB_DEFAULT_2,
    CLIENT_DEFAULT_1: CLIENT_DEFAULT_1,
    CLIENT_DEFAULT_2: CLIENT_DEFAULT_2,
    CONTENTTYPE_CLIENTS: CONTENTTYPE_CLIENTS,
    CONTENTTYPE_JOBS: CONTENTTYPE_JOBS,
    DATATYPE_JOB: DATATYPE_JOB,
    DATATYPE_CLIENT: DATATYPE_CLIENT,
    EL_ID_CLIENTSAVEBTN: EL_ID_CLIENTSAVEBTN,
    EL_ID_JOBSAVEBTN: EL_ID_JOBSAVEBTN,
    EL_ID_SELECTCLIENT: EL_ID_SELECTCLIENT,
    EL_ID_SELECTJOB: EL_ID_SELECTJOB,
    SHOWTOTALS_WEEK: SHOWTOTALS_WEEK,
    SHOWTOTALS_MONTH: SHOWTOTALS_MONTH,
    SHOWTOTALS_BOTH: SHOWTOTALS_BOTH,
    SHOWTOTALS_DEFAULT: SHOWTOTALS_DEFAULT
  };


}());
