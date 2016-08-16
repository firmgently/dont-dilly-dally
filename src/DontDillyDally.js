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

	// methods
  doSetup, selectPage, drawPage, fillHTMLFromOb, drawGUIFromAr,
  createButtonFromOb, createFormFromOb, createTextInputFromOb,
  callMethodFromObOnElement, callMethodFromOb, onFormMouseDown,
  createSelectFromOb, createRadioFromOb, createSectionFromOb, drawTimesheets,
  drawConfigGUI, navClick,
  dataStoragePossible, initDataObject, dataStoreObject, dataRetrieveObject,
  dataUpdateObject, extraStyles, createClientOrJobFromOb
	;

  /* ---------------------------------------------------------------------------
    create local references to public vars (fake constants) from DDDConsts
	--------------------------------------------------------------------------- */
  for (prop in uk.co.firmgently.DDDConsts) {
    this[prop] = uk.co.firmgently.DDDConsts[prop];
  }

  /* ---------------------------------------------------------------------------
    create local references to public methods from FGUtils
    (saves typing/less verbosity)
	--------------------------------------------------------------------------- */

	for (prop in uk.co.firmgently.FGUtils) {
		this[prop] = uk.co.firmgently.FGUtils[prop];
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


  initDataObject = function() {
    // if no preferences are stored create some defaults
    if (!dataRetrieveObject("prefs")) {
      dataStoreObject("prefs", { pagetype: PAGETYPE_DEFAULT, timespan: TIMESPAN_DEFAULT });
      dataStoreObject("clientNum", 0);
      dataStoreObject("JobNum", 0);

      // dataStoreObject("clients", { client1: CLIENT_DEFAULT_1, client2: CLIENT_DEFAULT_2});
      dataStoreObject("clients", []);
      createClientOrJobFromOb(CLIENT_DEFAULT_1, DATATYPE_CLIENT);
      createClientOrJobFromOb(CLIENT_DEFAULT_2, DATATYPE_CLIENT);

      // dataStoreObject("jobs", { job1: JOB_DEFAULT_1, job2: JOB_DEFAULT_2});
      dataStoreObject("jobs", []);
      createClientOrJobFromOb(JOB_DEFAULT_1, DATATYPE_JOB);
      createClientOrJobFromOb(JOB_DEFAULT_2, DATATYPE_JOB);

      dataStoreObject("timesheets", {});
    }
  };


  dataStoreObject = function(category, ob) {
    localStorage.setItem(APP_ID + "_" + category, JSON.stringify(ob));
    // logMsg(dataRetrieveObject(category));
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



  /* -----------------------------------------------------------------------------
    set up methods
  ----------------------------------------------------------------------------- */

  doSetup = function() {
    dateDisplayStart = new Date();
    dateDisplaySelected = new Date();
    dateToday = new Date();

    // extraStyles is a dynamic stylesheet used to store
    // styles for clients and jobs
    extraStyles = document.createElement("style");
    document.getElementsByTagName('head')[0].appendChild(extraStyles);

    localStorage.clear();
    if(dataStoragePossible()) {
      initDataObject();
      selectPage(dataRetrieveObject("prefs").pagetype);
      drawGUIFromAr(GUIDATA_NAVMAIN);
    }
  };


  selectPage = function(pagetype) {
    dataUpdateObject("prefs", "pagetype", pagetype);
    drawPage();
  };


  drawPage = function() {
    // clear existing content
    document.getElementById("main").innerHTML = "";
    switch (dataRetrieveObject("prefs").pagetype) {
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
  };


  fillHTMLFromOb = function(ob) {
    for (var prop in ob) {
      document.getElementById(prop).innerHTML = ob[prop];
    }
  };


  drawGUIFromAr = function(ar) {
    var i, ob;
    for (i = 0; i < ar.length; i++) {
      ob = ar[i];
      switch (ob.type) {
        case GUITYPE_BTN:
          createButtonFromOb(ob);
          break;
        case GUITYPE_FORM:
          createFormFromOb(ob);
          break;
        case GUITYPE_TEXTINPUT:
          createTextInputFromOb(ob);
          break;
        case GUITYPE_SELECT:
          createSelectFromOb(ob);
          break;
        case GUITYPE_RADIOBTN:
          createRadioFromOb(ob);
          break;
        case GUITYPE_SECTION:
          createSectionFromOb(ob);
          break;
        case GUITYPE_METHODCALL:
          callMethodFromOb(ob);
          break;
        default:
          break;
      }
    }
  };


  createButtonFromOb = function(ob) {
    var
    button_el,
    parent_el = document.getElementById(ob.parentID);

    if (ob.id) {
      button_el = createElementWithId("button", ob.id);
    } else {
      button_el = document.createElement("button");
    }
    parent_el.appendChild(button_el);

    if (ob.class) { addClassname(button_el, ob.class); }
    button_el.innerHTML = ob.label;
    button_el.ob = ob;
    registerEventHandler(button_el, "mousedown", callMethodFromObOnElement);

    if (ob.disabled) { button_el.disabled = ob.disabled; }
  };


  createTextInputFromOb = function(ob) {
    var
    input_el, label_el,
    parent_el = document.getElementById(ob.parentID);

    if (ob.label) {
      label_el = document.createElement("label");
      label_el.innerHTML = ob.label;
      parent_el.appendChild(label_el);
      label_el.htmlFor = ob.id;
    }
    if (ob.id) {
      input_el = createElementWithId("input", ob.id);
      input_el.name = ob.id;
    } else {
      input_el = document.createElement("input");
    }
    input_el.setAttribute("type", "text");
    parent_el.appendChild(input_el);

    if (ob.class) { addClassname(input_el, ob.class); }
  };


  createSelectFromOb = function(ob) {
    var
    i, prop, select_el, label_el, option_el, clientOrJob_ob,
    parent_el = document.getElementById(ob.parentID);

    if (ob.label) {
      label_el = document.createElement("label");
      label_el.innerHTML = ob.label;
      parent_el.appendChild(label_el);
      label_el.htmlFor = ob.id;
    }
    if (ob.id) {
      select_el = createElementWithId("select", ob.id);
      select_el.name = ob.id;
    } else {
      select_el = document.createElement("select");
    }
    select_el.setAttribute("size", "1.1"); // HACK maybe to allow styling of individual options
    parent_el.appendChild(select_el);

    if (ob.contentType) {
      switch (ob.contentType) { // clients and jobs options get treated differently
        case CONTENTTYPE_CLIENTS:
          ob.options = dataRetrieveObject("clients");
          break;
        case CONTENTTYPE_JOBS:
          ob.options = dataRetrieveObject("jobs");
          break;
        default:
          break;
      }
      for (i = 0; i < ob.options.length; i++) {
        clientOrJob_ob = ob.options[i];
        option_el = select_el.options[select_el.options.length] = new Option(clientOrJob_ob.name, clientOrJob_ob.class);
        addClassname(option_el, clientOrJob_ob.class);
      }

    } else { // normal options
      for (prop in ob.options) {
        select_el.options[select_el.options.length] = new Option(ob.options[prop], prop);
      }
    }

    if (ob.class) { addClassname(select_el, ob.class); }

    registerEventHandler(select_el, "change", ob.method);
  };


  createRadioFromOb = function(ob) {
    var
    prop, radio_el, label_el,
    parent_el = document.getElementById(ob.parentID);

    for (prop in ob.options) {
      label_el = document.createElement("label");
      label_el.innerHTML = ob.options[prop];
      parent_el.appendChild(label_el);

      radio_el = document.createElement("input");
      radio_el.setAttribute("type", "radio");
      parent_el.appendChild(radio_el);
      radio_el.id = ob.id;
      radio_el.name = ob.id;
      radio_el.value = prop;
      if (prop === dataRetrieveObject("prefs").timespan) {
        radio_el.checked = true;
      }
      label_el.htmlFor = ob.id;
      if (ob.class) { addClassname(radio_el, ob.class); }
    }
  };


  createSectionFromOb = function(ob) {
    var
    el,
    parent_el = document.getElementById(ob.parentID);
    if (ob.id) {
      el = createElementWithId("section", ob.id);
    } else {
      el = document.createElement("section");
    }
    parent_el.appendChild(el);
    if (ob.class) { addClassname(el, ob.class); }
  };



  /* ---------------------------------------------------------------------------

	--------------------------------------------------------------------------- */

  createClientOrJobFromOb = function(ob, dataType) {
    // create unique number to be used in object name/key
    var id, ar, n, prefix, selector, collectiveName;

    if (dataType === DATATYPE_CLIENT) {
      prefix = "client";
    } else if (dataType === DATATYPE_JOB) {
      prefix = "job";
    }
    n = 0 + dataRetrieveObject(prefix + "Num") + 1;
    dataStoreObject(prefix + "Num", n);
    id = prefix + n;
    ob.class = id;

    // get correct array (/client/s or /job/s)
    collectiveName = prefix + "s";
    ar = dataRetrieveObject(collectiveName);
    ar.push(ob);
    dataStoreObject(collectiveName, ar);

    selector = "." + id + ", " + "." + id + ":hover" + ", " + "." + id + ":active";
    addCSSRule(selector, "color", ob.color);
    addCSSRule(selector, "background-color", ob.bgcolor);
  };


  callMethodFromObOnElement = function(e) {
    logMsg("callMethodFromObOnElement: " + JSON.stringify(e.target.ob));
    callMethodFromOb(e.target.ob);
  };


  callMethodFromOb = function(ob) {
    logMsg("callMethodFromOb: " + JSON.stringify(ob));
    /*
    eval usage has been carefully considered and is the best solution
    for calling one of many methods whose names (strings) have been stored in
    the constants file

    ob.method contains a hard-coded string from DDDConsts.js

    ! NO USER INPUT CAN MAKE IT INTO THIS LOCATION UNLESS THE SOURCE CODE
    ! HAS BEEN COMPROMISED. IF THAT HAPPENS WE'RE BUGGERED ANYWAY !!
    */

    /* jshint ignore:start */
    eval(ob.method).apply(ob.scope, ob.args);
    /* jshint ignore:end */
  };



  /* ---------------------------------------------------------------------------
		page drawing methods
	--------------------------------------------------------------------------- */

  drawTimesheets = function() {
    var
    i, daysToDraw, isOddDay, weekdayCur,
    isToday, rowClassname,
    day_el, date_el, holder_el, hrs_el, client_el, job_el, jobnotes_el,
    ob_temp,
    weekStartDay = 1, // 0 = Sunday, 1 = Monday etc
    parent_el = document.getElementById(TIMESHEETCONTAINER_ID),
    dayCur = new Date();

    switch(dataRetrieveObject("prefs").timespan) {
      case TIMESPAN_WEEK:
        weekdayCur = dayCur.getDay(); // 0 = Sunday, 1 = Monday etc
        dayCur.setDate(dayCur.getDate() - weekdayCur + weekStartDay); // gets first day of week
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
      rowClassname = "day row ";
      isToday = !Math.round(daysBetween(dayCur, dateToday));
      if (isToday) { rowClassname += "today "; }
      if (isOddDay) { rowClassname += "odd "; }
      isOddDay = !isOddDay; // flip state
      if (dayCur.getDay() === weekStartDay) { rowClassname += "week-start "; }
      if (dayCur.getDate() === 1) { rowClassname += "month-start "; }
      day_el = createElementWithId("span", "day_el" + i);
      parent_el.appendChild(day_el);
      addClassname(day_el, rowClassname);
      // date
      date_el = document.createElement("span");
      addClassname(date_el, "date");
      addClassname(date_el, "col");
      day_el.appendChild(date_el);
      date_el.innerHTML = getFormattedDate(dayCur, DATETYPE_DEFAULT.label);
      dayCur.setDate(dayCur.getDate() + 1);

      holder_el = createElementWithId("span", "holder_el" + i);
      // holder_el = document.createElement("span");
      addClassname(holder_el, "day-data");
      addClassname(holder_el, "col");
      day_el.appendChild(holder_el);

      // hours
      hrs_el = document.createElement("span");
      holder_el.appendChild(hrs_el);
      hrs_el.innerHTML = "HRS RPLCE";
      // client
      ob_temp = dataRetrieveObject("clients");
      ob_temp.contentType = CONTENTTYPE_CLIENTS;
      ob_temp.parentID = holder_el.id;
      createSelectFromOb(ob_temp);
      // job
      ob_temp = dataRetrieveObject("jobs");
      ob_temp.contentType = CONTENTTYPE_JOBS;
      ob_temp.parentID = holder_el.id;
      createSelectFromOb(ob_temp);
      // job  notes
      jobnotes_el = createTextInputFromOb({
        class: "jobNotes",
        parentID: ("holder_el" + i)
      });
    }
  };



  /* ---------------------------------------------------------------------------
		FORMS
	--------------------------------------------------------------------------- */

  createFormFromOb = function(ob) {
    var
    i, form_el,
    parent_el = document.getElementById(ob.parentID);

    if (ob.id) {
      form_el = createElementWithId("form", ob.id);
    } else {
      form_el = document.createElement("form");
    }
    parent_el.appendChild(form_el);

    if (ob.class) { addClassname(form_el, ob.class); }
    // form_el.innerHTML = ob.label;

    if (ob.el_ar) { drawGUIFromAr(ob.el_ar); }

    if (ob.hidden) { form_el.style.display = "none"; }

    form_el.ob = ob;
    registerEventHandler(form_el, "click", onFormMouseDown);
  };


  onFormMouseDown = function(e) {
    var form = e.target.form;
    if (form && form.id) {
      switch (form.id) {
        case "createClientForm":
          break;
        case "configForm":
          dataUpdateObject("prefs", "timespan", form.timesheetRange.value);
          break;
        default:
          break;
      }
    }
  };



  /* ---------------------------------------------------------------------------

	--------------------------------------------------------------------------- */

  drawConfigGUI = function() {
    logMsg("DRAWING CONFIG GUI");
  };


  navClick = function(e) {
    selectPage(arguments[0]);
  };



	/* ---------------------------------------------------------------------------
		BEGIN...
	--------------------------------------------------------------------------- */

  doSetup();

	return;


// 'this' would be undefined because of "use strict",
// calling the function with .call(this) fixes it
}).call(this);
