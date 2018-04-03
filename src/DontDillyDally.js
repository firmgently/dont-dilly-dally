/*
---------------------------------------------------------
  Firm Gently
  DontDillyDally
  Mark Mayes 2018

  FIXME timesheet container not getting scroll focus
  DONE  after updating client/job, styles are not universally updating
  TODO  add ARIA attributes (eg. hide up/down spinner buttons)
  TODO  delete job/client check if any records are referencing them, prompt if so
  DONE	blank object being stored in data object results in missing day in UI
  DONE	 number spinners
  TODO  match all button styles
  DONE 	blank space appears at bottom of page (seems related to LOADING element)
  DONE	negative money values should attach negative classname on initial page load
  DONE   jobs and clients list existing jobs/clients
  DONE   jobs and clients proper colour picker
  DONE	 minify JS on save
  TODO  delete temporary <a> created when file is saved
  FIXME next/prev week/month buttons not working
  TODO  all strings should be constants
  TODO  display month/week start correctly
  DONE  month/week skip buttons should auto-repeat
  TODO  validate all input data
          time/money
          notes
          client/job names in clients/jobs page
  TODO  ensure big/small units update min/max/step when changing from money to hours or viceversa
  DONE	 spinners: hour/minute units can wrap
  DONE	 spinners: NaN gets converted to 0
  DONE	spinners: other events should trigger mouseup to prevent stuck spin
	FIXME	spinners: numbers should pad eg. 00:45h, £10.00
	DONE	spinners: unit should be denoted, with £/h and ./:
	TODO	add 'wipe data' buttons with confirmation prompt
	TODO	add privacy page/statement
					by default all data is saved in your browser (localStorage)
					you can wipe your data at any time
					you can export your data to a file (in JSON format) and import it into another browser or device
					we don't see any of your personal data
	FIXME	if empty or bad time/money data is **stored in JSON**, correct it to zero
	DONE	'even' class wrongly being applied to child elements
	FIXME	select client/job - day remains highlighted (eg. darker date text)
	FIXME	£-0.77 must register as negative
  
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
	dayJumpTimer,

	// methods
  doSetup, selectPage, drawPage, clearPage, drawGUIFromAr,
	eventAutoRepeat, dayJumpAutorepeatStop,
  createFormFromOb,
  addTask, removeTask, addClient, removeClientOrJob, addJob,
  callMethodFromObOnElement, callMethodFromOb,
	onFormClick, onScroll,
  drawTimesheets, drawJobsAndClients, drawClientOrJobFromOb,
  getNextID, getNewClient, getNewJob,
  navClick, todayClick, weekNextClick, weekPrevClick, monthNextClick, monthPrevClick,
	onClientTyped, onJobTyped, onFormSubmit, onUpdateInput, onIsMoneyTaskChkChange,
	onSaveBtnClick, onColorChangeConfirm,
  dataStoragePossible, initData,
	dataStoreObject, dataRetrieveObject, dataUpdateObject,
	clientAndJobStyleSheet, createClientOrJobFromOb, createCSSForClientOrJobFromOb,
	getJobOrClientIDFromElement, updateDataFromWorkItemEl, updateDataFromClientOrJobEl,
  getFirstVisibleDayElement,
  clientInputWasLastEmpty,
	handleFileSelect, updateColoursFromPickers, updatePickerFromColours,
  updateLayoutRefs, updateSelected, drawUIWorkItem, removeWorkItem 
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

	// TODO ensure defaults are still being created on first run
  initData = function() {
		var item, container, temp_ob, temp_id;
    // if no preferences are stored create some defaults
    if (!dataRetrieveObject(PREFS_STR)) {
			// create default preferences object
      dataStoreObject(PREFS_STR, {
        pagetype: PAGETYPE_DEFAULT,
        timespan: TIMESPAN_DEFAULT,
        dateFormat: DATETYPE_DEFAULT,
        totalsToShow: SHOWTOTALS_DEFAULT,
        minuteIncrements: MINUTEINCREMENTS_DEFAULT
      });

			// create client/job unitBigers and set them to zero
			// unitBigers are used to save having to iterate through objects
			// to see how many children they have
      dataStoreObject(CLIENTSTOTAL_STR, 0);
      dataStoreObject(JOBSTOTAL_STR, 0);

			// create new object to store clients and fill it with some defaults
      dataStoreObject(CLIENTS_STR, {});
      for (item in CLIENT_DEFAULTS) {
        temp_id = getNextID(DATATYPE_CLIENT);
        temp_ob = CLIENT_DEFAULTS[item];
        temp_ob.id = temp_id;
        temp_ob.class = temp_id;
        // TODO copy object and change its id/class based on getNextID
        createClientOrJobFromOb(temp_ob, DATATYPE_CLIENT);
      }

			// create new object to store jobs and fill it with some defaults
      dataStoreObject(JOBS_STR, {});
      for (item in JOB_DEFAULTS) {
        temp_id = getNextID(DATATYPE_JOB);
        temp_ob = JOB_DEFAULTS[item];
        temp_ob.id = temp_id;
        temp_ob.class = temp_id;
        createClientOrJobFromOb(temp_ob, DATATYPE_JOB);
      }

			// new empty object to store days
			// (work items are stored in days)
      dataStoreObject(DAYS_STR, {});
    } else {
			// customise client/job styles based on existing data
			container = dataRetrieveObject(CLIENTS_STR);
			for (item in container) {
				createCSSForClientOrJobFromOb(container[item], DATATYPE_CLIENT);
			}
			container = dataRetrieveObject(JOBS_STR);
			for (item in container) {
				createCSSForClientOrJobFromOb(container[item], DATATYPE_JOB);
			}
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


  handleFileSelect = function(event) {
    var file = event.target.files[0], // FileList object first item (as only single file)
				reader = new FileReader();
		reader.onload = function(event) {
			console.log(event.target.result);
		};
		reader.readAsText(file);
		console.log(file);
  };


	onSaveBtnClick = function(event) {
		var obj = {}, data, el;
		obj[PREFS_STR] = dataRetrieveObject(PREFS_STR);
		obj[JOBS_STR] = dataRetrieveObject(JOBS_STR);
		obj[JOBSTOTAL_STR] = dataRetrieveObject(JOBSTOTAL_STR);
		obj[CLIENTS_STR] = dataRetrieveObject(CLIENTS_STR);
		obj[CLIENTSTOTAL_STR] = dataRetrieveObject(CLIENTSTOTAL_STR);
		obj[DAYS_STR] = dataRetrieveObject(DAYS_STR);

		data  = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

		el       = document.createElement("a");
		el.href      = "data:" + data;
		el.download  = SAVE_FILENAME + ".txt";
		el.innerHTML = "download .txt file of json";

		document.body.appendChild(el);
		el.click();
    document.body.removeChild(el);
	};



  /* -----------------------------------------------------------------------------
    setup methods
  ----------------------------------------------------------------------------- */

  doSetup = function() {
    dateDisplayStart = new Date();
    dateDisplaySelected = new Date();
    dateToday = new Date();
    if(dataStoragePossible()) {
      initData();
      drawGUIFromAr(GUIDATA_NAVMAIN);
      if (location.hash) {
        selectPage(decodeURIComponent(location.hash.substring(1)));
      } else {
        selectPage(dataRetrieveObject(PREFS_STR).pagetype);
      }
    }
		registerEventHandler(document.getElementById("file-chooser"), "change", handleFileSelect, false);
		registerEventHandler(document.getElementById("file-save"), "click", onSaveBtnClick, false);
  //  registerEventHandler(window, "scroll", onScroll);
  };


  selectPage = function(pagetype) {
    dataUpdateObject(PREFS_STR, "pagetype", pagetype);
    location.hash = pagetype;
		document.body.id = "";
    clearPage();
    setTimeout(drawPage, 1); // on timer to force reflow after clearPage()
  };


  clearPage = function() {
    removeClassname(document.getElementById(LOADINGINDICATOR_ID), "hidden");
    document.getElementById("main").innerHTML = "";
  };


  drawPage = function() {
    document.getElementById("main").appendChild(createElementWithId("h1", "pageTitle"));
    document.getElementById("main").appendChild(createElementWithId("h2", "intro"));
    switch (dataRetrieveObject(PREFS_STR).pagetype) {
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
          ob.checkIfMatched = dataRetrieveObject(PREFS_STR)[ob.id];
          el_temp = createRadioFromOb(ob);
          if (ob.methodPathStr) {
            registerEventHandler(el_temp, "change", callMethodFromObOnElement);
          }
          break;
        case GUITYPE_UL:
          addLIsFromOb(ob);
          break;
        case GUITYPE_PARA: // intentional rollthrough
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
    var i, form_el,
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
    drawUIWorkItem(this.parentNode);
  };

	removeTask = function() {
		removeWorkItem(this);
	};


  addClient = function() {
    var ob = getNewClient();
    createClientOrJobFromOb(ob, DATATYPE_CLIENT);
    drawClientOrJobFromOb(ob);
  };


  addJob = function() {
    var ob = getNewJob();
    createClientOrJobFromOb(ob, DATATYPE_JOB);
    drawClientOrJobFromOb(ob);
  };


	// get next available ID for job or client
  getNextID = function(type) {
		var prefix, name, n;
		if (type === DATATYPE_JOB) {
			n = 0 + (dataRetrieveObject(JOBSTOTAL_STR)) + 1;
			dataStoreObject(JOBSTOTAL_STR, n);
			prefix = JOB_STR;
		} else if (type === DATATYPE_CLIENT) {
			n = 0 + (dataRetrieveObject(CLIENTSTOTAL_STR)) + 1;
			dataStoreObject(CLIENTSTOTAL_STR, n);
			prefix = CLIENT_STR;
		}
		return prefix + n;
  };



  /* ---------------------------------------------------------------------------

	--------------------------------------------------------------------------- */

  createClientOrJobFromOb = function(ob, dataType) {
    var id, ar, n, containerObjectName, input_el;

		// create unique identifier for this job or client
    if (dataType === DATATYPE_CLIENT) {
      containerObjectName = CLIENTS_STR;
    } else if (dataType === DATATYPE_JOB) {
      containerObjectName = JOBS_STR;
    }
    ar = dataRetrieveObject(containerObjectName);
    ar[ob.id] = ob;
    dataStoreObject(containerObjectName, ar);

		createCSSForClientOrJobFromOb(ob, dataType);
  };


	createCSSForClientOrJobFromOb = function(ob, dataType) {
    var selector =	"." + ob.class + ", " +
										"." + ob.class + ":hover, " +
										"." + ob.class + ":active",
				colorPickerFGSelector, colorPickerBGSelector;

		// add main CSS for eg. timesheets page
    if (dataType === DATATYPE_CLIENT || dataType === DATATYPE_JOB) {
      addCSSRule(selector, "color", ob.color + " !important");
      addCSSRule(selector, "background-color", ob.bgcolor + " !important");
    } else {
      addCSSRule(selector, "color", ob.color);
      addCSSRule(selector, "background-color", ob.bgcolor);
    }
	};


  callMethodFromObOnElement = function(event) {
    callMethodFromOb(event.target.ob, event);
  };


  callMethodFromOb = function(ob, event) {
    var scope;

    if (ob.scope) {
      scope = ob.scope;
    } else if (ob.scopeID) {
      scope = document.getElementById(ob.scopeID);
    } else {
      scope = undefined;
    }

    if (event) {
      if (ob.args) {
        ob.args.push(event);
      } else {
        ob.args = [event];
      }
    }

    getFunctionFromString(ob.methodPathStr).apply(scope, ob.args);
  };


  // TODO delete this function and all refs to it
  onClientTyped = function() {
    clientSaveBtn_el.disabled = clientNameInput_el.value.isEmpty();
  };


  onJobTyped = function() {
    jobSaveBtn_el.disabled = jobNameInput_el.value.isEmpty();
  };


  onColorChangeConfirm = function(event) {
    updateDataFromClientOrJobEl(this);
  };



  /* ---------------------------------------------------------------------------
		page drawing methods
	--------------------------------------------------------------------------- */

  drawJobsAndClients = function() {
    var ul_el, li_el, temp_el, prop, item, item_ar;

    // TODO remove old UL
    item_ar = dataRetrieveObject(CLIENTS_STR);
    ul_el = document.createElement("ul");
    addClassname(ul_el, CLIENTS_STR);
    document.getElementById("clientsExistingRow").appendChild(ul_el);
    for (prop in item_ar) {
      drawClientOrJobFromOb(item_ar[prop]);
    }

    item_ar = dataRetrieveObject(JOBS_STR);
    ul_el = document.createElement("ul");
    addClassname(ul_el, JOBS_STR);
    document.getElementById("jobsExistingRow").appendChild(ul_el);
    for (prop in item_ar) {
      drawClientOrJobFromOb(item_ar[prop]);
    }
  };


  drawClientOrJobFromOb = function(item) {
    var li_el, temp_el, parent_el, removeMethodPath, addMethodPath;

    li_el = createElementWithId("li", item.id);
    registerEventHandler(li_el, COLORPICKER_CHANGEEVENT_ID, updateColoursFromPickers);
    registerEventHandler(li_el, COLORPICKER_CONFIRMEVENT_ID, onColorChangeConfirm);

    if (item.id.indexOf(CLIENT_STR) !== -1) {
      addMethodPath = "uk.co.firmgently.DontDillyDally.addClient";
      parent_el = document.getElementById("clientsExistingRow").getElementsByTagName("UL")[0];
    } else if (item.id.indexOf(JOB_STR) !== -1) {
      addMethodPath = "uk.co.firmgently.DontDillyDally.addJob";
      parent_el = document.getElementById("jobsExistingRow").getElementsByTagName("UL")[0];
    }
    parent_el.appendChild(li_el);
    removeMethodPath = "uk.co.firmgently.DontDillyDally.removeClientOrJob";

    // 'add task' button
    temp_el = createButtonFromOb({
      class: "addTaskBtn",
      label: "&#xe821;",
      parent: li_el,
      methodPathStr: addMethodPath,
      scopeID: item.id
    });
    registerEventHandler(temp_el, "mousedown", callMethodFromObOnElement);

    temp_el = createInputFromOb({
      class: item.id,
      parent: li_el,
      attributes: { "type": "text", "value": item.name },
      methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput", // TODO use correct method
      scopeID: item.id
    });
    temp_el.ob.scope = temp_el;
    registerEventHandler(temp_el, "change", callMethodFromObOnElement);
    registerEventHandler(temp_el, "keyup", callMethodFromObOnElement);
    registerEventHandler(temp_el, "paste", callMethodFromObOnElement);
    registerEventHandler(temp_el, "input", callMethodFromObOnElement);

    temp_el = createColorPickerFromOb({
      parent: li_el,
      class: "color-picker bg",
      id: "cpbg-" + item.id,
      color: item.bgcolor
    });

    temp_el = createColorPickerFromOb({
      parent: li_el,
      class: "color-picker fg",
      id: "cpfg-" + item.id,
      color: item.color
    });

    // 'remove task' button
    temp_el = createButtonFromOb({
      class: "removeTaskBtn",
      label: "&#xe83d;",
      parent: li_el,
      methodPathStr: removeMethodPath,
      scopeID: item.id
    });
    registerEventHandler(temp_el, "mousedown", callMethodFromObOnElement);

    manualEvent(li_el, COLORPICKER_CHANGEEVENT_ID); // ensure input's colours are updated
  };


  drawTimesheets = function() {
    var i, j, daysToDraw, weekdayCur, day_str,
				isToday, significance_str, rowClassname,
				monthHeader_el, day_el, date_el, dayDataContainer_el,
				hrs_el, client_el, job_el,
				ob_temp, dayWorkItems, workItem,
				weekStartDay = 1, // 0 = Sunday, 1 = Monday etc
				parent_el = document.getElementById(TIMESHEETCONTAINER_ID),
				// TODO timesheet should be <ul>
				workingFragment = document.createDocumentFragment(),
				allWorkItems = dataRetrieveObject(DAYS_STR),
				dayCur = new Date();

    switch(dataRetrieveObject(PREFS_STR).timespan) {
      case TIMESPAN_WEEK:
        weekdayCur = dayCur.getDay(); // 0 = Sunday, 1 = Monday etc
        dayCur.setDate(dayCur.getDate() - weekdayCur + weekStartDay); // first day of week
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

    for (i = 0; i < daysToDraw; i++) {
      significance_str = "";
      day_str = dayCur.getShortISO();
      rowClassname = "day row ";
      isToday = !Math.round(daysBetween(dayCur, dateToday));
      day_el = createElementWithId("li", day_str);
      if (isToday) {
        rowClassname += CLASS_TODAY + " ";
        significance_str += "TODAY";
      }
      if (dayCur.getDay() === weekStartDay) {
        rowClassname += "week-start ";
        significance_str += "week " + dayCur.getWeekNumber();
        // if this is week 1 and month is December, must be week 1 of next year
        if (dayCur.getWeekNumber() === 1 && dayCur.getMonth() === 11) {
          significance_str += " (" + (dayCur.getFullYear() + 1) + ")";
        }
      }
      if (dayCur.getDate() === 1) {
        rowClassname += "month-start ";
				monthHeader_el = document.createElement("h4");
				monthHeader_el.innerHTML = MONTH_NAMES[dayCur.getMonth()];
				day_el.appendChild(monthHeader_el);
      }
      addClassname(day_el, rowClassname);
      // create days in documentFragment to avoid unneccessary reflows
      workingFragment.appendChild(day_el);

      // date
      date_el = document.createElement("p");
      addClassname(date_el, "date col");
      // TODO DATETYPE_DEFAULT being used here is that correct?
      if (significance_str !== "") {
      //if (isToday) {
        date_el.innerHTML = "<em>" + dayCur.getWeekDay(1) + "</em>" + getFormattedDate(dayCur, DATETYPE_DEFAULT.label) + "<span>" + significance_str + "</span>";
      } else {
        date_el.innerHTML = "<em>" + dayCur.getWeekDay(1) + "</em>" + getFormattedDate(dayCur, DATETYPE_DEFAULT.label);
      }
      dayCur.setDate(dayCur.getDate() + 1);
      day_el.appendChild(date_el);

      dayDataContainer_el = document.createElement("ul");
      addClassname(dayDataContainer_el, "day-data col");
      day_el.appendChild(dayDataContainer_el);

      dayWorkItems = allWorkItems[day_str];
      if (dayWorkItems === undefined || isEmpty(dayWorkItems)) {
        drawUIWorkItem(dayDataContainer_el);
      } else {
				for (workItem in dayWorkItems) {
          drawUIWorkItem(dayDataContainer_el, workItem, dayWorkItems[workItem]);
        }
      }
    }

    parent_el.appendChild(workingFragment);
  };


  drawUIWorkItem = function(dayDataContainer_el, itemID, itemData_ob) {
    var hrs_el, money_el, ob_temp, el_temp, item_el, wrappedCheckbox_el, numberValue_ar,
				day_el = dayDataContainer_el.parentNode;

		if (itemID === undefined) { itemID = getGUID(); }

    item_el = createElementWithId("li", itemID);
    //dayDataContainer_el.appendChild(item_el);
    dayDataContainer_el.insertBefore(item_el, dayDataContainer_el.firstChild);

    // 'add task' button
    el_temp = createButtonFromOb({
      class: "addTaskBtn",
      label: "&#xe821;",
      parent: item_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.addTask",
      scopeID: itemID
    });
    registerEventHandler(el_temp, "mousedown", callMethodFromObOnElement);

    // client select/dropdown
    el_temp = createSelectFromOb({
      contentType: CONTENTTYPE_CLIENTS,
      placeholderText: CLIENT_SELECT_PLACEHOLDER,
      options: dataRetrieveObject(CLIENTS_STR),
      parent: item_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected",
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
		if (itemData_ob && itemData_ob[DATAINDICES.clientID]
		&& itemData_ob[DATAINDICES.clientID].length > 0) {
			changeSelectByOption(el_temp, itemData_ob[DATAINDICES.clientID]);
			manualEvent(el_temp, "change");
		}

    // job select/dropdown
    el_temp = createSelectFromOb({
      contentType: CONTENTTYPE_JOBS,
      placeholderText: JOB_SELECT_PLACEHOLDER,
      options: dataRetrieveObject(JOBS_STR),
      parent: item_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected"
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
		if (itemData_ob && itemData_ob[DATAINDICES.jobID]
		&& itemData_ob[DATAINDICES.jobID].length > 0) {
			changeSelectByOption(el_temp, itemData_ob[DATAINDICES.jobID]);
			manualEvent(el_temp, "change");
		}
    
		// 'money/task' checkbox
    el_temp = createCheckboxFromOb({
      class: "ios-switch isMoneyTaskChk",
      label: " ", // a label is needed for wrapLabel/addDivToLabel to work
			wrapLabel: true,
			addDivToLabel: true,
      parent: item_el,
      checked: false,
      methodPathStr: "uk.co.firmgently.DontDillyDally.onIsMoneyTaskChkChange",
      scopeID: itemID
    });
		registerEventHandler(el_temp, "change", callMethodFromObOnElement);
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_MONEY) {
			// after checking this box its onChange method has to be called, but not yet
			// as it depends on other elements added below... see bottom of this function
			el_temp.checked = true;
      //
      if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
        numberValue_ar = itemData_ob[DATAINDICES.numberValue].split(SEPARATOR_CASH);
      }
			addClassname(item_el, "money");
		} else {
      if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
        numberValue_ar = itemData_ob[DATAINDICES.numberValue].split(SEPARATOR_TIME);
      }
			addClassname(item_el, "hrs");
    }
		// TODO remove unnecessary specific classnames hrs/money

    // hours/money big units
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_TIME) {
      ob_temp = { min: 0, max: 23, step: 1, wrapNum: true, pad: "00" };
    } else {
      ob_temp = { min: -999999999, max: 999999999, step: 1, pad: "    " };
    }
    el_temp = createSpinnerFromOb({
      class: "unitBig",
      parent: item_el,
      attributes: ob_temp,
      methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
      scopeID: itemID
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);
    if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
			el_temp.value = numberValue_ar[0];
			// TODO 'negative' class is not being added when field is pre-filled with saved data	
			if (parseInt(numberValue_ar[0]) < 0) {
				addClassname(el_temp.parentNode.parentNode, "negative");
			}
			manualEvent(el_temp, "change");
		}

    // hours/money small units
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_TIME) {
      ob_temp = { min: 0, max: 59, wrapNum: true, pad: "00" };
      switch(dataRetrieveObject(PREFS_STR).minuteIncrements) {
        case MINUTEINCREMENTS_15:
          ob_temp.step = 15;
          break;
        case MINUTEINCREMENTS_30:
          ob_temp.step = 30;
          break;
        case MINUTEINCREMENTS_1: // intentional rollthrough
        default:
          ob_temp.step = 1;
          break;
      }
    } else {
      ob_temp = { min: 0, max: 99, step: 1, wrapNum: true, pad: "00" };
    }
    el_temp = createSpinnerFromOb({
      class: "unitSmall",
      parent: item_el,
      attributes: ob_temp,
      methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
      scopeID: itemID
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);
		if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
			el_temp.value = numberValue_ar[1];
			manualEvent(el_temp, "change");
		}

    // job/money notes
    el_temp = createInputFromOb({
      class: "notes",
      parent: item_el,
      attributes: { "type": "text", "placeholder": JOBNOTES_PLACEHOLDER },
      methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
      scopeID: itemID
    });
    el_temp.ob.scope = el_temp;
    registerEventHandler(el_temp, "change", callMethodFromObOnElement);
    registerEventHandler(el_temp, "keyup", callMethodFromObOnElement);
    registerEventHandler(el_temp, "paste", callMethodFromObOnElement);
    registerEventHandler(el_temp, "input", callMethodFromObOnElement);
		if (itemData_ob && itemData_ob[DATAINDICES.notes]) { el_temp.value = itemData_ob[DATAINDICES.notes]; }

    // 'remove task' button
    el_temp = createButtonFromOb({
      class: "removeTaskBtn",
      label: "&#xe83d;",
      parent: item_el,
      methodPathStr: "uk.co.firmgently.DontDillyDally.removeTask",
      scopeID: itemID
    });
    registerEventHandler(el_temp, "mousedown", callMethodFromObOnElement);
		
		// if this item is being filled with stored data,
		// and the money checkbox is checked, we have to call the onChange function here
		// as it depends on the other elements such as "notes" being present
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_MONEY) {
			onIsMoneyTaskChkChange.call(item_el);
		}
  };


	removeClientOrJob = function() {
		var data_ob, type_str;

    if (this.id.indexOf(CLIENT_STR) !== -1) {
      type_str = CLIENTS_STR;
    } else if (this.id.indexOf(JOB_STR) !== -1) {
      type_str = JOBS_STR;
    }
      
    data_ob = dataRetrieveObject(type_str);
		delete data_ob[this.id];
		this.parentNode.removeChild(this);
		dataStoreObject(type_str, data_ob);
	};


	removeWorkItem = function(item_el) {
		var days_ar = dataRetrieveObject(DAYS_STR),
				day_ob = days_ar[item_el.parentNode.parentNode.id];
		
		delete day_ob[item_el.id];
		item_el.parentNode.removeChild(item_el);
		dataStoreObject(DAYS_STR, days_ar);
	};


  updateColoursFromPickers = function(event) {
    var i, inputNodes, currentNode, fg_el, bg_el, textInput_el;
    
    inputNodes = this.getElementsByTagName("INPUT");
    for (i = 0; i < inputNodes.length; i++) {
      currentNode = inputNodes[i];
      if (currentNode.type === "text") {
        textInput_el = currentNode;
      } else if (currentNode.className.indexOf("color-picker") !== -1) {
        if (currentNode.className.indexOf("bg") !== -1) {
          bg_el = currentNode.nextSibling;
        } else if (currentNode.className.indexOf("fg") !== -1) {
          fg_el = currentNode.nextSibling;
        }
      }
    }
    textInput_el.className = "";
    textInput_el.style.color = getStyle(fg_el, "background-color");
    textInput_el.style.backgroundColor = getStyle(bg_el, "background-color");
  };


  updatePickerFromColours = function(type, fgCol, bgCol) {
    if (type === CLIENTS_STR) {
      colPickClientBG_el.style.backgroundColor = bgCol;
      colPickClientFG_el.style.backgroundColor = fgCol;
    } else if (type === JOBS_STR) {
      colPickJobBG_el.style.backgroundColor = bgCol;
      colPickJobFG_el.style.backgroundColor = fgCol;
    }
  };


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
          dataUpdateObject(PREFS_STR, "timespan", form.timespan.value);
          // dateFormat is an object, the form just stores the name of it so grab it here
          dataUpdateObject(PREFS_STR, "dateFormat", form.dateFormat.value);
          dataUpdateObject(PREFS_STR, "totalsToShow", form.totalsToShow.value);
          dataUpdateObject(PREFS_STR, "minuteIncrements", form.minuteIncrements.value);
          break;
        default:
          break;
      }
    }
  };


  onFormSubmit = function(e) {
    stopPropagation(e);
  };


  onUpdateInput = function(event) {
    switch (dataRetrieveObject(PREFS_STR).pagetype) {
      case PAGETYPE_TIMESHEETS:
        if (document.body.contains(this)) {
          if (this.className.indexOf("notes") !== -1) {
            // TODO validate notes input
            updateDataFromWorkItemEl(this.parentNode.parentNode);
          } else {
            if (isNaN(parseInt(this.value))) { this.value = 0; }

            // TODO needs to handle negative small unit eg. -£0.13
            if (this.className.indexOf("unitBig") !== -1) {
              if (parseInt(this.value) < 0) {
                addClassname(this.parentNode.parentNode, "negative");
              } else {
                removeClassname(this.parentNode.parentNode, "negative");
              }
            }
            // TODO check following line still works
            updateDataFromWorkItemEl(this.parentNode.parentNode);
            this.value = padString(this.value, this.spin_ob.pad);
          }
        }
        break;
      case PAGETYPE_CONFIG:
        break;
      case PAGETYPE_JOBSANDCLIENTS:
        updateDataFromClientOrJobEl(this.parentNode);
        break;
      default:
        break;
    }
  };


  onIsMoneyTaskChkChange = function() {
    var checkbox = this.getElementsByClassName("isMoneyTaskChk")[0],
				notesInput = this.getElementsByClassName("notes")[0];
    if (checkbox.checked) {
			addClassname(this, "money");
			removeClassname(this, "hrs");
      notesInput.placeholder = MONEYNOTES_PLACEHOLDER;
    } else {
			addClassname(this, "hrs");
			removeClassname(this, "money");
      notesInput.placeholder = JOBNOTES_PLACEHOLDER;
    }
		if (document.body.contains(this)) { updateDataFromWorkItemEl(this); }
  };


  getNewClient = function() {
    var id = getNextID(DATATYPE_CLIENT);
    return {
      id: id,
      name: id,
      class: id,
      color: getRandomHexColor("dark"),
      bgcolor: getRandomHexColor("light")
    };
  };


  getNewJob = function() {
    var id = getNextID(DATATYPE_JOB);
    return {
      id: id,
      name: id,
      class: id,
      color: getRandomHexColor("light"),
      bgcolor: getRandomHexColor("dark")
    };
  };



  /* ---------------------------------------------------------------------------

	--------------------------------------------------------------------------- */


  navClick = function(e) {
    selectPage(arguments[0]);
  };


	weekPrevClick = function(e) {
    var i, day,
				scrollTop = document.getElementById("main").scrollTop,
				days = document.getElementsByClassName("week-start");
    for (i = days.length - 1; i >= 0; i--) {
      day = days[i];
      if (day.offsetTop < scrollTop) {
        day.scrollIntoView();
        break;
      }
    }
		eventAutoRepeat(e.target, e.type);
		registerEventHandler(e.target, "mouseup", dayJumpAutorepeatStop);
		registerEventHandler(e.target, "mouseout", dayJumpAutorepeatStop);
	};


	weekNextClick = function(e) {
    var i, day,
				scrollTop = document.getElementById("main").scrollTop,
				days = document.getElementsByClassName("week-start");
    for (i = 0; i < days.length; i++) {
      day = days[i];
      if (day.offsetTop > scrollTop) {
        day.scrollIntoView();
        break;
      }
    }
		eventAutoRepeat(e.target, e.type);
		registerEventHandler(e.target, "mouseup", dayJumpAutorepeatStop);
		registerEventHandler(e.target, "mouseout", dayJumpAutorepeatStop);
	};


	monthPrevClick = function(e) {
    var i, day,
				scrollTop = document.getElementById("main").scrollTop,
				days = document.getElementsByClassName("month-start");
    for (i = days.length - 1; i >= 0; i--) {
      day = days[i];
      if (day.offsetTop < scrollTop) {
        day.scrollIntoView();
        break;
      }
    }
		eventAutoRepeat(e.target, e.type);
		registerEventHandler(e.target, "mouseup", dayJumpAutorepeatStop);
		registerEventHandler(e.target, "mouseout", dayJumpAutorepeatStop);
	};


	monthNextClick = function(e) {
    var i, day,
				scrollTop = document.getElementById("main").scrollTop,
				days = document.getElementsByClassName("month-start");
    for (i = 0; i < days.length; i++) {
      day = days[i];
      if (day.offsetTop > scrollTop) {
        day.scrollIntoView();
        break;
      }
    }
		eventAutoRepeat(e.target, e.type);
		registerEventHandler(e.target, "mouseup", dayJumpAutorepeatStop);
		registerEventHandler(e.target, "mouseout", dayJumpAutorepeatStop);
	};


	todayClick = function(e) {
		document.getElementsByClassName(CLASS_TODAY)[0].scrollIntoView();
	};


	eventAutoRepeat = function(el, eventType) {
		clearTimeout(dayJumpTimer);
		dayJumpTimer = setTimeout(function() { manualEvent(el, eventType); }, AUTOREPEAT_RATE);
	};


	dayJumpAutorepeatStop = function() {
		clearTimeout(dayJumpTimer);
	};


  updateSelected = function() {
    var pageType = dataRetrieveObject(PREFS_STR).pagetype,
				option_selector = this.value;

    switch (pageType) {
      case PAGETYPE_TIMESHEETS: // run on to next case
      case PAGETYPE_JOBSANDCLIENTS:
				if (this.className.indexOf(CLASS_CLIENTSELECT) !== -1) {
					this.className = CLASS_CLIENTSELECT + " " + option_selector;
				} else if (this.className.indexOf(CLASS_JOBSELECT) !== -1) {
					this.className = CLASS_JOBSELECT + " " + option_selector;
				}
        break;
      case PAGETYPE_CONFIG:
        break;
      default:
        break;
    }

    if (pageType === PAGETYPE_TIMESHEETS) {
			if (document.body.contains(this)) {
				updateDataFromWorkItemEl(this.parentNode);
			}
    } 
  };


	updateDataFromWorkItemEl = function (el) {
		var days_ar, day_ob, workItem_ar,
				isMoneyTaskChk_el, unitBigInput_el, unitSmallInput_el, clientSelect_el, jobSelect_el, notesInput_el,
				pageType = dataRetrieveObject(PREFS_STR).pagetype,
				day_el = el.parentNode.parentNode,
				day_str = day_el.id;
		
		isMoneyTaskChk_el = el.getElementsByClassName("isMoneyTaskChk")[0];
		unitBigInput_el = el.getElementsByClassName("unitBig")[0];
		unitSmallInput_el = el.getElementsByClassName("unitSmall")[0];
		clientSelect_el = el.getElementsByClassName(CLASS_CLIENTSELECT)[0];
		jobSelect_el = el.getElementsByClassName(CLASS_JOBSELECT)[0];
		notesInput_el = el.getElementsByClassName("notes")[0]; 
		days_ar = dataRetrieveObject(DAYS_STR);
		day_ob = days_ar[day_str];
		if (day_ob === undefined) { day_ob = {}; }

		workItem_ar = [];
		if (isMoneyTaskChk_el && isMoneyTaskChk_el.checked) {
			workItem_ar[DATAINDICES.itemType] = ITEMTYPE_MONEY;
      workItem_ar[DATAINDICES.numberValue] = unitBigInput_el.value + SEPARATOR_CASH + unitSmallInput_el.value;
		} else {
			workItem_ar[DATAINDICES.itemType] = ITEMTYPE_TIME;
      workItem_ar[DATAINDICES.numberValue] = unitBigInput_el.value + SEPARATOR_TIME + unitSmallInput_el.value;
		}
		workItem_ar[DATAINDICES.clientID] = getJobOrClientIDFromElement(clientSelect_el);
		workItem_ar[DATAINDICES.jobID] = getJobOrClientIDFromElement(jobSelect_el);
		workItem_ar[DATAINDICES.notes] = notesInput_el.value;

		day_ob[el.id] = workItem_ar; // write work item to day
		days_ar[day_str] = day_ob; // write updated day
		dataStoreObject(DAYS_STR, days_ar);
	};


  updateDataFromClientOrJobEl = function(el) {
    var i, inputNodes, currentNode, fg_el, bg_el, textInput_el,
        items_ob, itemType, dataType, update_ob;
    
    inputNodes = el.getElementsByTagName("INPUT");
    for (i = 0; i < inputNodes.length; i++) {
      currentNode = inputNodes[i];
      if (currentNode.type === "text") {
        textInput_el = currentNode;
      } else if (currentNode.className.indexOf("color-picker") !== -1) {
        if (currentNode.className.indexOf("bg") !== -1) {
          bg_el = currentNode.nextSibling;
        } else if (currentNode.className.indexOf("fg") !== -1) {
          fg_el = currentNode.nextSibling;
        }
      }
    }

    if (el.id.indexOf(CLIENT_STR) !== -1) {
      itemType = CLIENTS_STR;
      dataType = DATATYPE_CLIENT;
    } else if (el.id.indexOf(JOB_STR) !== -1) {
      itemType = JOBS_STR;
      dataType = DATATYPE_JOB;
    }
    items_ob = dataRetrieveObject(itemType);

    update_ob = {
      id: el.id,
      class: el.id,
      name: textInput_el.value, // TODO  validate input
      color: getStyle(fg_el, "background-color"),
      bgcolor: getStyle(bg_el, "background-color")
    }

    items_ob[el.id] = update_ob;
    dataStoreObject(itemType, items_ob);
    createCSSForClientOrJobFromOb(update_ob, dataType);
  };


	getJobOrClientIDFromElement = function(el) {
		var i, id, curClass, class_ar;
		if (el) {
			class_ar = el.className.split(" ");
			for (i =0; i < class_ar.length; i++) {
				curClass = class_ar[i];
				if (curClass !== CLASS_JOBSELECT && curClass !== CLASS_CLIENTSELECT) {
					return curClass;
				}
			}
		}
	};

  
  getFirstVisibleDayElement = function() {
    var i, day,
				scrollTop = document.getElementById("main").scrollTop,
				days = document.getElementById(TIMESHEETCONTAINER_ID).childNodes;
    for (i = 0; i < days.length; i++) {
      day = days[i];
      if (day.offsetTop > scrollTop) {
        return day;
      }
    }
  };


	/* ---------------------------------------------------------------------------
		BEGIN...
	--------------------------------------------------------------------------- */

  doSetup();

  return {
    drawTimesheets: drawTimesheets,
    drawJobsAndClients: drawJobsAndClients,
    addTask: addTask,
    removeTask: removeTask,
    addJob: addJob,
    removeClientOrJob: removeClientOrJob,
    addClient: addClient,
    navClick: navClick,
    todayClick: todayClick,
    weekNextClick: weekNextClick,
    weekPrevClick: weekPrevClick,
    monthNextClick: monthNextClick,
    monthPrevClick: monthPrevClick,
    getNewClient: getNewClient,
    getNewJob: getNewJob,
    updateSelected: updateSelected,
    onUpdateInput: onUpdateInput,
    onIsMoneyTaskChkChange: onIsMoneyTaskChkChange,
    onClientTyped: onClientTyped
  };


// 'this' would be undefined because of "use strict",
// calling the function with .call(this) fixes it
}).call(this);
