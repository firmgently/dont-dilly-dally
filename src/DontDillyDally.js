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
  dayOfYear,

	// methods
  doSetup, selectPage, drawPage, fillHTMLFromOb, drawGUIFromAr,
  createButtonFromOb, createFormFromOb, createTextInputFromOb,
  callMethodFromObOnElement, callMethodFromOb, onFormClick,
  createSelectFromOb, createRadioFromOb, addLIsFromOb,
  createBasicElementFromOb, createColorPickerFromOb,
  drawTimesheets, getNextName, newClientCreate, newJobCreate,
  navClick, onClientTyped, onJobTyped, onFormSubmit,
  dataStoragePossible, initDataObject, dataStoreObject, dataRetrieveObject,
  dataUpdateObject, clientAndJobStyleSheet, createClientOrJobFromOb,
  newClientFormSave, newJobFormSave, clientInputWasLastEmpty,
  updateRefsToElements, updateSelected, addWorkItem
	;

  /* ---------------------------------------------------------------------------
    create local references to public vars (unenforced constants) from DDDConsts
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
      dataStoreObject("jobNum", 0);

      dataStoreObject(CLIENT_STR, {});
      createClientOrJobFromOb(CLIENT_DEFAULT_1, DATATYPE_CLIENT);
      createClientOrJobFromOb(CLIENT_DEFAULT_2, DATATYPE_CLIENT);

      dataStoreObject(JOB_STR, {});
      createClientOrJobFromOb(JOB_DEFAULT_1, DATATYPE_JOB);
      createClientOrJobFromOb(JOB_DEFAULT_2, DATATYPE_JOB);

      dataStoreObject("day", {});
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



  /* -----------------------------------------------------------------------------
    set up methods
  ----------------------------------------------------------------------------- */

  doSetup = function() {
    dateDisplayStart = new Date();
    dateDisplaySelected = new Date();
    dateToday = new Date();


   localStorage.clear();


    if(dataStoragePossible()) {
      initDataObject();
      selectPage(dataRetrieveObject("prefs").pagetype);
      drawGUIFromAr(GUIDATA_NAVMAIN);
      if (location.hash) {
        selectPage(location.hash.substring(1));
      }
    }
  };


  selectPage = function(pagetype) {
    dataUpdateObject("prefs", "pagetype", pagetype);
    location.hash = pagetype;
    drawPage();
  };


  drawPage = function() {
    // var colHeading_el;
    // clear any pre-created html content
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
    updateRefsToElements();
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
        case GUITYPE_UL:
          addLIsFromOb(ob);
          break;
          // intentional rollthrough as they all do exactly the same thing
        case GUITYPE_SECTION:
        case GUITYPE_COL:
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


  getNextName = function(type) {
    var prefix, name, n;
    if (type === DATATYPE_JOB) {
      prefix = JOB_STR;
    } else if (type === DATATYPE_CLIENT) {
      prefix = CLIENT_STR;
    }
    n = 0 + (dataRetrieveObject(prefix + "Num")) + 1;
    dataStoreObject(prefix + "Num", n);
    return prefix + n;
  };



  /* -----------------------------------------------------------------------------
    create individual specific elements
  ----------------------------------------------------------------------------- */

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
    prop, input_el, label_el,
    innerHTML = "",
    parent_el = document.getElementById(ob.parentID);

    if (ob.label) { innerHTML += "<label>" + ob.label; }
    if (ob.id) {
      innerHTML += "<input id='" + ob.id + "'>";
    } else {
      innerHTML += "<input>";
    }
    if (ob.label) { innerHTML += "</label>" + ob.label; }
    parent_el.innerHTML += innerHTML;
    input_el = document.getElementById(ob.id);

    if (ob.attributes) {
      for (prop in ob.attributes) {
        input_el.setAttribute("" + prop, "" + ob.attributes[prop]);
      }
    }

    input_el.setAttribute("type", "text");
    // parent_el.appendChild(input_el);

    input_el.ob = ob;

    if (ob.class) { addClassname(input_el, ob.class); }

    if (ob.method !== undefined) {
      registerEventHandler(input_el, "change", callMethodFromObOnElement);
      registerEventHandler(input_el, "keyup", callMethodFromObOnElement);
      registerEventHandler(input_el, "paste", callMethodFromObOnElement);
      registerEventHandler(input_el, "input", callMethodFromObOnElement);
    }
  };


  createSelectFromOb = function(ob) {
    var
    i, prop, select_el, label_el, option_el, clientOrJob_ob,
    dayPrefix,
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
      select_el.id = ob.id;
    } else {
      select_el = document.createElement("select");
    }
    if (ob.class) { addClassname(select_el, ob.class); }
    select_el.setAttribute("size", "1"); // HACK maybe to allow styling of individual options
    parent_el.appendChild(select_el);

    if (ob.contentType) { // clients / jobs options get treated differently to normal options
      if (ob.contentType === CONTENTTYPE_CLIENTS) {
        ob.options = dataRetrieveObject(CLIENT_STR);
      } else if (ob.contentType === CONTENTTYPE_JOBS) {
        ob.options = dataRetrieveObject(JOB_STR);
      }
      for (prop in ob.options) {
        clientOrJob_ob = ob.options[prop];
        option_el = select_el.options[select_el.options.length] = new Option(clientOrJob_ob.name, clientOrJob_ob.class);
        addClassname(option_el, clientOrJob_ob.class);
        addCSSRule("." + clientOrJob_ob.class, "background-color", clientOrJob_ob.bgcolor);
        addCSSRule("." + clientOrJob_ob.class, "color", clientOrJob_ob.color);
      }
    } else { // normal options
      for (prop in ob.options) {
        select_el.options[select_el.options.length] = new Option(ob.options[prop], prop);
      }
      // if (ob.class) { addClassname(select_el, ob.class); }
    }

    select_el.ob = ob;
    select_el.ob.method = "updateSelected";
    registerEventHandler(document.getElementById(select_el.id), "change", callMethodFromObOnElement);
    registerEventHandler(select_el, "change", updateSelected);
    // logMsg("select_el.onchange: " + select_el.onchange);
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
      if (prop === dataRetrieveObject("prefs").timespan) { radio_el.checked = true; }
      label_el.htmlFor = ob.id;
      if (ob.class) { addClassname(radio_el, ob.class); }
    }
  };


  addLIsFromOb = function(ob) {
    var
    i, li_el,
    UL_el = createElementWithId("ul", EL_ID_COLHEADING),
    parent_el = document.getElementById(ob.parentID);
    addClassname(UL_el, CLASS_ROW);

    for (i = 0; i < ob.ar.length; i++) {
      li_el = document.createElement("li");
      li_el.innerHTML = ob.ar[i];
      UL_el.appendChild(li_el);
      if (ob.class) { addClassname(li_el, ob.class); }
    }

    parent_el.appendChild(UL_el);
  };


  createBasicElementFromOb = function(ob) {
    var
    el, elType,
    parent_el = document.getElementById(ob.parentID);

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
  };


  createColorPickerFromOb = function(ob) {
    var
    el,
    parent_el = document.getElementById(ob.parentID);
    if (ob.id) {
      el = createElementWithId("span", ob.id);
    } else {
      el = document.createElement("span");
    }
    parent_el.appendChild(el);
    if (ob.class) { addClassname(el, ob.class); }
  };



  /* ---------------------------------------------------------------------------

	--------------------------------------------------------------------------- */

  createClientOrJobFromOb = function(ob, dataType) {
    // create unique number to be used in object name/key
    var
    id, ar, n, prefix, newItemCSS_selector, //pluralName,
    input_el,
    colorPickerFGSelector, colorPickerBGSelector;

    if (dataType === DATATYPE_CLIENT) {
      input_el = document.getElementById(EL_ID_CLIENTNAMEIN);
      prefix = CLIENT_STR;
    } else if (dataType === DATATYPE_JOB) {
      input_el = document.getElementById(EL_ID_JOBNAMEIN);
      prefix = JOB_STR;
    }
    id = getNextName(dataType);
    ob.id = id;
    ob.class = id;

    ar = dataRetrieveObject(prefix);
    ar[ob.id] = ob;
    dataStoreObject(prefix, ar);

    newItemCSS_selector = "." + id + ", " +
      "." + id + ":hover, " +
      "." + id + ":active";
    addCSSRule(newItemCSS_selector, "color", ob.color);
    addCSSRule(newItemCSS_selector, "background-color", ob.bgcolor);

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


  callMethodFromObOnElement = function(e) {
    logMsg("callMethodFromObOnElement()");
    logMsg("\tcallMethodFromObOnElement: " + JSON.stringify(e.target.ob));
    callMethodFromOb(e.target.ob);
  };


  callMethodFromOb = function(ob) {
    logMsg("\tcallMethodFromOb: " + JSON.stringify(ob));
    var scope = (ob.scopeID !== undefined) ? document.getElementById(ob.scopeID) : undefined;

    /*
    eval usage has been carefully considered and is the best solution
    for calling one of many methods whose names (strings) have been stored in
    the constants file

    ob.method contains a hard-coded string from DDDConsts.js

    ! NO USER INPUT CAN MAKE IT INTO THIS LOCATION UNLESS THE SOURCE CODE
    ! HAS BEEN COMPROMISED. IF THAT HAPPENS WE'RE BUGGERED ANYWAY !!
    */

    /* jshint ignore:start */
    eval(ob.method).apply(scope, ob.args);
    /* jshint ignore:end */
  };


  onClientTyped = function() {
    clientSaveBtn_el.disabled = clientNameInput_el.value.isEmpty();
  };


  onJobTyped = function() {
      jobSaveBtn_el.disabled = jobNameInput_el.value.isEmpty();
  };



  /* ---------------------------------------------------------------------------
		page drawing methods
	--------------------------------------------------------------------------- */

  drawTimesheets = function() {
    var
    i, daysToDraw, isOddDay, weekdayCur,
    isToday, rowClassname,
    day_el, date_el, workItem_el, hrs_el, client_el, job_el, jobnotes_el,
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
      dayOfYear = dayCur.getDOY();
      rowClassname = "day row ";
      isToday = !Math.round(daysBetween(dayCur, dateToday));
      if (isToday) { rowClassname += "today "; }
      if (isOddDay) { rowClassname += "odd "; }
      isOddDay = !isOddDay; // flip state
      if (dayCur.getDay() === weekStartDay) { rowClassname += "week-start "; }
      if (dayCur.getDate() === 1) { rowClassname += "month-start "; }
      day_el = createElementWithId("span", "day" + dayOfYear);
      parent_el.appendChild(day_el);
      addClassname(day_el, rowClassname);

      // date
      date_el = document.createElement("span");
      addClassname(date_el, "date");
      addClassname(date_el, "col");
      day_el.appendChild(date_el);
      date_el.innerHTML = getFormattedDate(dayCur, DATETYPE_DEFAULT.label);
      dayCur.setDate(dayCur.getDate() + 1);
      day_el.dayNum = dayOfYear;

      //
      addWorkItem(day_el, dayOfYear);
    }
  };


  addWorkItem = function(parent_el, suffix) {
    var
    hrs_el, money_el, ob_temp,
    itemID = "workItem" + suffix,
    workItem_el = createElementWithId("span", itemID);

    addClassname(workItem_el, "day-data");
    addClassname(workItem_el, "col");
    parent_el.appendChild(workItem_el);

    // hours
    createTextInputFromOb({
      class: "hrs",
      parentID: itemID,
      id: "hrs" + suffix,
      attributes: {
        "type": "number",
        "min":  "0", "max":  "59",
        "step": "15", "size": "5"
      }
    });
    // client select/dropdown
    createSelectFromOb({
      contentType: CONTENTTYPE_CLIENTS,
      id: CLIENT_STR + suffix,
      parentID: itemID,
      args: [],
      scopeID: parent_el.id
    });
    // job select/dropdown
    createSelectFromOb({
      contentType: CONTENTTYPE_JOBS,
      id: JOB_STR + suffix,
      parentID: itemID,
      scopeID: parent_el.id
    });
    // job  notes
    createTextInputFromOb({
      class: "jobNotes",
      id: "jobNotes" + suffix,
      parentID: itemID
    });
    // money
    createTextInputFromOb({
      class: "money",
      parentID: itemID,
      id: "money" + suffix,
      attributes: {
        "type": "number",
        "min":  "0", "max":  "59",
        "step": "15", "size": "5"
      }
    });
    // money notes
    createTextInputFromOb({
      class: "moneyNotes",
      parentID: itemID,
      id: "moneyNotes" + suffix,
    });

    // return workItem_el;
  };


