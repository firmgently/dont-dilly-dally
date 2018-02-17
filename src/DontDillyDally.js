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
  createFormFromOb, addTask, removeTask,
  callMethodFromObOnElement, callMethodFromOb, onFormClick,
  drawTimesheets, getNextName, newClientCreate, newJobCreate,
  navClick, onClientTyped, onJobTyped, onFormSubmit, onUpdateInput, onIsMoneyTaskChkChange,
  dataStoragePossible, initDataObject, dataStoreObject, dataRetrieveObject,
  dataUpdateObject, clientAndJobStyleSheet, createClientOrJobFromOb,
  newClientFormSave, newJobFormSave, clientInputWasLastEmpty,
  updateLayoutRefs, updateSelected, addUIWorkItem, removeWorkItem, updateSavedWorkItem
	;


  /* ---------------------------------------------------------------------------
    create local references to public members from external sources
	--------------------------------------------------------------------------- */

  // constants
  // these aren't real constants, are declared with var
  // denoted by ALL_CAPS
  for (prop in uk.co.firmgently.DDDConsts) {
    this[prop] = uk.co.firmgently.DDDConsts[prop];
  }

  // general utility methods
	for (prop in uk.co.firmgently.FGUtils) {
		this[prop] = uk.co.firmgently.FGUtils[prop];
	}

  // HTML/DOM creation methods
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
      dataStoreObject(CLIENTS_STR + TOTAL_STR, 0);
      dataStoreObject(JOBS_STR + TOTAL_STR, 0);

      dataStoreObject(CLIENTS_STR, {});
      createClientOrJobFromOb(CLIENT_DEFAULT_1, DATATYPE_CLIENT);
      createClientOrJobFromOb(CLIENT_DEFAULT_2, DATATYPE_CLIENT);

      dataStoreObject(JOBS_STR, {});
      createClientOrJobFromOb(JOB_DEFAULT_1, DATATYPE_JOB);
      createClientOrJobFromOb(JOB_DEFAULT_2, DATATYPE_JOB);

      dataStoreObject(DAYS_STR, {});
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
    setup methods
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
    setTimeout(drawPage, 1); // on timer to force reflow after clearPage()
  };


  clearPage = function() {
    removeClassname(document.getElementById(LOADINGINDICATOR_ID), "hidden");
    document.getElementById("main").innerHTML = "";
  };


  drawPage = function() {
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
    updateLayoutRefs();
    addClassname(document.getElementById(LOADINGINDICATOR_ID), "hidden");
  };


  drawGUIFromAr = function(ar) {
    var i, ob, el_temp;
    for (i = 0; i < ar.length; i++) {
      ob = ar[i];
      switch (ob.type) {
        case GUITYPE_BTN:
          el_temp = createButtonFromOb(ob);
          if (ob.methodPathStr) {
            registerEventHandler(el_temp, "mousedown", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_FORM:
          createFormFromOb(ob);
          break;
        case GUITYPE_TEXTINPUT:
          el_temp = createInputFromOb(ob);
          if (ob.methodPathStr) {
            registerEventHandler(el_temp, "change", callMethodFromObOnElement);
            registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
            registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
            registerEventHandler(el_temp, "input", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_SELECT:
          el_temp = createSelectFromOb(ob);
          if (ob.methodPathStr) {
            registerEventHandler(el_temp, "change", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_RADIOBTN:
          // alert(dataRetrieveObject("prefs").timespan);
          // TODO this checkIfMatched should not be added here it should
          // be included in main data higher up
          ob.checkIfMatched = dataRetrieveObject("prefs").timespan;
          el_temp = createRadioFromOb(ob);
          if (ob.methodPathStr) {
            registerEventHandler(el_temp, "change", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_UL:
          addLIsFromOb(ob);
          break;
        case GUITYPE_SECTION: // intentional rollthrough
        case GUITYPE_COL: // intentional rollthrough
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


  // addTask is called from the scope of the 'add task' button
  addTask = function() {
    addUIWorkItem(this.parentNode);
  };

	removeTask = function() {
		removeWorkItem(this);
	};

  getNextName = function(type) {
    var prefix, name, n;
    if (type === DATATYPE_JOB) {
      prefix = JOB_STR;
    } else if (type === DATATYPE_CLIENT) {
      prefix = CLIENT_STR;
    }
    n = 0 + (dataRetrieveObject(prefix + TOTAL_STR)) + 1;
    dataStoreObject(prefix + TOTAL_STR, n);
    return prefix + n;
  };



  /* ---------------------------------------------------------------------------

	--------------------------------------------------------------------------- */

  createClientOrJobFromOb = function(ob, dataType) {
    var
    id, ar, n, prefix, newItemCSS_selector,
    input_el,
    colorPickerFGSelector, colorPickerBGSelector;

    logMsg("createClientOrJobFromOb()");
    // create unique number to be used in object name/key
    if (dataType === DATATYPE_CLIENT) {
      input_el = document.getElementById(EL_ID_CLIENTNAMEIN);
      prefix = CLIENTS_STR;
    } else if (dataType === DATATYPE_JOB) {
      input_el = document.getElementById(EL_ID_JOBNAMEIN);
      prefix = JOBS_STR;
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


  callMethodFromObOnElement = function(event) {
    callMethodFromOb(event.target.ob, event);
  };


  callMethodFromOb = function(ob, event) {
    logMsg("callMethodFromOb()");
    var scope;

    if (ob.scope) {
      scope = ob.scope;
    } else if (ob.scopeID) {
      scope = document.getElementById(ob.scopeID);
    } else {
      scope = undefined;
    }

    logMsg("\tob.methodPathStr: " + ob.methodPathStr);
    logMsg("\tscope: " + scope);

    if (event) {
      if (ob.args) {
        ob.args.push(event);
      } else {
        ob.args = [event];
      }
    }

    getFunctionFromString(ob.methodPathStr).apply(scope, ob.args);
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
    day_el, date_el, workItem_el, dayDataContainer_el, hrs_el, client_el, job_el, jobnotes_el,
    ob_temp, dayWorkItems,
    weekStartDay = 1, // 0 = Sunday, 1 = Monday etc
    parent_el = document.getElementById(TIMESHEETCONTAINER_ID),
    // TODO timesheet should be <ul>
    workingFragment = document.createDocumentFragment(),
    allWorkItems = dataRetrieveObject(DAYS_STR),
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

    logMsg("daysToDraw: " + daysToDraw);

    isOddDay = false;
    for (i = 0; i < daysToDraw; i++) {
      dayOfYear = dayCur.getShortISO();
      rowClassname = "day row ";
      isToday = !Math.round(daysBetween(dayCur, dateToday));
      if (isToday) { rowClassname += "today "; }
      if (isOddDay) { rowClassname += "odd "; }
      isOddDay = !isOddDay; // flip state
      if (dayCur.getDay() === weekStartDay) { rowClassname += "week-start "; }
      if (dayCur.getDate() === 1) { rowClassname += "month-start "; }
      day_el = createElementWithId("li", dayOfYear);
      addClassname(day_el, rowClassname);
      day_el.setAttribute("dayOfYear", dayOfYear);
      // create days in documentFragment to avoid unneccessary reflows
      workingFragment.appendChild(day_el);

      // date
      date_el = document.createElement("p");
      addClassname(date_el, "date col");
      date_el.innerHTML = "<em>" + dayCur.getWeekDay(1) + "</em>" + getFormattedDate(dayCur, DATETYPE_DEFAULT.label);
      dayCur.setDate(dayCur.getDate() + 1);
      day_el.appendChild(date_el);

      dayDataContainer_el = document.createElement("ul");
      addClassname(dayDataContainer_el, "day-data col");
      day_el.appendChild(dayDataContainer_el);

      dayWorkItems = allWorkItems[dayOfYear];
      if (dayWorkItems === undefined) {
        addUIWorkItem(dayDataContainer_el);
      } else {
        for (j = 0; j < dayWorkItems.length; j++) {
          addUIWorkItem(dayDataContainer_el);
        }
      }
    }

    parent_el.appendChild(workingFragment);
  };


  addUIWorkItem = function(dayDataContainer_el) {
    var
    hrs_el, money_el, ob_temp, el_temp,
    itemID, workItem_el,
    day_el = dayDataContainer_el.parentNode;

    itemID = getGUID(); 

    workItem_el = createElementWithId("li", itemID);
    dayDataContainer_el.appendChild(workItem_el);

    // 'add task' button
    el_temp = createButtonFromOb({
      class: "addTaskBtn",
      label: "&#xe821;",
      parent: workItem_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.addTask",
      scopeID: itemID
    });
    registerEventHandler(el_temp, "mousedown", callMethodFromObOnElement);

    // 'money/task' checkbox
    el_temp = createCheckboxFromOb({
      class: "ios-switch isMoneyTaskChk",
      label: " ", // a label is needed for wrapLabel/addDivToLabel to work
			wrapLabel: true,
			addDivToLabel: true,
      parent: workItem_el,
      checked: false,
      methodPathStr: "uk.co.firmgently.DontDillyDally.onIsMoneyTaskChkChange",
      scopeID: itemID
    });
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);

    // hours/money
    el_temp = createInputFromOb({
      class: "count hrs",
      parent: workItem_el,
      attributes: {
        "type": "number", "value": "00"
      },
      methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput"
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);

    // client select/dropdown
    el_temp = createSelectFromOb({
      contentType: CONTENTTYPE_CLIENTS,
      placeholderText: CLIENT_SELECT_PLACEHOLDER,
      options: dataRetrieveObject(CLIENTS_STR),
      parent: workItem_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected",
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);

    // job select/dropdown
    el_temp = createSelectFromOb({
      contentType: CONTENTTYPE_JOBS,
      placeholderText: JOB_SELECT_PLACEHOLDER,
      options: dataRetrieveObject(JOBS_STR),
      parent: workItem_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected"
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);

    // job/money notes
    el_temp = createInputFromOb({
      class: "notes job",
      parent: workItem_el,
      attributes: { "type": "text", "placeholder": JOBNOTES_PLACEHOLDER },
      methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
      scopeID: itemID
    });
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);

    // 'remove task' button
    el_temp = createButtonFromOb({
      class: "removeTaskBtn",
      label: "&#xe83d;",
      parent: workItem_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.removeTask",
      scopeID: itemID
    });
    registerEventHandler(el_temp, "mousedown", callMethodFromObOnElement);

  };

	removeWorkItem = function(item_el) {
		item_el.parentNode.removeChild(item_el);
	};

/*  updateColoursFromPickers = function(type, fgCol, bgCol) {

  };

*/

  updateLayoutRefs = function() {
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


  onUpdateInput = function(event) {
    logMsg(this);
    logMsg(event);
  };


  onIsMoneyTaskChkChange = function() {
    var
    checkbox = this.getElementsByClassName("isMoneyTaskChk")[0],
    countInput = this.getElementsByClassName("count")[0],
    notesInput = this.getElementsByClassName("notes")[0];
    if (checkbox.checked) {
      addClassname(countInput, "money");
      removeClassname(countInput, "hrs");
      addClassname(notesInput, "money");
      removeClassname(notesInput, "job");
      notesInput.placeholder = MONEYNOTES_PLACEHOLDER;
    } else {
      addClassname(countInput, "hrs");
      removeClassname(countInput, "money");
      addClassname(notesInput, "job");
      removeClassname(notesInput, "money");
      notesInput.placeholder = JOBNOTES_PLACEHOLDER;
    }
    logMsg("\tcheckbox: " + checkbox);
    logMsg("\tinput: " + notesInput);
    logMsg("\tinput.id: " + notesInput.id);
  };


  newClientCreate = function() {
    var
    fgCol = getRandomHexColor("dark"),
    bgCol = getRandomHexColor("light");
    logMsg("newClientCreate()");
    document.getElementById(EL_ID_CLIENTNAMEIN).value = getNextName(DATATYPE_CLIENT);
    addCSSRule("#" + CLIENT_FG_COLPICK, "background-color", fgCol);
    addCSSRule("#" + CLIENT_BG_COLPICK, "background-color", bgCol);
    addCSSRule("#" + EL_ID_CLIENTNAMEIN, "color", fgCol);
    addCSSRule("#" + EL_ID_CLIENTNAMEIN, "background-color", bgCol);

    clientSaveBtn_el.disabled = false;
    updateLayoutRefs();
  };


  newJobCreate = function() {
    var
    fgCol = getRandomHexColor("light"),
    bgCol = getRandomHexColor("dark");
    logMsg("newJobCreate()");

    document.getElementById(EL_ID_JOBNAMEIN).value = getNextName(DATATYPE_JOB);
    addCSSRule("#" + JOB_FG_COLPICK, "background-color", fgCol);
    addCSSRule("#" + JOB_BG_COLPICK, "background-color", bgCol);
    addCSSRule("#" + EL_ID_JOBNAMEIN, "color", fgCol);
    addCSSRule("#" + EL_ID_JOBNAMEIN, "background-color", bgCol);

    jobSaveBtn_el.disabled = false;
    updateLayoutRefs();
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


  updateSelected = function() {
    var
    day_ar, day_ob,
    option_selector = this.value,
    pageType = dataRetrieveObject("prefs").pagetype,
    workItem_el = this.parentNode,
    day_el = this.parentNode.parentNode.parentNode,
    dayOfYear = day_el.getAttribute("dayOfYear");

    logMsg("day_el.className: " + day_el.className);
    logMsg("dayOfYear: " + dayOfYear);

    switch (pageType) {
      case PAGETYPE_TIMESHEETS: // run on to next case
      case PAGETYPE_JOBSANDCLIENTS:
        this.className = option_selector;
        break;
      case PAGETYPE_CONFIG:
        break;
      default:
        break;
    }
    if (pageType === PAGETYPE_TIMESHEETS) {
      day_ar = dataRetrieveObject(DAYS_STR);
      day_ob = day_ar[dayOfYear];
      if (day_ob === undefined) {
        day_ob = {};
      }
      // TODO this test data should be shown on the page
			day_ob[getGUID()] = [ 
				ITEMTYPE_MONEY,        // ITEMTYPE_WORK or ITEMTYPE_MONEY
				"client2",            // clientID
				"job1",               // jobID
				-13.99,      		    	// either time in minutes (if JOB) or +/- amount (if MONEY)
				"acrylic gel medium"  // notes (either JOB or MONEY related)
			];
			day_ob[getGUID()] = [ 
				ITEMTYPE_WORK,        // ITEMTYPE_WORK or ITEMTYPE_MONEY
				"client1",            // clientID
				"job2",               // jobID
				150,         		    	// either time in minutes (if JOB) or +/- amount (if MONEY)
				"painting the edges"  // notes (either JOB or MONEY related)
			];
      day_ar[dayOfYear] = day_ob;
      dataStoreObject(DAYS_STR, day_ar);
    }
  };



	/* ---------------------------------------------------------------------------
		BEGIN...
	--------------------------------------------------------------------------- */

  doSetup();

  return {
    drawTimesheets: drawTimesheets,
    addTask: addTask,
    removeTask: removeTask,
    navClick: navClick,
    newClientCreate: newClientCreate,
    newJobCreate: newJobCreate,
    newClientFormSave: newClientFormSave,
    newJobFormSave: newJobFormSave,
    updateSelected: updateSelected,
    onUpdateInput: onUpdateInput,
    onIsMoneyTaskChkChange: onIsMoneyTaskChkChange,
    onClientTyped: onClientTyped
  };


// 'this' would be undefined because of "use strict",
// calling the function with .call(this) fixes it
}).call(this);
