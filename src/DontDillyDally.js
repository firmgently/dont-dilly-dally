/*
---------------------------------------------------------
  Firm Gently
  DontDillyDally
  Mark Mayes 2018

  FIXME client select dropdown styles broken
  TODO  workitem remove button shoudnt disappear when firstchild, should remove item then create a new one
        - removeItem should decrement
        - change event should decrement current selection (if it exists) then increment new selection{
  TODO  file load isn't loading data yet
	TODO	look out for autorepeat getting stuck on dayJump (make sure timer gets cancelled on mouseup etc)
	FIXME	preference changes not taking effect
  FIXME colour palette can push off side of screen resulting in resize on Android
  TODO  add 'year start date' preference
  TODO  ensure big/small units update min/max/step when changing from money to hours or viceversa
	FIXME	clients/jobs page - color pickers do not need to  be checkboxes
  FIXME timesheet container not getting scroll focus
  TODO  add ARIA attributes (eg. hide up/down spinner buttons)
	TODO	add 'wipe data' buttons with confirmation prompt
	FIXME	spinners: numbers should pad eg. 00:45h, £10.00
  TODO  all strings should be constants
  TODO  display month/week start correctly
  FIXME press/hold to jump back through months, page reloads with ? in querystring
  TODO  number spinners should fade up quickly with short delay (to avoid flickering on 'remove item' etc)
  TODO  loading bar
  TODO  only show month/week jump buttons if they make sense
  TODO  validate all input data
          time/money
          notes - max length
          client/job names in clients/jobs page
  FIXME tab nav - position wrong while page is loading (gap)
	FIXME	if empty or bad time/money data is **stored in JSON**, correct it to zero
	FIXME	select client/job - day remains highlighted (eg. darker date text)
	FIXME	£-0.77 must register as negative
  TODO  test everything on touchscreen
  TODO  test everything on narrow (phone) layout
	DONE 1st day of following year is showing
  DONE  spinners ony show for hovered/focused day
  DONE if page is changed while timesheets are being drawn, bugs out (clear timeout)
  DONE  fix widths of client/job selects on timesheets page, use text-overflow: ellipsis
  DONE number spinners inconsistent colours
  DONE  use spritesheet png instead of fonts??
  DONE  use updatefrequency to refresh "days drawn" only on % === 0
  DONE  delete job/client check if any records are referencing them, prompt if so
  DONE  refactor month/week click etc to all use 1 function
  DONE next/prev week/month buttons not working
	DONE	add year to timesheet special days eg: "January 2018", "2018 week 4", "totals for January 2018"
	DONE	add privacy page/statement
					by default all data is saved in your browser (localStorage)
					you can wipe your data at any time
					you can export your data to a file (in JSON format) and import it into another browser or device
					we don't see any of your personal data
  DONE  remove unnecessary form from clients/job page
  DONE  implement 'used' var in client/job data objects, keep count of how many times it's used on current timesheet
  DONE	blank object being stored in data object results in missing day in UI
  DONE  add week/month/year calculations
  DONE  after updating client/job, styles are not universally updating
  DONE	 number spinners
  DONE  match all button styles
  DONE 	blank space appears at bottom of page (seems related to LOADING element)
  DONE	negative money values should attach negative classname on initial page load
  DONE  borders around inputs and colorpickers on clients/jobs page
  DONE  month/week should flash briefly after day jump
  DONE   jobs and clients list existing jobs/clients
  DONE   jobs and clients proper colour picker
  DONE	 minify JS on save
  DONE  delete temporary <a> created when file is saved
	DONE	'even' class wrongly being applied to child elements
  DONE  month/week skip buttons should auto-repeat
  DONE	 spinners: hour/minute units can wrap
  DONE	 spinners: NaN gets converted to 0
  DONE	spinners: other events should trigger mouseup to prevent stuck spin
	DONE	spinners: unit should be denoted, with £/h and ./:
  
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

		ALL_CAPS denotes fake constants (declared with var) imported from DDDConsts.js

	--------------------------------------------------------------------------- */
	var
  key, dateDisplayStart, dateDisplaySelected, dateToday, 
  tsDaysToDraw, tsDaysToDrawTotal, curDrawnDay, tsWorkingFragment, // ts - timesheet
	
	// refs to important HTML elements
  loadingIndicator_el, mainContainer_el, timesheet_el,
	
	// handles for setTimeout
	eventAutoRepeatTimer, timesheetDrawDayTimer, recalculateTotalsTimer,
	
	// callbacks
  onFormSubmit, onUpdateInput, onIsMoneyTaskChkChange,
	onSaveBtnClick, onColorChangeConfirm,
	onFormClick, onScroll,

	// other methods
  doSetup, selectPage, drawPage, clearPage, drawGUIFromAr,
	eventAutoRepeat, eventAutoRepeatStop, eventAutoRepeatStart,
  recalculateAllTotals, calculateTotalsFromDateSpan,
  addTask, removeTask, addClient, removeClientOrJob, addJob,
  attachEventArrayToElement, callMethodsFromObOnElement, callMethodFromOb,
  drawTimesheets, drawNextDay, drawJobsAndClients, drawClientOrJobFromOb, drawTotalsContainer,
  getNextID, getNewClient, getNewJob, resetJobAndClientCounts, updateJobOrClientCount,
  navClick, todayClick, dayJump, attractAnimateElement,
  dataStoragePossible, initData,
	dataStoreObject, dataRetrieveObject, dataUpdateObject,
	clientAndJobStyleSheet, createClientOrJobFromOb, createCSSForClientOrJobFromOb,
	getJobOrClientIDFromElement, updateDataFromWorkItemEl, updateDataFromClientOrJobEl,
	onFileSelect, updateColoursFromPickers, 
  updateSelected, drawUIWorkItem, removeWorkItem 
	;




  /* ---------------------------------------------------------------------------
    create local references to public members from external (pre-concated)
		sources (like import/require etc)
		TODO make sure there isn't something existing to do this in this situ!
	--------------------------------------------------------------------------- */

	uk.co.firmgently.FGUtils.makeLocal(this, uk.co.firmgently.DDDConsts);
	uk.co.firmgently.FGUtils.makeLocal(this, uk.co.firmgently.FGUtils);
	uk.co.firmgently.FGUtils.makeLocal(this, uk.co.firmgently.FGHTMLBuild);




  /* -----------------------------------------------------------------------------
    data access/storage related
  ----------------------------------------------------------------------------- */

  dataStoragePossible = function() {
    if(typeof(Storage) === "undefined") {
      logMsg(TXT_STORAGE_UNSUPPORTED);
    } else {
      return true;
    }
  };


  initData = function() {
		var item, data_ob, tmp_ob, tmp_id;
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
        tmp_id = getNextID(DATATYPE_CLIENT);
        tmp_ob = CLIENT_DEFAULTS[item];
        tmp_ob.id = tmp_id;
        tmp_ob.class = tmp_id;
        createClientOrJobFromOb(tmp_ob, DATATYPE_CLIENT);
      }

			// create new object to store jobs and fill it with some defaults
      dataStoreObject(JOBS_STR, {});
      for (item in JOB_DEFAULTS) {
        tmp_id = getNextID(DATATYPE_JOB);
        tmp_ob = JOB_DEFAULTS[item];
        tmp_ob.id = tmp_id;
        tmp_ob.class = tmp_id;
        createClientOrJobFromOb(tmp_ob, DATATYPE_JOB);
      }

			// new empty object to store days
			// (work items are stored in days)
      dataStoreObject(DAYS_STR, {});
    } else {
			// customise client/job styles based on existing data
			data_ob = dataRetrieveObject(CLIENTS_STR);
			for (item in data_ob) {
				createCSSForClientOrJobFromOb(data_ob[item], DATATYPE_CLIENT);
			}
			data_ob = dataRetrieveObject(JOBS_STR);
			for (item in data_ob) {
				createCSSForClientOrJobFromOb(data_ob[item], DATATYPE_JOB);
			}
		}
  };


  dataStoreObject = function(category, ob) {
    localStorage.setItem(APP_ID + DATASTORE_CATEGORY_PREFIX + category, JSON.stringify(ob));
  };


  dataRetrieveObject = function(category) {
    return JSON.parse(localStorage.getItem(APP_ID + DATASTORE_CATEGORY_PREFIX + category));
  };


  dataUpdateObject = function(category, key, value) {
    var key,
				ob = dataRetrieveObject(category);
    for (key in ob) {
      if (key === key) {
        ob[key] = value;
        break;
      }
    }
    dataStoreObject(category, ob);
  };


	updateDataFromWorkItemEl = function (el) {
		var days_ar, day_ob, workItem_ar,
        selectedClientID, selectedJobID, previouslySelectedClientID, previouslySelectedJobID,
				isMoneyTaskChk_el, unitBigInput_el, unitSmallInput_el, clientSelect_el, jobSelect_el, notesInput_el,
				pageType = dataRetrieveObject(PREFS_STR).pagetype,
				day_el = el.parentNode.parentNode,
				day_str = day_el.id;
		
		isMoneyTaskChk_el = el.getElementsByClassName("isMoneyTaskChk")[0];
		unitBigInput_el = el.getElementsByClassName(CLASS_SPINNER_UNITBIG)[0];
		unitSmallInput_el = el.getElementsByClassName(CLASS_SPINNER_UNITSMALL)[0];
		clientSelect_el = el.getElementsByClassName(CLASS_CLIENTSELECT)[0];
		jobSelect_el = el.getElementsByClassName(CLASS_JOBSELECT)[0];
		notesInput_el = el.getElementsByClassName(CLASS_NOTESINPUT)[0]; 

    selectedClientID = getJobOrClientIDFromElement(clientSelect_el);
    selectedJobID = getJobOrClientIDFromElement(jobSelect_el);

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
  
    if (day_ob[el.id]) {
      previouslySelectedClientID = day_ob[el.id][DATAINDICES.clientID];
      previouslySelectedJobID = day_ob[el.id][DATAINDICES.jobID];
    }
    if (previouslySelectedClientID !== selectedClientID) {
      // FIXME decrement ID isn't being found (as workItem_ar is new and not filled with pre-existing content)
      updateJobOrClientCount(CLIENTS_STR, previouslySelectedClientID, -1);
      updateJobOrClientCount(CLIENTS_STR, selectedClientID, 1)
    }
    if (previouslySelectedJobID !== selectedJobID) {
      updateJobOrClientCount(JOBS_STR, previouslySelectedJobID, -1);
      updateJobOrClientCount(JOBS_STR, selectedJobID, 1);
    }

		workItem_ar[DATAINDICES.clientID] = selectedClientID;
		workItem_ar[DATAINDICES.jobID] = selectedJobID;
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




  /* ---------------------------------------------------------------------------
		page drawing methods
	--------------------------------------------------------------------------- */
  
  selectPage = function(pagetype) {
    dataUpdateObject(PREFS_STR, "pagetype", pagetype);
    location.hash = pagetype;
		document.body.id = "";
    clearPage();
    setTimeout(drawPage, 1); // on timer to force reflow after clearPage()
  };


  clearPage = function() {
		clearTimeout(eventAutoRepeatTimer);
		clearTimeout(timesheetDrawDayTimer);
		clearTimeout(recalculateTotalsTimer);
    removeClassname(loadingIndicator_el, CLASS_HIDDEN);
    mainContainer_el.innerHTML = "";
  };


  drawPage = function() {
    mainContainer_el.appendChild(createElementWithId("h1", "pageTitle"));
    mainContainer_el.appendChild(createElementWithId("h2", "intro"));
    switch (dataRetrieveObject(PREFS_STR).pagetype) {
      case PAGETYPE_TIMESHEETS:
        document.body.id = BODYID_TIMESHEETS;
        fillHTMLFromOb(PAGEDATA_TIMESHEETS);
        drawGUIFromAr(GUIDATA_TIMESHEETS);
				timesheet_el = document.getElementById(EL_ID_TIMESHEETCONTAINER);
        break;
      case PAGETYPE_CONFIG:
        document.body.id = BODYID_CONFIG;
        fillHTMLFromOb(PAGEDATA_CONFIG);
        drawGUIFromAr(GUIDATA_CONFIG);
        addClassname(loadingIndicator_el, CLASS_HIDDEN);
        break;
      case PAGETYPE_JOBSANDCLIENTS:
        document.body.id = BODYID_JOBSANDCLIENTS;
        fillHTMLFromOb(PAGEDATA_JOBSANDCLIENTS);
        drawGUIFromAr(GUIDATA_JOBSANDCLIENTS);
        addClassname(loadingIndicator_el, CLASS_HIDDEN);
        break;
      case PAGETYPE_PRIVACY:
        document.body.id = BODYID_PRIVACY;
        fillHTMLFromOb(PAGEDATA_PRIVACY);
        drawGUIFromAr(GUIDATA_PRIVACY);
        addClassname(loadingIndicator_el, CLASS_HIDDEN);
        break;
      default:
        break;
    }
  };


  drawGUIFromAr = function(ar) {
    var i, j, ob, eventToAdd_ob, eventToAddCur, tmp_el;
    for (i = 0; i < ar.length; i++) {
      ob = ar[i];
      switch (ob.type) {
        case GUITYPE_BTN:
          tmp_el = createButtonFromOb(ob);
          break;
        case GUITYPE_FORM:
          tmp_el = createFormFromOb(ob);
          break;
        case GUITYPE_TEXTINPUT:
          tmp_el = createInputFromOb(ob);
          break;
        case GUITYPE_SELECT:
          tmp_el = createSelectFromOb(ob);
          break;
        case GUITYPE_RADIOBTN:
          ob.checkIfMatched = dataRetrieveObject(PREFS_STR)[ob.id];
          tmp_el = createRadioFromOb(ob);
          break;
        case GUITYPE_UL:
          tmp_el = addLIsFromOb(ob);
          break;
        case GUITYPE_PARA: // intentional rollthrough
        case GUITYPE_SECTION: // intentional rollthrough
        case GUITYPE_COL: // intentional rollthrough
        case GUITYPE_ROW:
          tmp_el = createBasicElementFromOb(ob);
          break;
        case GUITYPE_COLORPICKER:
          tmp_el = createColorPickerFromOb(ob);
          break;
        case GUITYPE_METHODCALL:
          callMethodFromOb(ob);
          break;
        case GUITYPE_HELP:
          tmp_el = createHelpItemFromOb(ob);
          break;
        default:
          break;
      }

      if (ob.event_ar) { // contains an array of objects
        for (j = 0; j < ob.event_ar.length; j++) {
          eventToAdd_ob = ob.event_ar[j];
          registerEventHandler(tmp_el, eventToAdd_ob.eventType, callMethodsFromObOnElement);
        }
      }
    }
  };


  drawTotalsContainer = function(data_ob) {
    var row_el, cell_el,
        heading_el = document.createElement("h4"),
        table_el = document.createElement("table");

    addClassname(table_el, "totals-container");
    table_el.endDate = data_ob.endDate;
    table_el.timeSpan = data_ob.timeSpan;

    heading_el.innerHTML = data_ob.heading;
    data_ob.parent_el.appendChild(heading_el);

    row_el = table_el.appendChild(document.createElement("tr"));
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = HOURSWORKED_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00"; 
    addClassname(cell_el, "total-hoursworked");

    row_el = table_el.appendChild(document.createElement("tr"));
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = INCOME_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00";
    addClassname(cell_el, "total-income");

    row_el = table_el.appendChild(document.createElement("tr"));
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = EXPENDITURE_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00"; 
    addClassname(cell_el, "total-spend");

    row_el = table_el.appendChild(document.createElement("tr"));
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = PROFIT_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00"; 
    addClassname(cell_el, "total-profit");

    data_ob.parent_el.appendChild(table_el);
  };


  drawJobsAndClients = function() {
    var container_el, key, item_ar;

    item_ar = dataRetrieveObject(CLIENTS_STR);
    container_el = document.createElement("ul");
    addClassname(container_el, CLIENTS_STR);
    document.getElementById("clientsExisting").appendChild(container_el);
    for (key in item_ar) {
      drawClientOrJobFromOb(item_ar[key]);
    }

    item_ar = dataRetrieveObject(JOBS_STR);
    container_el = document.createElement("ul");
    addClassname(container_el, JOBS_STR);
    document.getElementById("jobsExisting").appendChild(container_el);
    for (key in item_ar) {
      drawClientOrJobFromOb(item_ar[key]);
    }
  };


  drawClientOrJobFromOb = function(item) {
    var item_el, tmp_el, parent_el, removeMethodPath, addMethodPath;

    item_el = createElementWithId("li", item.id);
    registerEventHandler(item_el, COLORPICKER_CHANGEEVENT_ID, updateColoursFromPickers);
    registerEventHandler(item_el, COLORPICKER_CONFIRMEVENT_ID, onColorChangeConfirm);

    if (item.id.indexOf(CLIENT_STR) !== -1) {
      addMethodPath = "uk.co.firmgently.DontDillyDally.addClient";
      parent_el = document.getElementById("clientsExisting").getElementsByTagName("UL")[0];
    } else if (item.id.indexOf(JOB_STR) !== -1) {
      addMethodPath = "uk.co.firmgently.DontDillyDally.addJob";
      parent_el = document.getElementById("jobsExisting").getElementsByTagName("UL")[0];
    }
    parent_el.appendChild(item_el);
    removeMethodPath = "uk.co.firmgently.DontDillyDally.removeClientOrJob";

    // 'add task' button
    tmp_el = createButtonFromOb({
      class: "addItemBtn",
      label: LABEL_ADDITEM,
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
          eventType: "click",
          methodPathStr: addMethodPath,
          scopeID: item.id
        }
    ]);

    tmp_el = createInputFromOb({
      class: item.id,
      parent: item_el,
      attributes: { "type": "text", "value": item.name },
    });
    attachEventArrayToElement(tmp_el, [
      {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "keyup",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "paste",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "input",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }
    ]);

    tmp_el = createColorPickerFromOb({
      parent: item_el,
      class: "color-picker bg",
      id: "cpbg-" + item.id,
      color: item.bgcolor
    });

    tmp_el = createColorPickerFromOb({
      parent: item_el,
      class: "color-picker fg",
      id: "cpfg-" + item.id,
      color: item.color
    });

    // 'remove task' button
    tmp_el = createButtonFromOb({
      class: "removeItemBtn",
     	label: LABEL_REMOVEITEM,
      parent: item_el,
    });
		attachEventArrayToElement(tmp_el, [
			{
				eventType: "click",
				methodPathStr: removeMethodPath,
				scopeID: item.id
			}
		]);

    manualEvent(item_el, COLORPICKER_CHANGEEVENT_ID); // ensure input's colours are updated
  };


  drawNextDay = function() {
    var day_str,
				isToday, significance_str, rowClassname,
				monthHeader_el, day_el, date_el, dayDataContainer_el, totals_el,
				dayWorkItems, itemID,
				prevDay = new Date(),
				weekStartDay = 1, // 0 = Sunday, 1 = Monday etc
				allWorkItems = dataRetrieveObject(DAYS_STR);

		prevDay.setTime(curDrawnDay.getTime());
		prevDay.setDate(curDrawnDay.getDate() - 1);
    day_str = curDrawnDay.getShortISO();
    day_el = createElementWithId("li", day_str);

    // work out what special info is attached to this day (eg. first of week/month etc)
    rowClassname = "day row ";
    significance_str = "";
    isToday = !Math.round(daysBetween(curDrawnDay, dateToday));
    if (isToday) {
      rowClassname += CLASS_TODAY + " ";
      significance_str += "TODAY";
    }
    if (curDrawnDay.getDay() === weekStartDay) {
      rowClassname += "week-start ";
      significance_str += "week " + curDrawnDay.getWeekNumber();
      // if this is week 1 and month is December, must be week 1 of next year
      if (curDrawnDay.getWeekNumber() === 1 && curDrawnDay.getMonth() === 11) {
        significance_str += " (" + (curDrawnDay.getFullYear() + 1) + ")";
      }
      if (curDrawnDay.getWeekNumber() > 1) {
        totals_el = document.createElement("li");
        addClassname(totals_el, CLASS_TOTALSWEEK);
        tsWorkingFragment.appendChild(totals_el);
        drawTotalsContainer({
          heading: WEEK_ENDING_STR + getFormattedDate(prevDay, DATETYPE_DEFAULT.label),
          parent_el: totals_el,
          endDate: new Date(curDrawnDay.getTime()),
          timeSpan: TIMESPAN_WEEK
        });
      }
    }
    if (curDrawnDay.getDate() === 1) {
      rowClassname += "month-start ";
      monthHeader_el = document.createElement("h4");
      monthHeader_el.innerHTML = MONTH_NAMES[curDrawnDay.getMonth()] + " " + curDrawnDay.getFullYear();
      day_el.appendChild(monthHeader_el);
      totals_el = document.createElement("li");
      addClassname(totals_el, CLASS_TOTALSMONTH);
      if (curDrawnDay.getMonth() > 0) {
        tsWorkingFragment.appendChild(totals_el);
        drawTotalsContainer({
          heading: MONTH_NAMES[curDrawnDay.getMonth() - 1] + " " + curDrawnDay.getFullYear(),
          parent_el: totals_el,
          endDate: new Date(curDrawnDay.getTime()),
          timeSpan: TIMESPAN_MONTH
        });
      }
    }
    addClassname(day_el, rowClassname);
    tsWorkingFragment.appendChild(day_el);

    // add date
    date_el = document.createElement("p");
    addClassname(date_el, "date col");
    // TODO DATETYPE_DEFAULT being used here is that correct?
    if (significance_str !== "") {
    //if (isToday) {
      date_el.innerHTML = "<em>" + curDrawnDay.getWeekDay(1) + "</em>" + getFormattedDate(curDrawnDay, DATETYPE_DEFAULT.label) + "<span>" + significance_str + "</span>";
    } else {
      date_el.innerHTML = "<em>" + curDrawnDay.getWeekDay(1) + "</em>" + getFormattedDate(curDrawnDay, DATETYPE_DEFAULT.label);
    }
    day_el.appendChild(date_el);

    // add day data (work/money etc)
    dayDataContainer_el = document.createElement("ul");
    addClassname(dayDataContainer_el, "day-data col");
    day_el.appendChild(dayDataContainer_el);
    
    dayWorkItems = allWorkItems[day_str];
    if (dayWorkItems === undefined || isEmpty(dayWorkItems)) {
      drawUIWorkItem(dayDataContainer_el);
    } else {
      for (itemID in dayWorkItems) {
        drawUIWorkItem(dayDataContainer_el, itemID, dayWorkItems[itemID]);
      }
    }

    if (tsDaysToDraw > 1) {
      if (tsDaysToDraw % DAYSDRAWN_UPDATE_FREQ === 0) {
        loadingIndicator_el.innerHTML = "creating day " + (tsDaysToDrawTotal - tsDaysToDraw) + "/" + tsDaysToDrawTotal;
				timesheetDrawDayTimer = setTimeout(drawNextDay, 0);
				// re-calling the function via setTimeout means it will happen *after* the 
				// flow of execution leaves this context - so the following increment/decrement happen
				// before the next drawNextDay() call
				// TODO check terminology of above comment!
				curDrawnDay.setDate(curDrawnDay.getDate() + 1);
				tsDaysToDraw --;
      } else {
				curDrawnDay.setDate(curDrawnDay.getDate() + 1);
				tsDaysToDraw --;
				drawNextDay();
			}
    } else {
      // add year totals
      totals_el = document.createElement("li");
      addClassname(totals_el, CLASS_TOTALSYEAR);
      drawTotalsContainer({
        heading: (curDrawnDay.getFullYear() - 1) + " totals",
        parent_el: totals_el,
        endDate: new Date(curDrawnDay.getTime()),
        timeSpan: TIMESPAN_YEAR
      });
      tsWorkingFragment.appendChild(totals_el);

      // add fragment to DOM
      timesheet_el.appendChild(tsWorkingFragment);
      addClassname(loadingIndicator_el, CLASS_HIDDEN);

      recalculateAllTotals();
    }
  };


  drawTimesheets = function() {
    var i, j, weekdayCur,
				totals_el, weekStartDay = 1; // 0 = Sunday, 1 = Monday etc
    
    resetJobAndClientCounts();
    tsWorkingFragment = document.createDocumentFragment(); // work in a fragment to improve performance
    curDrawnDay = new Date();

    // how many days do we want to draw?
   switch(dataRetrieveObject(PREFS_STR).timespan) {
      case TIMESPAN_WEEK:
        weekdayCur = curDrawnDay.getDay(); // 0 = Sunday, 1 = Monday etc
        curDrawnDay.setDate(curDrawnDay.getDate() - weekdayCur + weekStartDay); // first day of week
        tsDaysToDraw = DAYSINWEEK;
        break;
      case TIMESPAN_MONTH:
        curDrawnDay.setDate(1);
        tsDaysToDraw = curDrawnDay.monthDays();
        break;
      case TIMESPAN_YEAR:
        curDrawnDay.setMonth(0);
        curDrawnDay.setDate(1);
        tsDaysToDraw = DAYSINYEAR;
        if (curDrawnDay.isLeapYear()) { tsDaysToDraw += 1; }
        break;
      default:
        break;
    }

    tsDaysToDrawTotal = tsDaysToDraw;
    // draw days asynchronously with a timer
    // to enable us to give UI feedback on progress
    timesheetDrawDayTimer = setTimeout(drawNextDay, 0);
  };


	// monster function but really to abstract it out into sub-functions seems
	// like it would add complexity...
	// it just draws a work item (main row in the timesheet) and all the things inside it
	// the pattern is simple:
	// - create element
	// - attach event handlers to it
	// - pre-fill it with stored data if some exists
  drawUIWorkItem = function(dayDataContainer_el, itemID, itemData_ob) {
    var money_el, tmp_ob, tmp_el, item_el, wrappedCheckbox_el, numberValue_ar,
				day_el = dayDataContainer_el.parentNode;

		if (itemID === undefined) { itemID = getGUID(); }
    item_el = createElementWithId("li", itemID);
    dayDataContainer_el.insertBefore(item_el, dayDataContainer_el.firstChild);

		//////////
    // 'add item' button
    tmp_el = createButtonFromOb({
      class: "addItemBtn",
      label: LABEL_ADDITEM,
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.addTask",
          scopeID: itemID
        }
    ]);
		//////////
    // client select/dropdown
    tmp_el = createSelectFromOb({
      contentType: CONTENTTYPE_CLIENTS,
      placeholderText: CLIENT_SELECT_PLACEHOLDER,
      options: dataRetrieveObject(CLIENTS_STR),
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected",
        scope: tmp_el
        }
    ]);
		if (itemData_ob && itemData_ob[DATAINDICES.clientID]
		&& itemData_ob[DATAINDICES.clientID].length > 0) {
			changeSelectByOption(tmp_el, itemData_ob[DATAINDICES.clientID]);
      updateJobOrClientCount(CLIENTS_STR, itemData_ob[DATAINDICES.clientID], 1);
			manualEvent(tmp_el, "change");
		}
		//////////
    // job select/dropdown
    tmp_el = createSelectFromOb({
      contentType: CONTENTTYPE_JOBS,
      placeholderText: JOB_SELECT_PLACEHOLDER,
      options: dataRetrieveObject(JOBS_STR),
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.updateSelected",
        scope: tmp_el
        }
    ]);
		if (itemData_ob && itemData_ob[DATAINDICES.jobID] && itemData_ob[DATAINDICES.jobID].length > 0) {
			changeSelectByOption(tmp_el, itemData_ob[DATAINDICES.jobID]);
      updateJobOrClientCount(JOBS_STR, itemData_ob[DATAINDICES.jobID], 1);
			manualEvent(tmp_el, "change");
		}
		//////////
		// 'money/task' checkbox
    tmp_el = createCheckboxFromOb({
      class: "ios-switch isMoneyTaskChk",
      label: " ", // a label is needed for wrapLabel/addDivToLabel to work
			wrapLabel: true,
			addDivToLabel: true,
      parent: item_el,
      checked: false,
    });
    attachEventArrayToElement(tmp_el, [
        {
          eventType: "change",
          methodPathStr: "uk.co.firmgently.DontDillyDally.onIsMoneyTaskChkChange",
          scopeID: itemID
        }
    ]);
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_MONEY) {
			// after checking this box its onChange method has to be called, but not yet
			// as it depends on other elements added below... see bottom of this function
			tmp_el.checked = true;
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
		//////////
    // hours/money big unit spinner input
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_TIME) {
      tmp_ob = { min: 0, max: 23, step: 1, wrapNum: true, pad: "00" };
    } else {
      tmp_ob = { min: -999999999, max: 999999999, step: 1, pad: "    " };
    }
    tmp_el = createSpinnerFromOb({
      class: CLASS_SPINNER_UNITBIG,
      parent: item_el,
      attributes: tmp_ob,
    });
    attachEventArrayToElement(tmp_el, [
      {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "keyup",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "paste",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "input",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }
    ]);
    if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
			tmp_el.value = numberValue_ar[0];
			if (parseInt(numberValue_ar[0]) < 0) {
				addClassname(tmp_el.parentNode.parentNode, CLASS_NEGATIVE);
			}
			manualEvent(tmp_el, "change");
		} else {
      tmp_el.value = "00";
    } 
		//////////
    // hours/money small unit spinner input
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_TIME) {
      tmp_ob = { min: 0, max: 59, wrapNum: true, pad: "00" };
      switch(dataRetrieveObject(PREFS_STR).minuteIncrements) {
        case MINUTEINCREMENTS_15:
          tmp_ob.step = 15;
          break;
        case MINUTEINCREMENTS_30:
          tmp_ob.step = 30;
          break;
        case MINUTEINCREMENTS_1: // intentional rollthrough
        default:
          tmp_ob.step = 1;
          break;
      }
    } else {
      tmp_ob = { min: 0, max: 99, step: 1, wrapNum: true, pad: "00" };
    }
    tmp_el = createSpinnerFromOb({
      class: CLASS_SPINNER_UNITSMALL,
      parent: item_el,
      attributes: tmp_ob,
    });
    attachEventArrayToElement(tmp_el, [
      {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "keyup",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "paste",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "input",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }
    ]);
		if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
			tmp_el.value = numberValue_ar[1];
			manualEvent(tmp_el, "change");
		} else {
      tmp_el.value = "00";
    }
		//////////
    // job/money notes
    tmp_el = createInputFromOb({
      class: CLASS_NOTESINPUT,
      parent: item_el,
      attributes: { "type": "text", "placeholder": JOBNOTES_PLACEHOLDER },
    });
    attachEventArrayToElement(tmp_el, [
      {
        eventType: "change",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "keyup",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "paste",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }, {
        eventType: "input",
        methodPathStr: "uk.co.firmgently.DontDillyDally.onUpdateInput",
        scope: tmp_el
      }
    ]);
		if (itemData_ob && itemData_ob[DATAINDICES.notes]) { tmp_el.value = itemData_ob[DATAINDICES.notes]; }
		//////////
    // 'remove item' button
    tmp_el = createButtonFromOb({
      class: "removeItemBtn",
      label: LABEL_REMOVEITEM,
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.removeTask",
          scopeID: itemID
        }
    ]);
		
		// if this item is being filled with stored data,
		// and the money checkbox is checked, we have to call the onChange function here
		// as it depends on the other elements such as "notes" being present
		if (itemData_ob && itemData_ob[DATAINDICES.itemType] === ITEMTYPE_MONEY) {
			onIsMoneyTaskChkChange.call(item_el);
		}
  };


	removeClientOrJob = function() {
		var data_ob, type_str, msgItemType, usedCount;

    if (this.id.indexOf(CLIENT_STR) !== -1) {
      type_str = CLIENTS_STR;
      msgItemType = CLIENT_STR;
    } else if (this.id.indexOf(JOB_STR) !== -1) {
      type_str = JOBS_STR;
      msgItemType = JOB_STR;
    }
      
    data_ob = dataRetrieveObject(type_str);
    usedCount = data_ob[this.id][CLIENTSORJOBS_USED];
    if (!usedCount || confirm("This " + msgItemType  + " is used " + usedCount  + " time(s) in the current timesheet, really delete it?")) {
		  delete data_ob[this.id];
		  dataStoreObject(type_str, data_ob);
		  this.parentNode.removeChild(this);
    }
	};


  removeWorkItem = function(el) {
    var previouslySelectedClientID, previouslySelectedJobID,
      days_ar = dataRetrieveObject(DAYS_STR),
      day_ob = days_ar[el.parentNode.parentNode.id],
      workItem_ob = day_ob[el.id];

    if (workItem_ob) {
      previouslySelectedClientID = workItem_ob[DATAINDICES.clientID];
      previouslySelectedJobID = workItem_ob[DATAINDICES.jobID];
      if (previouslySelectedClientID) {
        updateJobOrClientCount(CLIENTS_STR, previouslySelectedClientID, -1);
      }
      if (previouslySelectedJobID) {
        updateJobOrClientCount(JOBS_STR, previouslySelectedJobID, -1);
      }
    }


    if (day_ob) { delete day_ob[el.id]; }
    el.parentNode.removeChild(el);
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




  /* ---------------------------------------------------------------------------
		callbacks/event handlers
	--------------------------------------------------------------------------- */


  /*onSelectFocus = function(event) {
    this.previousSelection = this.value;
  };*/


  onColorChangeConfirm = function(event) {
    updateDataFromClientOrJobEl(this);
  };


  onFileSelect = function(event) {
    var data_ob,
        file = event.target.files[0], // FileList object first item (as only single file)
				reader = new FileReader();
	
    reader.onload = function(event) {
      var data_ob = JSON.parse(event.target.result);
			console.log(data_ob);
      dataStoreObject(PREFS_STR, data_ob[PREFS_STR]);
      dataStoreObject(JOBS_STR, data_ob[JOBS_STR]);
      dataStoreObject(JOBSTOTAL_STR, data_ob[JOBSTOTAL_STR]);
      dataStoreObject(CLIENTS_STR, data_ob[CLIENTS_STR]);
      dataStoreObject(CLIENTSTOTAL_STR, data_ob[CLIENTSTOTAL_STR]);
      dataStoreObject(DAYS_STR, data_ob[DAYS_STR]);
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

		data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

		// create a phantom element, attach encoded JSON to it
		// add it to DOM, click then remove
		el = document.createElement("a");
		el.href = "data:" + data;
		el.download = SAVE_FILENAME + ".txt";
		el.innerHTML = "download .txt file of json";
		document.body.appendChild(el);
		el.click();
    document.body.removeChild(el);
	};


  onFormClick = function(event) {
    var form = event.target;
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


  onFormSubmit = function(event) {
    stopPropagation(event);
  };


  onUpdateInput = function(event) {
    switch (dataRetrieveObject(PREFS_STR).pagetype) {
      case PAGETYPE_TIMESHEETS:
        if (this.className.indexOf(CLASS_NOTESINPUT) !== -1) {
          // TODO validate notes input
          updateDataFromWorkItemEl(this.parentNode);
        } else {
          if (isNaN(parseInt(this.value))) { this.value = 0; }

          // TODO needs to handle negative small unit eg. -£0.13
          if (this.className.indexOf(CLASS_SPINNER_UNITBIG) !== -1) {
            if (parseInt(this.value) < 0) {
              addClassname(this.parentNode.parentNode, CLASS_NEGATIVE);
            } else {
              removeClassname(this.parentNode.parentNode, CLASS_NEGATIVE);
            }
          }
          // TODO check following line still works
          if (document.body.contains(this)) {
            updateDataFromWorkItemEl(this.parentNode.parentNode);
          }
          this.value = padString(this.value, this.spin_ob.pad);
          clearTimeout(recalculateTotalsTimer);
          recalculateTotalsTimer = setTimeout(recalculateAllTotals, RECALCULATETOTALS_DELAY);
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
				notesInput = this.getElementsByClassName(CLASS_NOTESINPUT)[0];
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




  /* ---------------------------------------------------------------------------
    housekeeping/calculations
	--------------------------------------------------------------------------- */


  resetJobAndClientCounts = function() {
    var item, data_ob;
    
    data_ob = dataRetrieveObject(CLIENTS_STR);
    for (item in data_ob) {
      data_ob[item][CLIENTSORJOBS_USED] = 0;
    }
    dataStoreObject(CLIENTS_STR, data_ob);

    data_ob = dataRetrieveObject(JOBS_STR);
    for (item in data_ob) {
      data_ob[item][CLIENTSORJOBS_USED] = 0;
    }
    dataStoreObject(JOBS_STR, data_ob);
  };


  // dataType: CLIENTS_STR or JOBS_STR
  // id: client or job id
  // value: 1 or -1 (for increment or decrement)
  updateJobOrClientCount = function(dataType, id, value) {
    var data_ob = dataRetrieveObject(dataType);
    if (id && data_ob[id]) {
      if (!data_ob[id][CLIENTSORJOBS_USED]) { data_ob[id][CLIENTSORJOBS_USED] = 0; }
      data_ob[id][CLIENTSORJOBS_USED] += value;
      dataStoreObject(dataType, data_ob);
    }
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


  recalculateAllTotals = function() {
    var i, curContainer, curTotalsData,
        totalsContainers = timesheet_el.getElementsByClassName("totals-container");

    for (i = 0; i < totalsContainers.length; i++) {
      curContainer = totalsContainers[i];
      curTotalsData = calculateTotalsFromDateSpan(curContainer.endDate, curContainer.timeSpan);
      curContainer.getElementsByClassName("total-income")[0].innerHTML = curTotalsData.incomeTotal;
      curContainer.getElementsByClassName("total-spend")[0].innerHTML = curTotalsData.spendTotal;
      curContainer.getElementsByClassName("total-hoursworked")[0].innerHTML = curTotalsData.timeTotal;
      curContainer.getElementsByClassName("total-profit")[0].innerHTML = curTotalsData.incomeTotal + curTotalsData.spendTotal; // spendTotal is a negative value
    }
  };


  calculateTotalsFromDateSpan = function(dateEnd, timeSpan) {
    var i, j, daysToCalculate, dayCur, day_str, tmpVal,
				dayWorkItems, itemID, itemCur, daysInPrevMonth,
        dateStart,
        return_ob = {
          timeTotal: 0,
          incomeTotal: 0,
          spendTotal: 0
        },
				allWorkItems = dataRetrieveObject(DAYS_STR);
    
    dateStart = new Date(dateEnd.getTime());

    if (timeSpan === TIMESPAN_WEEK) {
			dateStart.setDate(dateStart.getDate() - DAYSINWEEK);
		} else if (timeSpan === TIMESPAN_MONTH) {
			daysInPrevMonth = new Date(dateStart.getDate() - 1).monthDays();
			dateStart.setDate(dateStart.getDate() - daysInPrevMonth);
		} else if (timeSpan === TIMESPAN_YEAR) {
			dateStart.setDate(dateStart.getDate() - DAYSINYEAR);
		}
    daysToCalculate = daysBetween(dateStart, dateEnd);
    dayCur = dateStart;
		
    for (i = 0; i < daysToCalculate; i++) {
      day_str = dayCur.getShortISO();
      dayWorkItems = allWorkItems[day_str];
      if (dayWorkItems) {
				for (itemID in dayWorkItems) {
          itemCur = dayWorkItems[itemID];
          if (itemCur[DATAINDICES.itemType] === ITEMTYPE_MONEY) {
            tmpVal = parseInt(itemCur[DATAINDICES.numberValue], 10);
            if (tmpVal < 0) {
              return_ob.spendTotal += parseInt(itemCur[DATAINDICES.numberValue], 10);
            } else {
              return_ob.incomeTotal += parseInt(itemCur[DATAINDICES.numberValue], 10);
            }
          } else if (itemCur[DATAINDICES.itemType] === ITEMTYPE_TIME) {
            return_ob.timeTotal += parseInt(itemCur[DATAINDICES.numberValue], 10);
          }
        }
      }
      dayCur.setDate(dayCur.getDate() + 1);
    }
    return return_ob;
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
		var colorPickerFGSelector, colorPickerBGSelector,
        selector =	"." + ob.class + ", " +
										"." + ob.class + ":hover, " +
										"." + ob.class + ":active";

		// add main CSS for eg. timesheets page
    if (dataType === DATATYPE_CLIENT || dataType === DATATYPE_JOB) {
      addCSSRule(selector, "color", ob.color + " !important");
      addCSSRule(selector, "background-color", ob.bgcolor + " !important");
    } else {
      addCSSRule(selector, "color", ob.color);
      addCSSRule(selector, "background-color", ob.bgcolor);
    }
		addCSSRule(selector, "font-style", "normal");
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
    Special event handling.
    In order to allow event handlers to be attached to elements and
    methods which may not have been defined at the time of creation
    the following methods are used
	--------------------------------------------------------------------------- */

  // attaches an array of objects defining event handlers to an element
  // and sets up a generic handler for each event type (eg. click, touchstart)
  attachEventArrayToElement = function(el, ar) {
    var i;

    if (!el.ob) { el.ob = {}; }
    if (!el.ob.event_ar) { el.ob.event_ar = [] ; }

    for (i = 0; i < ar.length; i++) {
      el.ob.event_ar.push(ar[i]);
      registerEventHandler(el, ar[i].eventType, callMethodsFromObOnElement);
    }
  };


  // calls all methods of a certain type (eg. click) which have been
  // attached to an element previously via its ob.event_ar
  // bubbles up through parents if 'ob' data object isn't found
  callMethodsFromObOnElement = function(event) {
    var i, node, event_ar;

    node = event.target;
    // TODO make sure this loop cant get infinite
    while (!node.ob) {
      node = node.parentNode;
    }

    event_ar = node.ob.event_ar;
    for (i = 0; i < event_ar.length; i++) {
      if (event_ar[i].eventType === event.type) {
        callMethodFromOb(event_ar[i], event);
      }
    }
  };


  // calls a method based on a data object which defines
  // the method name, scope and other arguments
	// (with optional event passthrough to the called method)
  callMethodFromOb = function(ob, event) {
    var scope;

    if (ob && ob.scope) { // ob.scope is an element
      scope = ob.scope;
    } else if (ob && ob.scopeID) { // ob.scope is an ID string
      scope = document.getElementById(ob.scopeID);
    } else {
      scope = undefined;
    }

    if (ob.eventType) {
      if (ob.args) {
        ob.args.push(event);
      } else {
        ob.args = [event];
      }
    }
    getFunctionFromString(ob.methodPathStr).apply(scope, ob.args);
  };




  /* ---------------------------------------------------------------------------
    UI click handlers
	--------------------------------------------------------------------------- */

  navClick = function(event) {
    selectPage(arguments[0]);
  };


  dayJump = function(event) {
    var i, day, dayNodes,
				btnID = event.target.id,
        scrollTop = mainContainer_el.scrollTop;

    if (btnID === EL_ID_WEEKNEXTBTN || btnID === EL_ID_WEEKPREVBTN) {
        dayNodes = document.getElementsByClassName("week-start");
		} else if (btnID === EL_ID_MONTHNEXTBTN || btnID === EL_ID_MONTHPREVBTN) {
        dayNodes = document.getElementsByClassName("month-start");
    }
    
		if (btnID === EL_ID_WEEKNEXTBTN || btnID === EL_ID_MONTHNEXTBTN) { // search forward
      // look for matching nodes which are past the top of the scroll window
      // breaking when we find a match (leaving 'day' set to our match)
      // the +1 is to make sure we don't repeatedly match the same node after scrolling it to the top of the window
      for (i = 0; i < dayNodes.length; i++) {
        day = dayNodes[i];
        if (day.offsetTop > scrollTop + 1) { break; } 
      }
    } else if (btnID === EL_ID_WEEKPREVBTN || btnID === EL_ID_MONTHPREVBTN) { // search backward
      for (i = dayNodes.length - 1; i >= 0; i--) {
        day = dayNodes[i];
        if (day.offsetTop < scrollTop - 1) { break; }
      }
    }
    day.scrollIntoView();

		if (btnID === EL_ID_WEEKNEXTBTN || btnID === EL_ID_WEEKPREVBTN) {
			attractAnimateElement(day.getElementsByTagName("P")[0].getElementsByTagName("SPAN")[0]);
		} else if (btnID === EL_ID_MONTHNEXTBTN || btnID === EL_ID_MONTHPREVBTN) {
			attractAnimateElement(day.getElementsByTagName("H4")[0]);
		}

    eventAutoRepeatStart(event.target, event.type);
  };


	todayClick = function(event) {
		document.getElementsByClassName(CLASS_TODAY)[0].scrollIntoView();
	};


	attractAnimateElement = function(el) {
		removeClassname(el, CLASS_ATTRACT);
		// HACK - trigger a reflow, needed to properly remove class and allow 
		// us to restart the animation
		el.offsetTop;
		addClassname(el, CLASS_ATTRACT);
	};


	eventAutoRepeatStart = function(el, eventType) {
    eventAutoRepeat(el, eventType);
    registerEventHandler(el, "mouseup", eventAutoRepeatStop);
    registerEventHandler(el, "mouseout", eventAutoRepeatStop);
    registerEventHandler(el, "touchend", eventAutoRepeatStop);
	};
	
	
	eventAutoRepeat = function(el, eventType) {
		clearTimeout(eventAutoRepeatTimer);
		eventAutoRepeatTimer = setTimeout(function() { manualEvent(el, eventType); }, AUTOREPEAT_RATE);
	};


	eventAutoRepeatStop = function() {
		clearTimeout(eventAutoRepeatTimer);
	};


  updateSelected = function() {
    var pageType = dataRetrieveObject(PREFS_STR).pagetype;

    switch (pageType) {
      case PAGETYPE_TIMESHEETS: // run on to next case
      case PAGETYPE_JOBSANDCLIENTS:
				if (this.className.indexOf(CLASS_CLIENTSELECT) !== -1) {
					this.className = CLASS_CLIENTSELECT + " " + this.value;
				} else if (this.className.indexOf(CLASS_JOBSELECT) !== -1) {
					this.className = CLASS_JOBSELECT + " " + this.value;
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




	/* ---------------------------------------------------------------------------
		BEGIN...
	--------------------------------------------------------------------------- */
  
  doSetup = function() {
    loadingIndicator_el = document.getElementById(EL_ID_LOADINGINDICATOR);
		mainContainer_el = document.getElementById(EL_ID_MAINCONTAINER);
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
		registerEventHandler(document.getElementById("file-chooser"), "change", onFileSelect, false);
		registerEventHandler(document.getElementById("file-save"), "click", onSaveBtnClick, false);
  };


  doSetup();


	// return references to methods (make them public) that will be called
	// from eg. callbacks which don't have a reference to this scope
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
    dayJump: dayJump,
    getNewClient: getNewClient,
    onFormClick: onFormClick,
    onFormSubmit: onFormSubmit,
    getNewJob: getNewJob,
    updateSelected: updateSelected,
    onUpdateInput: onUpdateInput,
    onIsMoneyTaskChkChange: onIsMoneyTaskChkChange
  };


// 'this' would be undefined because of "use strict",
// calling the function with .call(this) fixes it
}).call(this);