/*  updateColoursFromPickers = function(type, fgCol, bgCol) {

  };

*/

  updateRefsToElements = function() {
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
    if (ob.label) { form_el.innerHTML = ob.label; }

    if (ob.el_ar) { drawGUIFromAr(ob.el_ar); }

    if (ob.hidden) { form_el.style.display = "none"; }

    form_el.ob = ob;
    registerEventHandler(form_el, "submit", onFormSubmit);
    registerEventHandler(form_el, "click", onFormClick);
  };


  onFormClick = function(e) {
    var form = e.target.form;
    if (form && form.id) {
      switch (form.id) {
        case "configForm":
          dataUpdateObject("prefs", "timespan", form.timesheetRange.value);
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


  newClientCreate = function() {
    var
    fgCol = getRandomHexColor("dark"),
    bgCol = getRandomHexColor("light");

    document.getElementById(EL_ID_CLIENTNAMEIN).value = getNextName(DATATYPE_CLIENT);
    addCSSRule("#" + CLIENT_FG_COLPICK, "background-color", fgCol);
    addCSSRule("#" + CLIENT_BG_COLPICK, "background-color", bgCol);
    addCSSRule("#" + EL_ID_CLIENTNAMEIN, "color", fgCol);
    addCSSRule("#" + EL_ID_CLIENTNAMEIN, "background-color", bgCol);

    clientSaveBtn_el.disabled = false;
    updateRefsToElements();
  };


  newJobCreate = function() {
    var
    fgCol = getRandomHexColor("light"),
    bgCol = getRandomHexColor("dark");

    document.getElementById(EL_ID_JOBNAMEIN).value = getNextName(DATATYPE_JOB);
    addCSSRule("#" + JOB_FG_COLPICK, "background-color", fgCol);
    addCSSRule("#" + JOB_BG_COLPICK, "background-color", bgCol);
    addCSSRule("#" + EL_ID_JOBNAMEIN, "color", fgCol);
    addCSSRule("#" + EL_ID_JOBNAMEIN, "background-color", bgCol);

    jobSaveBtn_el.disabled = false;
    updateRefsToElements();
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


  updateSelected = function(e) {
    var
    day_ar, workItem_ar, day_ob,
    select_selector = "#" + e.target.id,
    option_selector = e.target.value,
    pageType = dataRetrieveObject("prefs").pagetype,
    workItem_el = document.getElementById(e.target.id).parentNode,
    day_el = document.getElementById(e.target.id).parentNode.parentNode,
    dayNum = day_el.dayNum;

    switch (pageType) {
      case PAGETYPE_TIMESHEETS:
      case PAGETYPE_JOBSANDCLIENTS:
        if (e.target.id.toUpperCase().indexOf(CLIENT_STR.toUpperCase()) !=-1) {
          addCSSRule(select_selector, "color", dataRetrieveObject(CLIENT_STR)[option_selector].color);
          addCSSRule(select_selector, "background-color", dataRetrieveObject(CLIENT_STR)[option_selector].bgcolor);
        } else {
          addCSSRule(select_selector, "color", dataRetrieveObject(JOB_STR)[option_selector].color);
          addCSSRule(select_selector, "background-color", dataRetrieveObject(JOB_STR)[option_selector].bgcolor);
        }
        break;
      case PAGETYPE_CONFIG:
        break;
      default:
        break;
    }
    if (pageType === PAGETYPE_TIMESHEETS) {
      day_ar = dataRetrieveObject("day");
      day_ob = day_ar[dayNum];
      if (day_ob === undefined) {
        day_ob = { work: [] };
      }
      workItem_ar = day_ob.work;
      workItem_ar.push({
        time: "02:30",
        client: "test client",
        job: "test job",
        jobNotes: "painting the edges",
        money: -50,
        moneyNotes: "bought canvas REceipt no.11234"
      });
      day_ar[dayNum] = day_ob;
      dataStoreObject("day", day_ar);
    }
/*    if (e.target.id === EL_ID_SELECTCLIENT) {

    } else if (e.target.id === EL_ID_SELECTJOB) {

    }*/
  };



	/* ---------------------------------------------------------------------------
		BEGIN...
	--------------------------------------------------------------------------- */

  doSetup();

	return;


// 'this' would be undefined because of "use strict",
// calling the function with .call(this) fixes it
}).call(this);
