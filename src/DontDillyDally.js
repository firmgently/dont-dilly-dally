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
  prop, dateDisplayStart, dateDisplaySelected, dateToday, timespanDisplay,

	// methods
  doSetup, selectPage, drawPage, fillHTMLFromOb, drawGUIFromAr,
  createButtonFromOb, createFormFromOb, createTextInputFromOb, callMethodFromOb,
  createSelectFromOb, createSectionFromOb, drawTimesheets, drawConfigGUI
	;

  // create local references to public vars (fake constants) from DDDConsts
  for (prop in uk.co.firmgently.DDDConsts) {
    this[prop] = uk.co.firmgently.DDDConsts[prop];
  }


/* -----------------------------------------------------------------------------
  set up methods
----------------------------------------------------------------------------- */

  doSetup = function() {
    dateDisplayStart = new Date();
    dateDisplaySelected = new Date();
    dateToday = new Date();
    timespanDisplay = TIMESPAN_DEFAULT;

    localStorage.clear();
    if(typeof(Storage) !== "undefined") {
      if (!localStorage.getObject(APP_ID)) {
        localStorage.setObject(APP_ID, {
          pagetypeCurrent: PAGETYPE_DEFAULT
        });
      }
      selectPage(localStorage.getObject(APP_ID).pagetypeCurrent);
    } else {
      logMsg(TXT_STORAGE_UNSUPPORTED);
    }
  };


  selectPage = function(pageType) {
    localStorage.getObject(APP_ID).pagetypeCurrent = pageType;
    drawPage();
  };


  drawPage = function() {
    switch (localStorage.getObject(APP_ID).pagetypeCurrent) {
      case PAGETYPE_TIMESHEETS:
        fillHTMLFromOb(PAGEDATA_TIMESHEETS);
        drawGUIFromAr(GUIDATA_TIMESHEETS);
        break;
      case PAGETYPE_CONFIG:
        fillHTMLFromOb(PAGEDATA_CONFIG);
        drawGUIFromAr(GUIDATA_CONFIG);
        break;
      case PAGETYPE_JOBSANDCLIENTS:
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
    registerEventHandler(button_el, "mousedown", ob.method);

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
    parent_el.appendChild(input_el);

    if (ob.class) { addClassname(input_el, ob.class); }
  };


  createSelectFromOb = function(ob) {
    var
    prop, select_el, label_el,
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
    parent_el.appendChild(select_el);

    for (prop in ob.options) {
      select_el.options[select_el.options.length] = new Option(ob.options[prop], prop);
    }

    if (ob.class) { addClassname(select_el, ob.class); }

    registerEventHandler(select_el, "change", ob.method);
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
    // registerEventHandler(form_el, "mousedown", ob.method);

    if (ob.el_ar) { drawGUIFromAr(ob.el_ar); }

    if (ob.hidden) { form_el.style.display = "none"; }
  };


  callMethodFromOb = function(ob) {
      /*
      eval usage has been carefully considered and is the best solution
      for calling one of many methods whose names have been stored in the constants file

      ob.method contains a hard-coded string from DDDConsts.js

      ! NO USER INPUT CAN MAKE IT INTO THIS LOCATION UNLESS THE SOURCE CODE
      ! HAS BEEN COMPROMISED. IF THAT HAPPENS WE'RE BUGGERED ANYWAY !!
      */
      eval(ob.method).call(ob.scope);
  };


	// create local references to public methods from FGUtils
	// (saves typing/less verbosity)
	for (prop in uk.co.firmgently.FGUtils) {
		this[prop] = uk.co.firmgently.FGUtils[prop];
	}


  /* ---------------------------------------------------------------------------
		page drawing methods
	--------------------------------------------------------------------------- */

  drawTimesheets = function() {
    var
    i, daysToDraw, isOddDay, weekdayCur,
    isToday, rowClassname,
    day_el,
    weekStartDay = 1, // 0 = Sunday, 1 = Monday etc
    parent_el = document.getElementById(TIMESHEETCONTAINER_ID),
    dayCur = new Date();

    switch(timespanDisplay) {
      case TIMESPAN_WEEK:
        weekdayCur = dayCur.getDay(); // 0 = Sunday, 1 = Monday etc
        dayCur.setDate(dayCur.getDate() - weekdayCur + weekStartDay); // gets first day of week
        daysToDraw = DAYSINWEEK;
        break;
      case TIMESPAN_MONTH:
        dayCur.setDate(1);
        daysToDraw = DAYSINMONTH;
        break;
      case TIMESPAN_YEAR:
        dayCur.setMonth(0);
        dayCur.setDate(1);
        daysToDraw = DAYSINYEAR;
        break;
      default:
        break;
    }

    isOddDay = false;
    for (i = 0; i < daysToDraw; i++) {
      rowClassname = "day ";
      isToday = !Math.round(daysBetween(dayCur, dateToday));
      if (isToday) { rowClassname += "today "; }
      if (isOddDay) { rowClassname += "odd "; }
      if (dayCur.getDay() === weekStartDay) { rowClassname += "week-start "; }
      if (dayCur.getDate() === 1) { rowClassname += "month-start "; }
      day_el = document.createElement("span");
      parent_el.appendChild(day_el);
      addClassname(day_el, rowClassname);
      day_el.innerHTML = dayCur;
      dayCur.setDate(dayCur.getDate() + 1);
      isOddDay = !isOddDay; // flip state
    }
  };


  drawConfigGUI = function() {
    logMsg("DRAWING CONFIG GUI");
  };


	/* ---------------------------------------------------------------------------
		begin...
	--------------------------------------------------------------------------- */

  doSetup();

	return;


// 'this' is undefined because of "use strict",
// calling the function with .call(this) fixes it
}).call(this);
