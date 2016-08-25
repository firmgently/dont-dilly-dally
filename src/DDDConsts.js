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

  CLASS_BTNNAV = "btnNav",
  CLASS_FORMMAIN = "formMain",
  CLASS_COL = "col",
  CLASS_ROW = "row",

  EL_ID_JOBNAMEIN = "jobNameIn",
  EL_ID_CLIENTNAMEIN = "clientNameIn",

  COLPICK_FG_CLIENT = "clientFGPicker",
  COLPICK_BG_CLIENT = "clientBGPicker",
  COLPICK_FG_JOB = "jobFGPicker",
  COLPICK_BG_JOB = "jobBGPicker",

  DATATYPE_JOB = "dataTypeJob",
  DATATYPE_CLIENT = "dataTypeClient",

  CONTENTTYPE_CLIENTS = "contentTypeClients",
  CONTENTTYPE_JOBS = "contentTypeJobs",

  TIMESHEETCONTAINER_ID = "timesheetContainer",

/*  COLORPICKER_CONF = {
    w: "100px", h: "100px"
  },*/

  GUIDATA_NAVMAIN = [
    {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      id: BODYID_TIMESHEETS,
      label: "Timesheets",
      method: "navClick",
      args: [PAGETYPE_TIMESHEETS],
      scopeID: "main",
      parentID: "navMain"
    }, {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      id: BODYID_JOBSANDCLIENTS,
      label: "Jobs & Clients",
      method: "navClick",
      args: [PAGETYPE_JOBSANDCLIENTS],
      scopeID: "main",
      parentID: "navMain"
    }, {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      id: BODYID_CONFIG,
      label: "Settings",
      method: "navClick",
      args: [PAGETYPE_CONFIG],
      scopeID: "main",
      parentID: "navMain"
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
      parentID: "main",
    }, {
      type: GUITYPE_FORM,
      id: "createClientForm",
      class: CLASS_FORMMAIN,
      title: "Fill in client details",
      method: null,
      parentID: "editClientCol",
      el_ar: [
        {
          type: GUITYPE_ROW,
          id: "clientNewRow",
          class: CLASS_ROW,
          parentID: "createClientForm",
        }, {
          type: GUITYPE_ROW,
          id: "clientsExistingRow",
          class: CLASS_ROW,
          parentID: "createClientForm",
        }, {
          type: GUITYPE_TEXTINPUT,
          id: EL_ID_CLIENTNAMEIN,
          label: "Client name",
          parentID: "clientNewRow",
          method: "onClientTyped",
          args: [],
          scopeID: "createClientForm"
        }, {
          type: GUITYPE_BTN,
          label: "Create new",
          id: "createNewClientBtn",
          method: "newClientFormSubmit",
          args: [],
          scopeID: "createClientForm",
          parentID: "clientNewRow"
        }, {
          type: GUITYPE_COLORPICKER,
          id: COLPICK_FG_CLIENT,
          class: "color-picker",
          parentID: "clientsExistingRow"
        }, {
          type: GUITYPE_COLORPICKER,
          id: COLPICK_BG_CLIENT,
          class: "color-picker",
          parentID: "clientsExistingRow"
        }, {
          type: GUITYPE_SELECT,
          label: "Existing clients",
          args: [],
          scopeID: "createClientForm",
          parentID: "clientsExistingRow",
          id: "selectClient",
          contentType: CONTENTTYPE_CLIENTS
        }
      ]
    }, {
      type: GUITYPE_COL,
      id: "editJobCol",
      class: CLASS_COL,
      parentID: "main",
    }, {
      type: GUITYPE_FORM,
      id: "createJobForm",
      class: CLASS_FORMMAIN,
      title: "Fill in job details",
      method: null,
      parentID: "editJobCol",
      hidden: false,
      el_ar: [
        {
          type: GUITYPE_ROW,
          id: "jobNewRow",
          class: CLASS_ROW,
          parentID: "createJobForm",
        }, {
          type: GUITYPE_ROW,
          id: "jobsExistingRow",
          class: CLASS_ROW,
          parentID: "createJobForm",
        }, {
          type: GUITYPE_TEXTINPUT,
          id: EL_ID_JOBNAMEIN,
          label: "Job name",
          parentID: "jobNewRow"
        }, {
          type: GUITYPE_BTN,
          label: "Create new",
          id: "createNewJobBtn",
          method: "newJobFormSubmit",
          scopeID: "createJobForm",
          args: [],
          parentID: "jobNewRow"
        }, {
          type: GUITYPE_COLORPICKER,
          id: COLPICK_FG_JOB,
          class: "color-picker",
          parentID: "jobsExistingRow"
        }, {
          type: GUITYPE_COLORPICKER,
          id: COLPICK_BG_JOB,
          class: "color-picker",
          parentID: "jobsExistingRow"
        }, {
          type: GUITYPE_SELECT,
          label: "Existing jobs",
          method: "selectJobs",
          args: [],
          scopeID: "createJobForm",
          parentID: "jobsExistingRow",
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
      parentID: "main"
    }, {
      type: GUITYPE_METHODCALL,
      method: "drawTimesheets",
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
      parentID: "main",
      hidden: false,
      el_ar: [
         {
           type: GUITYPE_RADIOBTN,
           id: "timesheetRange",
           label: "Choose how many days you want to show on the timesheet page",
           parentID: "configForm",
           options: {
             timespanWeek: "A week",
             timespanMonth: "A month",
             timespanYear: "A year"
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
    name: "Fake Job (for testing)",
    color: "#000",
    bgcolor: "#0ff"
  },

  JOB_DEFAULT_2 = {
    name: "General admin",
    color: "#0f0",
    bgcolor: "#123"
  },

  CLIENT_DEFAULT_1 = {
    name: "Dummy Client (for testing)",
    color: "#fff",
    bgcolor: "#f00"
  },

  CLIENT_DEFAULT_2 = {
    name: "I and I",
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
    EL_ID_JOBNAMEIN: EL_ID_JOBNAMEIN,
    EL_ID_CLIENTNAMEIN: EL_ID_CLIENTNAMEIN,
    COLPICK_FG_JOB: COLPICK_FG_JOB,
    COLPICK_BG_JOB: COLPICK_BG_JOB,
    COLPICK_FG_CLIENT: COLPICK_FG_CLIENT,
    COLPICK_BG_CLIENT: COLPICK_BG_CLIENT,
    TXT_STORAGE_UNSUPPORTED: TXT_STORAGE_UNSUPPORTED,
    JOB_DEFAULT_1: JOB_DEFAULT_1,
    JOB_DEFAULT_2: JOB_DEFAULT_2,
    CLIENT_DEFAULT_1: CLIENT_DEFAULT_1,
    CLIENT_DEFAULT_2: CLIENT_DEFAULT_2,
    CONTENTTYPE_CLIENTS: CONTENTTYPE_CLIENTS,
    CONTENTTYPE_JOBS: CONTENTTYPE_JOBS,
    DATATYPE_JOB: DATATYPE_JOB,
    DATATYPE_CLIENT: DATATYPE_CLIENT
  };


}());
