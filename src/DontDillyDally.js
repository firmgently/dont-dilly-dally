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
  doSetup, selectPage, drawPage, clearPage, drawGUIFromAr,
  createFormFromOb, addTask,
  callMethodFromObOnElement, callMethodFromOb, onFormClick,
  drawTimesheets, getNextName, newClientCreate, newJobCreate,
  navClick, onClientTyped, onJobTyped, onFormSubmit,
  dataStoragePossible, initDataObject, dataStoreObject, dataRetrieveObject,
  dataUpdateObject, clientAndJobStyleSheet, createClientOrJobFromOb,
  newClientFormSave, newJobFormSave, clientInputWasLastEmpty,
  updateRefsToElements, updateSelected, addWorkItem, updateSavedWorkItem
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


  initDataObject = function() {
    // if no preferences are stored create some defaults
    if (!dataRetrieveObject("prefs")) {
      dataStoreObject("prefs", {
        pagetype: PAGETYPE_DEFAULT,
        timespan: TIMESPAN_DEFAULT,
        dateFormat: DATETYPE_DEFAULT,
        totalsToShow: SHOWTOTALS_DEFAULT
      });
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
      drawGUIFromAr(GUIDATA_NAVMAIN);
      if (location.hash) {
        selectPage(decodeURIComponent(location.hash.substring(1)));
      } else {
        selectPage(dataRetrieveObject("prefs").pagetype);
      }
    }
  };


  selectPage = function(pagetype) {
    logMsg("selectPage('" + pagetype + "')");
    dataUpdateObject("prefs", "pagetype", pagetype);
    location.hash = pagetype;
    clearPage();
    setTimeout(drawPage, 100); // on timer to force reflow after clearPage()
  };


  clearPage = function() {
    removeClassname(document.getElementById(LOADINGINDICATOR_ID), "hidden");
    document.getElementById("main").innerHTML = "";
  };


  drawPage = function() {
    // var colHeading_el;
    // clear any pre-created html content

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
    addClassname(document.getElementById(LOADINGINDICATOR_ID), "hidden");
  };


  drawGUIFromAr = function(ar) {
    var i, ob, el_temp;
    for (i = 0; i < ar.length; i++) {
      ob = ar[i];
      switch (ob.type) {
        case GUITYPE_BTN:
          el_temp = createButtonFromOb(ob);
          if (ob.methodName) {
            registerEventHandler(el_temp, "mousedown", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_FORM:
          createFormFromOb(ob);
          break;
        case GUITYPE_TEXTINPUT:
          el_temp = createInputFromOb(ob);
          if (ob.methodName) {
            registerEventHandler(el_temp, "change", callMethodFromObOnElement);
            registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
            registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
            registerEventHandler(el_temp, "input", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_SELECT:
          el_temp = createSelectFromOb(ob);
          if (ob.methodName) {
            registerEventHandler(el_temp, "change", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_RADIOBTN:
          // alert(dataRetrieveObject("prefs").timespan);
          // TODO this checkIfMatched should not be added here it should
          // be included in main data higher up
          ob.checkIfMatched = dataRetrieveObject("prefs").timespan;
          el_temp = createRadioFromOb(ob);
          if (ob.methodName) {
            registerEventHandler(el_temp, "change", callMethodFromObOnElement);
          }
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


  addTask = function() {
    // alert("this: " + this);
    // alert("this.id: " + this.id);
    // alert("this.ob.scopeID: " + this.ob.scopeID);
    // addWorkItem();

    // called from the scope of the 'add task' button
    addWorkItem(this.parentNode, dayOfYear, 0);
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
    logMsg("\te.target.ob: " + JSON.stringify(e.target.ob));
    logMsg("\tthis: " + this);
    callMethodFromOb(e.target.ob);
  };


  callMethodFromOb = function(ob) {
    logMsg("callMethodFromOb(): " + ob.methodName);
    logMsg("\tob: " + JSON.stringify(ob));
    var scope;
    if (ob.scopeID !== undefined) {
      scope = document.getElementById(ob.scopeID);
    } else {
      scope = undefined;
    }
    logMsg("\tscope: " + scope);

    /*
    eval usage has been carefully considered and is the best solution
    for calling one of many methods whose names (strings) have been stored in
    the constants file

    ob.methodName contains a hard-coded string from DDDConsts.js

    ! NO USER INPUT CAN MAKE IT INTO THIS LOCATION UNLESS THE SOURCE CODE
    ! HAS BEEN COMPROMISED. IF THAT HAPPENS WE'RE BUGGERED ANYWAY !!
    */

    /*ignore jslint start*/
    eval(ob.methodName).apply(scope, ob.args);
    /*ignore jslint end*/
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
    i, j, daysToDraw, isOddDay, weekdayCur,
    isToday, rowClassname,
    day_el, date_el, workItem_el, workItemCol_el, hrs_el, client_el, job_el, jobnotes_el,
    ob_temp, dayWorkItems,
    weekStartDay = 1, // 0 = Sunday, 1 = Monday etc
    parent_el = document.getElementById(TIMESHEETCONTAINER_ID),
    // TODO timesheet should be <ul>
    workingFragment = document.createDocumentFragment(),
    allWorkItems = dataRetrieveObject("day"),
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
      day_el = createElementWithId("div", "day" + dayOfYear);
      addClassname(day_el, rowClassname);
      // create days in documentFragment to avoid unneccessary reflows
      workingFragment.appendChild(day_el);

      // date
      date_el = document.createElement("span");
      addClassname(date_el, "date");
      addClassname(date_el, "col");
      date_el.innerHTML = dayCur.getWeekDay(1) + "&nbsp;|&nbsp;" + getFormattedDate(dayCur, DATETYPE_DEFAULT.label);
      dayCur.setDate(dayCur.getDate() + 1);
      day_el.dayNum = dayOfYear;
      day_el.appendChild(date_el);

      workItemCol_el = document.createElement("span");
      addClassname(workItemCol_el, "day-data");
      addClassname(workItemCol_el, "col");
      day_el.appendChild(workItemCol_el);

      dayWorkItems = allWorkItems[dayOfYear];
      // logMsg("allWorkItems: " + allWorkItems);
      // logMsg("dayWorkItems: " + dayWorkItems);
      if (dayWorkItems === undefined) {
        addWorkItem(workItemCol_el, dayOfYear, 0);
      } else {
        for (j = 0; j < dayWorkItems.length; j++) {
          addWorkItem(workItemCol_el, dayOfYear, j);
        }
      }

    }
    parent_el.appendChild(workingFragment);
  };


  addWorkItem = function(parent_el, dayOfYear, itemNum) {
    var
    hrs_el, money_el, ob_temp, el_temp,
    itemID = "item" + dayOfYear + "_" + itemNum,
    workItem_el = createElementWithId("span", itemID);

    workItem_el.setAttribute("dayOfYear", dayOfYear);
    workItem_el.setAttribute("itemNum", itemNum);

    parent_el.appendChild(workItem_el);

    // hours
    el_temp = createInputFromOb({
      class: "hrs",
      parent: workItem_el,
      attributes: {
        "type": "number",
        "min":  "0", "max":  "59",
        "step": "15", "size": "5"
      },
      methodName: "updateInput",
      scopeID: workItem_el.id
    });
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);

    // client select/dropdown
    el_temp = createSelectFromOb({
      contentType: CONTENTTYPE_CLIENTS,
      options: dataRetrieveObject(CLIENT_STR),
      parent: workItem_el,
      methodName: "updateSelected",
      args: [],
      scopeID: workItem_el.id
    });
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);

    // job select/dropdown
    el_temp = createSelectFromOb({
      contentType: CONTENTTYPE_JOBS,
      options: dataRetrieveObject(JOB_STR),
      parent: workItem_el,
      methodName: "updateSelected",
      scopeID: workItem_el.id
    });
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);

    // job  notes
    el_temp = createInputFromOb({
      class: "jobNotes",
      parent: workItem_el,
      attributes: { "type": "text" },
      methodName: "updateInput",
      scopeID: workItem_el.id
    });
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);

    // money
    el_temp = createInputFromOb({
      class: "money",
      parent: workItem_el,
      attributes: {
        "type": "number",
        "min":  "0", "max":  "59",
        "step": "15", "size": "5"
      },
      methodName: "updateInput",
      scopeID: workItem_el.id
    });
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);

    // money notes
    el_temp = createInputFromOb({
      class: "moneyNotes",
      parent: workItem_el,
      attributes: { "type": "text" },
      methodName: "updateInput",
      scopeID: workItem_el.id
    });
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);

    // 'add task' button
    el_temp = createButtonFromOb({
      class: "addTaskBtn",
      label: "+",
      parent: workItem_el,
      methodName: "addTask",
      scopeID: workItem_el.id
    });
    registerEventHandler(el_temp, "mousedown", callMethodFromObOnElement);

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




  onFormClick = function(e) {
    var form = e.target.form;
    if (form && form.id) {
      switch (form.id) {
        case "configForm":
          dataUpdateObject("prefs", "timespan", form.timesheetRange.value);
          // dateFormat is an object, the form just stores the name of it so grab it here
          dataUpdateObject("prefs", "dateFormat", uk.co.firmgently.DDDConsts[form.dateFormat.value]);
          dataUpdateObject("prefs", "totalsToShow", form.totalsToShow.value);
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


  updateSavedWorkItem = function(workItem_el) {
    var
    dayOfYear = workItem_el.getAttribute("dayOfYear"),
    itemNum = workItem_el.getAttribute("itemNum");

  };


  updateSelected = function(e) {
    logMsg("updateSelected()");
    // logMsg("\te: " + e);
    // logMsg("\tthis: " + this);
    // logMsg("\tthis.id: " + this.id);
    var
    day_ar, workItem_ar, day_ob,
    select_selector = "#" + this.id,
    // select_selector = "#" + e.target.id,
    option_selector = this.value,
    // option_selector = e.target.value,
    pageType = dataRetrieveObject("prefs").pagetype,
    workItem_el = this.parentNode,
    // workItem_el = document.getElementById(e.target.id).parentNode,
    day_el = this.parentNode.parentNode,
    // day_el = document.getElementById(e.target.id).parentNode.parentNode,
    dayNum = day_el.dayNum;

    switch (pageType) {
      case PAGETYPE_TIMESHEETS:
      case PAGETYPE_JOBSANDCLIENTS:
        if (this.id.toUpperCase().indexOf(CLIENT_STR.toUpperCase()) !=-1) {
        // if (e.target.id.toUpperCase().indexOf(CLIENT_STR.toUpperCase()) !=-1) {
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
      // TODO this test data should be shown on the page
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
