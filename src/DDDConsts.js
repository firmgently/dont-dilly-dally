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

  PAGETYPE_TIMESHEETS = "pagetypeTimesheets",
  PAGETYPE_CONFIG = "pagetypeConfig",
  PAGETYPE_JOBSANDCLIENTS = "pagetypeJobsAndClients",
  PAGETYPE_DEFAULT = PAGETYPE_TIMESHEETS,
  BODYID_TIMESHEETS = "timesheets",
  BODYID_CONFIG = "config",
  BODYID_JOBSANDCLIENTS = "jobsClients",

  GUITYPE_BTN = "GUITypeBtn",
  GUITYPE_RADIOBTN = "GUITypeRadioBtn",
  GUITYPE_TEXTINPUT = "GUITypeTextInput",
  GUITYPE_SELECT = "GUITypeSelect",
  GUITYPE_FORM = "GUITypeForm",
  GUITYPE_SECTION = "GUITypeSection",
  GUITYPE_METHODCALL = "GUITypeMethodCall",

  CLASS_BTNNAV = "btnNav",
  CLASS_BTNMAIN = "btnMain",
  CLASS_FORMMAIN = "formMain",

  TIMESHEETCONTAINER_ID = "timesheetContainer",

  GUIDATA_NAVMAIN = [
    {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      label: "Jobs & Clients",
      method: "navClick",
      args: [PAGETYPE_JOBSANDCLIENTS],
      scope: "main",
      parentID: "navMain"
    }, {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      label: "Timesheets",
      method: "navClick",
      args: [PAGETYPE_TIMESHEETS],
      scope: "main",
      parentID: "navMain"
    }, {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      label: "Config",
      method: "navClick",
      args: [PAGETYPE_CONFIG],
      scope: "main",
      parentID: "navMain"
    }
  ],

  PAGEDATA_JOBSANDCLIENTS = {
    pageTitle: "Jobs and Clients",
    intro: "Add, delete or edit jobs and clients on this page."
  },
  GUIDATA_JOBSANDCLIENTS = [
    {
      type: GUITYPE_BTN,
      id: "createCompanyBtn",
      class: CLASS_BTNMAIN,
      label: "Create new company",
      method: "createCompany",
      parentID: "main"
    }, {
      type: GUITYPE_BTN,
      id: "createClientBtn",
      class: CLASS_BTNMAIN,
      label: "Create new client",
      method: "createClient",
      parentID: "main",
      disabled: true
    }, {
      type: GUITYPE_FORM,
      id: "createClientForm",
      class: CLASS_FORMMAIN,
      title: "Fill in client details",
      method: "submitClientForm",
      parentID: "main",
      hidden: false,
      el_ar: [
        {
          type: GUITYPE_TEXTINPUT,
          id: "clientNameIn",
          label: "Client name",
          parentID: "createClientForm"
        }, {
          type: GUITYPE_BTN,
          label: "Create new",
          method: "submitForm",
          parentID: "createClientForm",
          disabled: true
        }, {
          type: GUITYPE_SELECT,
          label: "Existing clients",
          method: "selectClient",
          args: [],
          scope: "main",
          parentID: "createClientForm",
          id: "selectClient",
          options: {
            opt1: "Option 1",
            opt2: "Option 2",
            opt3: "Option 3"
          },
          disabled: true
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
      scope: "main"
    }
  ],

  PAGEDATA_CONFIG = {
    pageTitle: "Configuration",
    intro: "Show and hide things and customise settings."
  },
  GUIDATA_CONFIG = [
    {
      type: GUITYPE_METHODCALL,
      method: "drawConfigGUI",
      scope: "main"
    }, {
      type: GUITYPE_FORM,
      id: "configForm",
      class: CLASS_FORMMAIN,
      title: "Set your preferences here",
      parentID: "main",
      // method: "callMethodFromFormElement",
      // args: [],
      // scope: "main",
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
    GUITYPE_BTN: GUITYPE_BTN,
    GUITYPE_RADIOBTN: GUITYPE_RADIOBTN,
    GUITYPE_FORM: GUITYPE_FORM,
    GUITYPE_SELECT: GUITYPE_SELECT,
    GUITYPE_TEXTINPUT: GUITYPE_TEXTINPUT,
    GUITYPE_SECTION: GUITYPE_SECTION,
    GUITYPE_METHODCALL: GUITYPE_METHODCALL,
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
    TXT_STORAGE_UNSUPPORTED: TXT_STORAGE_UNSUPPORTED
  };


}());
