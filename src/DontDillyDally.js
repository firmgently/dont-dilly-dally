
/*
---------------------------------------------------------
  Firm Gently
  DontDillyDally
  Mark Mayes 2018

  TODO  pageIntro from Consts needs to be able to define more complex data (eg. ul, li, icons)
	TODO	look out for autorepeat getting stuck on dayJump (make sure timer gets cancelled on mouseup etc)
  TODO  add 'year start date' preference
  TODO  add ARIA attributes (eg. hide up/down spinner buttons)
  FIXME press/hold to jump back through months, page reloads with ? in querystring
  FIXME final (sheet) totals not calculating correctly
  TODO  only show month/week jump buttons if they make sense OR make them work everywhere (ie. flip month/week page)
	FIXME	£-0.77 must register as negative (if IS smallUnit && bigUnit=0 && direction===-1 && current===0)
  TODO  test everything on touchscreen
  TODO  test everything on narrow (phone) layout
  TODO  feedback:
        - [on startup] data and settings restored from previous session (localStorage)
        - [first usage] default data and settings created
        - [on load] data and settings loaded from $filename
  TODO  |!| help item
        checkbox which un-shows itself when unchecked
        help icon in main menu - click to make them all show again
        store flags indicating which help disabled/enabled


  DONE dots in loaderbar
  DONE  loader should only appear on timesheets page
  DONE  leave gap between months on timesheet
  DONE  horizontal layout of workitem, + X buttons, wrap for portrait
  DONE click around nav while timesheets loading - bug seen where eg. settings page, all settings were duplicated in GUI
  DONE  validate all input data
          time/money
          notes - max length
          client/job names in clients/jobs page
  DONE  after loading file current page must update (redraw) be it timesheets, J&Cs or preferences
  DONE  file load isn't loading data yet
  DONE  workitem remove button shoudnt disappear when firstchild, should remove item then create a new one
        - removeItem should decrement
        - change event should decrement current selection (if it exists) then increment new selection{
	DONE 1st day of following year is showing
  DONE  portrait CSS
        - workItem bottom margin increase
        - notes input move left margin to be right margin on unitSmall
  DONE  remove button should be closer to item it is removing
  DONE  all strings should be constants
  DONE  remove old dynamic classes (jobs/clients) 
	DONE	spinners: numbers should pad eg. 00:45h, £10.00
  DONE  don't need to save 'class' in JSON for each client/job... id holds same info, redundant
  DONE  display month/week start correctly
  DONE  import button wrong colour (white) on rollover
  DONE  notes input field even more faded when its not focused and has no data
  DONE client select dropdown styles broken (CSS not being written after loading data file?)
	DONE	if empty or bad time/money data is **stored in JSON**, correct it to zero
  DONE  number spinners should fade up quickly with short delay (to avoid flickering on 'remove item' etc)
  DONE  clicking anywhere off colorpicker should close it without changing colours (currently working on transparent pixels of png, needs to be the same for all the rest of the screen
  DONE  spinners ony show for hovered/focused day
  DONE if page is changed while timesheets are being drawn, bugs out (clear timeout)
  DONE  ensure big/small units update min/max/step when changing from money to hours or viceversa
  DONE timesheet container not getting scroll focus
  DONE  fix widths of client/job selects on timesheets page, use text-overflow: ellipsis
  DONE  nav buttons shouldnt be chopped off
	DONE	add 'wipe data' buttons with confirmation prompt
  DONE  visual feedback when saving (even though it's happening all the time)...appears on change, fades out after 2 secs
  DONE  jobs/clients
        - boxes fill bg
        - add titles to boxes
  DONE number spinners inconsistent colours
  DONE  use spritesheet png instead of fonts??
  DONE  use updatefrequency to refresh "days drawn" only on % === 0
  DONE icons on buttons too small, positioned badly
  DONE  delete job/client check if any records are referencing them, prompt if so
  DONE  refactor month/week click etc to all use 1 function
  DONE next/prev week/month buttons not working
  DONE  redesign logo
  DONE when first day of timesheet is first of month, don't show previous month totals
  DONE  loading bar
	DONE	select client/job - day remains highlighted (eg. darker date text)
  DONE tab nav - position wrong while page is loading (gap)
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
  DONE colour palette can push off side of screen resulting in resize on Android
  DONE	 number spinners
  DONE  match all button styles
  DONE 	blank space appears at bottom of page (seems related to LOADING element)
	DONE	clients/jobs page - color pickers do not need to  be checkboxes
  DONE	negative money values should attach negative classname on initial page load
  DONE  borders around inputs and colorpickers on clients/jobs page
	DONE	preference changes not taking effect
  DONE  month/week should flash briefly after day jump
  DONE   jobs and clients list existing jobs/clients
  DONE   jobs and clients proper colour picker
  DONE	 minify JS on save
  DONE  delete temporary <a> created when file is saved
	DONE	'even' class wrongly being applied to child elements
  DONE  month/week skip buttons should auto-repeat
  DONE	 spinners: hour/minute units can wrap
  DONE  'import from file' button doesn't get focus outline
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
  loadingIndicator_el, mainContainer_el, timesheet_el, workingIndicator_el,
	
	// handles for setTimeout
	clearPageTimer, btnEventAutoRepeatTimer, timesheetDrawDayTimer, recalculateTotalsTimer,
	
	// callbacks
  onFormSubmit, onUpdateInput, onIsMoneyTaskChkChange,
	onClearDataBtnClick, onSaveBtnClick, onColorChangeConfirm,
	onFormClick, onScroll, onFileSelect,

	// other methods
  doSetup, selectPage, refreshPage, drawPage, clearPage, drawGUIFromAr,
	btnEventAutoRepeat, btnEventAutoRepeatStop, btnEventAutoRepeatStart,
  recalculateAllTotals, calculateTotalsFromDateSpan, getNumberDataFromWorkItem,
  addItem, removeItem, addClient, removeClientOrJob, addJob,
  attachEventArrayToElement, callMethodsFromObOnElement, callMethodFromOb,
  drawTimesheet, drawNextDay, drawJobsAndClients, drawClientOrJobFromOb, drawTotalsContainer,
  getNextID, getNewClient, getNewJob, resetJobAndClientCounts, updateJobOrClientCount,
  navClick, todayClick, dayJump, startCSSAnimation,
  dataStoragePossible, initData, dataStoreObject, dataRetrieveObject, dataUpdateObject,
	clientAndJobStyleSheet, createClientOrJobFromOb, createCSSForClientOrJobFromOb,
	getJobOrClientIDFromElement, updateDataFromWorkItemEl, updateDataFromClientOrJobEl,
	updateColoursFromPickers, updateSelected, drawUIWorkItem, removeWorkItem 
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
        createClientOrJobFromOb(tmp_ob, DATATYPE_CLIENT);
      }

			// create new object to store jobs and fill it with some defaults
      dataStoreObject(JOBS_STR, {});
      for (item in JOB_DEFAULTS) {
        tmp_id = getNextID(DATATYPE_JOB);
        tmp_ob = JOB_DEFAULTS[item];
        tmp_ob.id = tmp_id;
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
    startCSSAnimation(workingIndicator_el, CLASS_ANIM_WORKING);
  };


  dataRetrieveObject = function(category) {
    return JSON.parse(localStorage.getItem(APP_ID + DATASTORE_CATEGORY_PREFIX + category));
  };


  dataUpdateObject = function(category, key, value) {
    var keyCurrent,
				ob = dataRetrieveObject(category);
    for (keyCurrent in ob) {
      if (keyCurrent === key) {
        ob[key] = value;
        break;
      }
    }
    dataStoreObject(category, ob);
  };


	updateDataFromWorkItemEl = function (el) {
		var days_ar, day_ob, workItem_ar,
        previouslySelectedClientID, previouslySelectedJobID,
        isMoneyTaskChk_el = el.getElementsByClassName(CLASS_MONEYTIMECHECKBOX)[0],
        clientSelect_el = el.getElementsByClassName(CLASS_CLIENTSELECT)[0],
        jobSelect_el = el.getElementsByClassName(CLASS_JOBSELECT)[0],
        notesInput_el = el.getElementsByClassName(CLASS_NOTESINPUT)[0], 
        selectedClientID = getJobOrClientIDFromElement(clientSelect_el),
        selectedJobID = getJobOrClientIDFromElement(jobSelect_el),
        day_el = el.parentNode.parentNode,
        day_str = day_el.id;

		days_ar = dataRetrieveObject(DAYS_STR);
		day_ob = days_ar[day_str];
		if (day_ob === undefined) { day_ob = {}; }

		workItem_ar = [];
		if (isMoneyTaskChk_el && isMoneyTaskChk_el.checked) {
			workItem_ar[DATAINDICES.itemType] = ITEMTYPE_MONEY;
		} else {
			workItem_ar[DATAINDICES.itemType] = ITEMTYPE_TIME;
		}
    workItem_ar[DATAINDICES.numberValue] = getNumberDataFromWorkItem(el).value;
  
    if (day_ob[el.id]) {
      previouslySelectedClientID = day_ob[el.id][DATAINDICES.clientID];
      previouslySelectedJobID = day_ob[el.id][DATAINDICES.jobID];
    }
    if (previouslySelectedClientID !== selectedClientID) {
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
      } else if (currentNode.className.indexOf(CLASS_COLORPICKER) !== -1) {
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
    if (pagetype === PAGETYPE_TIMESHEETS) {
      removeClassname(loadingIndicator_el, CLASS_HIDDEN);
    }
    refreshPage();
  };


  refreshPage = function() {
    clearPage();
    clearTimeout(clearPageTimer);
    clearPageTimer = setTimeout(drawPage, 0); // on timer to force reflow after clearPage()
  };


  clearPage = function() {
		document.body.id = "";
		clearTimeout(btnEventAutoRepeatTimer);
		clearTimeout(timesheetDrawDayTimer);
		clearTimeout(recalculateTotalsTimer);
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
    var i, j, ob, eventToAdd_ob, tmp_el;
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
        case GUITYPE_ROW: // intentional rollthrough
        case GUITYPE_HEADING: // intentional rollthrough
        case GUITYPE_SPACER:
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


     /* if (tmp_el && ob.event_ar && ob.event_ar.length > 0) {
        attachEventArrayToElement(tmp_el, ob.event_ar);
      }*/


      if (ob.event_ar) { // contains an array of objects
        for (j = 0; j < ob.event_ar.length; j++) {
          eventToAdd_ob = ob.event_ar[j];
          if (eventToAdd_ob.eventType) {
            registerEventHandler(tmp_el, eventToAdd_ob.eventType, callMethodsFromObOnElement);
          }
        }
      }
    }
  };


  drawTotalsContainer = function(data_ob) {
    var row_el, cell_el,
        heading_el = document.createElement("h4"),
        table_el = document.createElement("table");

    addClassname(table_el, CLASS_TOTALSCONTAINER);
    table_el.endDate = data_ob.endDate;
    table_el.timeSpan = data_ob.timeSpan;

    heading_el.innerHTML = data_ob.heading;
    data_ob.parent_el.appendChild(heading_el);

    row_el = table_el.appendChild(document.createElement("tr"));

    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = HOURSWORKED_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00"; 
    addClassname(cell_el, CLASS_TOTALHRSWORKED);
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = INCOME_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00";
    addClassname(cell_el, CLASS_TOTALINCOME);

    row_el = table_el.appendChild(document.createElement("tr"));

    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = EXPENDITURE_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00"; 
    addClassname(cell_el, CLASS_TOTALSPEND);

    row_el = table_el.appendChild(document.createElement("tr"));

    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = PROFIT_STR; 
    cell_el = row_el.appendChild(document.createElement("td"));
    cell_el.innerHTML = "00:00"; 
    addClassname(cell_el, CLASS_TOTALPROFIT);

    data_ob.parent_el.appendChild(table_el);
  };


  drawJobsAndClients = function() {
    var container_el, key, item_ar;

    item_ar = dataRetrieveObject(CLIENTS_STR);
    container_el = document.createElement("ul");
    addClassname(container_el, CLIENTS_STR);
    document.getElementById(EL_ID_CLIENTSEXISTING).appendChild(container_el);
    for (key in item_ar) {
      drawClientOrJobFromOb(item_ar[key]);
    }

    item_ar = dataRetrieveObject(JOBS_STR);
    container_el = document.createElement("ul");
    addClassname(container_el, JOBS_STR);
    document.getElementById(EL_ID_JOBSEXISTING).appendChild(container_el);
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
      parent_el = document.getElementById(EL_ID_CLIENTSEXISTING).getElementsByTagName("UL")[0];
    } else if (item.id.indexOf(JOB_STR) !== -1) {
      addMethodPath = "uk.co.firmgently.DontDillyDally.addJob";
      parent_el = document.getElementById(EL_ID_JOBSEXISTING).getElementsByTagName("UL")[0];
    }
    parent_el.appendChild(item_el);
    removeMethodPath = "uk.co.firmgently.DontDillyDally.removeClientOrJob";

    // 'add task' button
    tmp_el = createButtonFromOb({
      class: CLASS_ADDITEMBTN,
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
      attributes: { "type": "text", "value": item.name, maxlength: MAXLENGTH_INPUT_NAMES },
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
      class: CLASS_REMOVEITEMBTN,
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
        totalsToShow = dataRetrieveObject(PREFS_STR).totalsToShow,
        showWeekTotals = (totalsToShow === "showTotalsWeek" || totalsToShow === "showTotalsWeekAndMonth"), 
        showMonthTotals = (totalsToShow === "showTotalsMonth" || totalsToShow === "showTotalsWeekAndMonth"), 
				weekStartDay = 1, // 0 = Sunday, 1 = Monday etc
				allWorkItems = dataRetrieveObject(DAYS_STR),
        percentDrawn = 100 * (tsDaysToDraw / tsDaysToDrawTotal),
        scaledPercent = percentDrawn / LOADER_CSSWIDTH_SCALE;

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
    }
    if (curDrawnDay.getDay() === weekStartDay) {
    //if (curDrawnDay.getDay() === weekStartDay && curDrawnDay.getWeekNumber() > 1) {
      rowClassname += "week-start ";
      significance_str += "week " + curDrawnDay.getWeekNumber();
      // if this is week 1 and month is December, must be week 1 of next year
      if (curDrawnDay.getWeekNumber() === 1 && curDrawnDay.getMonth() === 11) {
        significance_str += " (" + (curDrawnDay.getFullYear() + 1) + ")";
      }
      if (showWeekTotals && tsDaysToDraw !== tsDaysToDrawTotal) {
        totals_el = document.createElement("li");
        addClassname(totals_el, CLASS_TOTALSWEEK);
        tsWorkingFragment.appendChild(totals_el);
        drawTotalsContainer({
          heading: "week " + curDrawnDay.getWeekNumber() + " totals",
          parent_el: totals_el,
          endDate: new Date(curDrawnDay.getTime()),
          timeSpan: TIMESPAN_WEEK
        });
      }
    }
    if (curDrawnDay.getDate() === 1) {
    //if (curDrawnDay.getDate() === 1 && curDrawnDay.getMonth() > 0) {
      rowClassname += "month-start ";
      monthHeader_el = document.createElement("h4");
      monthHeader_el.innerHTML = MONTH_NAMES[curDrawnDay.getMonth()] + " " + curDrawnDay.getFullYear();
      day_el.appendChild(monthHeader_el);
      if (showMonthTotals && tsDaysToDraw !== tsDaysToDrawTotal) {
        totals_el = document.createElement("li");
        addClassname(totals_el, CLASS_TOTALSMONTH);
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
    if (significance_str !== "") {
      date_el.innerHTML = "<em>" + curDrawnDay.getWeekDay(1) + "</em>" + getFormattedDate(curDrawnDay, DATETYPES[dataRetrieveObject(PREFS_STR).dateFormat].label) + "<span>" + significance_str + "</span>";
    } else {
      date_el.innerHTML = "<em>" + curDrawnDay.getWeekDay(1) + "</em>" + getFormattedDate(curDrawnDay, DATETYPES[dataRetrieveObject(PREFS_STR).dateFormat].label);
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
        
    loadingIndicator_el.getElementsByTagName("EM")[0].style.paddingRight = scaledPercent + "%";

    if (tsDaysToDraw > 1) {
      if (tsDaysToDraw % DAYSDRAWN_UPDATE_FREQ === 0) {
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
        heading: "timesheet totals",
        //heading: (curDrawnDay.getFullYear() - 1) + " totals",
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


  drawTimesheet = function() {
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
    var money_el, tmp_ob, tmp_el, item_el, wrappedCheckbox_el, tmpNum, numberValue_ar,
				day_el = dayDataContainer_el.parentNode;

		if (itemID === undefined) { itemID = getGUID(); }
    item_el = createElementWithId("li", itemID);
    dayDataContainer_el.insertBefore(item_el, dayDataContainer_el.firstChild);

		//////////
    // 'add item' button
    tmp_el = createButtonFromOb({
      class: CLASS_ADDITEMBTN,
      label: LABEL_ADDITEM,
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.addItem",
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
        tmpNum = parseInt(itemData_ob[DATAINDICES.numberValue], 10);
        //numberValue_ar = itemData_ob[DATAINDICES.numberValue].split(SEPARATOR_CASH);
        // TODO optimise this (following)
        numberValue_ar = floatToArray(tmpNum/100); // cash is stored in pennies
      }
			addClassname(item_el, CLASS_MONEY);
		} else {
      if (itemData_ob && itemData_ob[DATAINDICES.numberValue]) {
        tmpNum = parseInt(itemData_ob[DATAINDICES.numberValue], 10);
        //numberValue_ar = itemData_ob[DATAINDICES.numberValue].split(SEPARATOR_TIME);
        numberValue_ar = [
          (tmpNum - (tmpNum % 60)) / 60,
          tmpNum % 60
        ]
      }
			addClassname(item_el, CLASS_HOURS);
    }
    //////////
    // break visibility is controlled with CSS
    item_el.appendChild(document.createElement("br")); 
		//////////
    // hours/money big unit spinner input
		if (!itemData_ob || itemData_ob[DATAINDICES.itemType] === ITEMTYPE_TIME) {
      tmp_ob = NUMFIELD_DATA_TIME_BIG;
    } else {
      tmp_ob = NUMFIELD_DATA_MONEY_BIG;
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
			manualEvent(tmp_el, "change");
		} else {
      tmp_el.value = "00";
    } 
		//////////
    // hours/money small unit spinner input
		if (!itemData_ob || itemData_ob[DATAINDICES.itemType] === ITEMTYPE_TIME) {
      tmp_ob = NUMFIELD_DATA_TIME_SMALL;
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
      tmp_ob = NUMFIELD_DATA_MONEY_SMALL;
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
    if (getNumberDataFromWorkItem(item_el).value < 0) {
      addClassname(tmp_el.parentNode.parentNode, CLASS_NEGATIVE);
    }
    //////////
    // break visibility is controlled with CSS
    item_el.appendChild(document.createElement("br")); 
    //////////
    // job/money notes
    tmp_el = createInputFromOb({
      class: CLASS_NOTESINPUT,
      parent: item_el,
      attributes: { "type": "text", "placeholder": JOBNOTES_PLACEHOLDER, maxlength: MAXLENGTH_INPUT_NOTES },
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
      class: CLASS_REMOVEITEMBTN,
      label: LABEL_REMOVEITEM,
      parent: item_el,
    });
    attachEventArrayToElement(tmp_el, [
        {
          eventType: "click",
          methodPathStr: "uk.co.firmgently.DontDillyDally.removeItem",
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
    var workItem_ob, previouslySelectedClientID, previouslySelectedJobID,
        days_ar = dataRetrieveObject(DAYS_STR),
        day_ob = days_ar[el.parentNode.parentNode.id];

    if (day_ob) {
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
      delete day_ob[el.id];
    }

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
      } else if (currentNode.className.indexOf(CLASS_COLORPICKER) !== -1) {
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

  onColorChangeConfirm = function(event) {
    updateDataFromClientOrJobEl(this);
  };


  onFileSelect = function(event) {
    var data_ob,
        file = event.target.files[0], // FileList object first item (as only single file)
				reader = new FileReader();
	
    reader.onload = function(event) {
      var data_ob, currentPage;
      
      if (confirm(TXT_LOADFILE_CONFIRM)) {
        currentPage = dataRetrieveObject(PREFS_STR).pagetype;
        data_ob = JSON.parse(event.target.result);
        dataStoreObject(PREFS_STR, data_ob[PREFS_STR]);
        dataStoreObject(JOBS_STR, data_ob[JOBS_STR]);
        dataStoreObject(JOBSTOTAL_STR, data_ob[JOBSTOTAL_STR]);
        dataStoreObject(CLIENTS_STR, data_ob[CLIENTS_STR]);
        dataStoreObject(CLIENTSTOTAL_STR, data_ob[CLIENTSTOTAL_STR]);
        dataStoreObject(DAYS_STR, data_ob[DAYS_STR]);
        // stay on same page rather than redirecting to page from stored prefs
        dataUpdateObject(PREFS_STR, "pagetype", currentPage);
        initData();
        refreshPage();
      }
		};
		reader.readAsText(file);
  };

  
  onClearDataBtnClick = function(event) {
    if (confirm(TXT_DELETEDATA_CONFIRM)) {
      localStorage.clear();
      initData();
      // TODO some form of page refresh/reload - do same after loading data
      refreshPage();
    }
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
    var form = this,
        prefs_ob = dataRetrieveObject(PREFS_STR);
    if (form && form.id) {
      switch (form.id) {
        case EL_ID_CONFIGFORM:
          prefs_ob.timespan = form.timespan.value;
          prefs_ob.dateFormat = form.dateFormat.value;
          prefs_ob.totalsToShow = form.totalsToShow.value;
          prefs_ob.minuteIncrements = form.minuteIncrements.value;
          dataStoreObject(PREFS_STR, prefs_ob);
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
    var workItem = this.parentNode;
    switch (dataRetrieveObject(PREFS_STR).pagetype) {
      case PAGETYPE_TIMESHEETS:
        if (this.className.indexOf(CLASS_NOTESINPUT) !== -1) {
          // TODO validate notes input
          updateDataFromWorkItemEl(workItem);
        } else { // other (non-notes) inputs on timesheet
          workItem = this.parentNode.parentNode; // these are nested deeper
          // fix non-numeric input
          if (isNaN(parseInt(this.value))) { this.value = 0; }
          // TODO needs to handle negative small unit eg. -£0.13
          
          if (document.body.contains(this)) {
            if (getNumberDataFromWorkItem(workItem).value < 0) {
              addClassname(workItem, CLASS_NEGATIVE);
            } else {
              removeClassname(workItem, CLASS_NEGATIVE);
            }
          }
          // save data
          if (document.body.contains(this)) { updateDataFromWorkItemEl(workItem); }
          // pad for display
          this.value = padString(this.value, this.spin_ob.pad);
          // recalculate totals (delayed)
          clearTimeout(recalculateTotalsTimer);
          recalculateTotalsTimer = setTimeout(recalculateAllTotals, RECALCULATETOTALS_DELAY);
        }
        break;
      case PAGETYPE_CONFIG:
        break;
      case PAGETYPE_JOBSANDCLIENTS:
        updateDataFromClientOrJobEl(workItem);
        break;
      default:
        break;
    }
  };


  onIsMoneyTaskChkChange = function() {
    var checkbox = this.getElementsByClassName(CLASS_MONEYTIMECHECKBOX)[0],
        spinners = this.getElementsByClassName(CLASS_SPINNER),
        spinnerBig = spinners[0].getElementsByTagName("INPUT")[0],
        spinnerSmall = spinners[1].getElementsByTagName("INPUT")[0],
				notesInput = this.getElementsByClassName(CLASS_NOTESINPUT)[0];

    if (checkbox.checked) {
			addClassname(this, CLASS_MONEY);
			removeClassname(this, CLASS_HOURS);
      notesInput.placeholder = MONEYNOTES_PLACEHOLDER;
      spinnerBig.spin_ob = NUMFIELD_DATA_MONEY_BIG;
      spinnerSmall.spin_ob = NUMFIELD_DATA_MONEY_SMALL;
    } else {
			addClassname(this, CLASS_HOURS);
			removeClassname(this, CLASS_MONEY);
      notesInput.placeholder = JOBNOTES_PLACEHOLDER;
      spinnerBig.spin_ob = NUMFIELD_DATA_TIME_BIG;
      spinnerSmall.spin_ob = NUMFIELD_DATA_TIME_SMALL;
    }
		if (document.body.contains(this)) { updateDataFromWorkItemEl(this); }
  };




  /* ---------------------------------------------------------------------------
    housekeeping/calculations
	--------------------------------------------------------------------------- */


  // convert displayed numeric values into correct formats for storing
  getNumberDataFromWorkItem = function(item_el) {
    var return_ob,
        spinners = item_el.getElementsByClassName(CLASS_SPINNER),
        val1 = parseInt(spinners[0].getElementsByTagName("INPUT")[0].value, 10),
        val2 = parseInt(spinners[1].getElementsByTagName("INPUT")[0].value, 10);

    if (item_el.className.indexOf(CLASS_MONEY) !== -1) {
      return_ob = { type: ITEMTYPE_MONEY };
      // val1/val2 = before/after the decimal point
      // value stored as pennies eg. £7.24 = 724
      if (val1 < 0) { // negative value, need to subtract small units (not add)
        return_ob.value = 0 + (val1*100) - val2;
      } else {
        return_ob.value = 0 + (val1*100) + val2;
      }
    } else if (item_el.className.indexOf(CLASS_HOURS) !== -1) {
      return_ob = {
        type: ITEMTYPE_TIME,
        // value stored as minutes
        // val1 = hours, val2 = mins
        value: 0 + (val1 * 60) + val2
      };
    }
    return return_ob;
  };


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
			for (i = 0; i < class_ar.length; i++) {
				curClass = class_ar[i];
				if (curClass !== CLASS_JOBSELECT && curClass !== CLASS_CLIENTSELECT) {
					return curClass;
				}
			}
		}
	};


  recalculateAllTotals = function() {
    var i, curContainer, curTotalsData,
        totalsContainers = timesheet_el.getElementsByClassName(CLASS_TOTALSCONTAINER);

    for (i = 0; i < totalsContainers.length; i++) {
      curContainer = totalsContainers[i];
      curTotalsData = calculateTotalsFromDateSpan(curContainer.endDate, curContainer.timeSpan);
      curContainer.getElementsByClassName(CLASS_TOTALINCOME)[0].innerHTML = curTotalsData.incomeTotal;
      curContainer.getElementsByClassName(CLASS_TOTALSPEND)[0].innerHTML = curTotalsData.spendTotal;
      curContainer.getElementsByClassName(CLASS_TOTALHRSWORKED)[0].innerHTML = curTotalsData.timeTotal;
      curContainer.getElementsByClassName(CLASS_TOTALPROFIT)[0].innerHTML = curTotalsData.incomeTotal + curTotalsData.spendTotal; // spendTotal is a negative value
    }
  };


  calculateTotalsFromDateSpan = function(dateEnd, timeSpan) {
    var i, j, daysToCalculate, dayCur, day_str, tmpVal,
				dayWorkItems, itemID, itemCur, daysInPrevMonth, dateStart,
        return_ob = { timeTotal: 0, incomeTotal: 0, spendTotal: 0 },
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
            //tmpVal = getNumberDataFromWorkItem(n
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
    return_ob.spendTotal = return_ob.spendTotal / 100;
    return_ob.incomeTotal = return_ob.incomeTotal / 100;

    // convert minutes to hh/mm
    tmpVal = return_ob.timeTotal;
    // ensure padString gets sent a String rather than a Number
    return_ob.timeTotal = padString("" + (tmpVal - (tmpVal % 60)) / 60, PADSTR_DOUBLEDIGIT);
    return_ob.timeTotal += SEPARATOR_TIME;
    return_ob.timeTotal += padString("" + tmpVal % 60, PADSTR_DOUBLEDIGIT);
    return return_ob;
  };


  // addItem is called from the scope of the 'add task' button
  addItem = function() {
    drawUIWorkItem(this.parentNode);
  };


	removeItem = function() {
    if (this.parentNode.children.length === 1) {
      // make sure there's always at least one item for each day (for UI purposes)
      drawUIWorkItem(this.parentNode);
    }
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
        selector =	"." + ob.id + ", " +
										"." + ob.id + ":hover, " +
										"." + ob.id + ":active";

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
      color: getRandomHexColor("dark"),
      bgcolor: getRandomHexColor("light")
    };
  };


  getNewJob = function() {
    var id = getNextID(DATATYPE_JOB);
    return {
      id: id,
      name: id,
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
      if (ar[i].eventType) {
        el.ob.event_ar.push(ar[i]);
        registerEventHandler(el, ar[i].eventType, callMethodsFromObOnElement);
      }
    }
  };


  // calls all methods of a certain type (eg. click) which have been
  // attached to an element previously via its ob.event_ar
  // bubbles up through parents if 'ob' data object isn't found
  callMethodsFromObOnElement = function(event) {
    var i, node, event_ar;

    node = event.target;
    // TODO make sure this loop cant get infinite
    while (!node.ob && node !== document.body) {
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
      scope = window;
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
        dayNodes = document.getElementsByClassName(CLASS_WEEKSTART);
		} else if (btnID === EL_ID_MONTHNEXTBTN || btnID === EL_ID_MONTHPREVBTN) {
        dayNodes = document.getElementsByClassName(CLASS_MONTHSTART);
    }
    
    if (dayNodes.length > 0) {
      if (btnID === EL_ID_WEEKNEXTBTN || btnID === EL_ID_MONTHNEXTBTN) { // search forward
        // look for matching nodes which are past the top of the scroll window
        // breaking when we find a match (leaving 'day' set to our match)
        // the +1 is to make sure we don't repeatedly match the same node after scrolling it to the top of the window
        for (i = 0; i < dayNodes.length; i++) {
          day = dayNodes[i];
          if (day.offsetTop > scrollTop + DAYJUMP_TOPPOS_BUFFERPX + 1) { break; } 
        }
      } else if (btnID === EL_ID_WEEKPREVBTN || btnID === EL_ID_MONTHPREVBTN) { // search backward
        for (i = dayNodes.length - 1; i >= 0; i--) {
          day = dayNodes[i];
          if (day.offsetTop < scrollTop - 1) { break; }
        }
      }
      if (day) {
        mainContainer_el.scrollTop = day.offsetTop - DAYJUMP_TOPPOS_BUFFERPX;
        //day.scrollIntoView();
        if (btnID === EL_ID_WEEKNEXTBTN || btnID === EL_ID_WEEKPREVBTN) {
          startCSSAnimation(day, CLASS_ANIM_ATTRACT);
          //startCSSAnimation(day.getElementsByTagName("P")[0].getElementsByTagName("SPAN")[0], CLASS_ANIM_ATTRACT);
        } else if (btnID === EL_ID_MONTHNEXTBTN || btnID === EL_ID_MONTHPREVBTN) {
          startCSSAnimation(day.getElementsByTagName("H4")[0], CLASS_ANIM_ATTRACT);
        }
        btnEventAutoRepeatStart(event);
      }
    }

  };


	todayClick = function(event) {
		//document.getElementsByClassName(CLASS_TODAY)[0].scrollIntoView();
    mainContainer_el.scrollTop = document.getElementsByClassName(CLASS_TODAY)[0].offsetTop - DAYJUMP_TOPPOS_BUFFERPX;
    startCSSAnimation(document.getElementsByClassName(CLASS_TODAY)[0], CLASS_ANIM_ATTRACT);
	};


	startCSSAnimation = function(el, animClass) {
		removeClassname(el, animClass);
		// HACK - trigger a reflow, needed to properly remove class and allow 
		// us to restart the animation
		el.offsetTop;
		addClassname(el, animClass);
	};


	btnEventAutoRepeatStart = function(event) {
    btnEventAutoRepeat(event);
    registerEventHandler(document.body, "mouseup", btnEventAutoRepeatStop);
    registerEventHandler(event.target, "mouseout", btnEventAutoRepeatStop);
    registerEventHandler(event.target, "touchend", btnEventAutoRepeatStop);
	};
	
	
	btnEventAutoRepeat = function(event) {
		clearTimeout(btnEventAutoRepeatTimer);
		btnEventAutoRepeatTimer = setTimeout(function() { manualEvent(event.target, event.type); }, AUTOREPEAT_RATE);
	};


	btnEventAutoRepeatStop = function(event) {
		clearTimeout(btnEventAutoRepeatTimer);
    unregisterEventHandler(document.body, "mouseup", btnEventAutoRepeatStop);
    unregisterEventHandler(event.target, "mouseout", btnEventAutoRepeatStop);
    unregisterEventHandler(event.target, "touchend", btnEventAutoRepeatStop);
	};


  updateSelected = function() {
    var pagetype = dataRetrieveObject(PREFS_STR).pagetype; // refers to current page

    if (pagetype === PAGETYPE_TIMESHEETS || pagetype === PAGETYPE_JOBSANDCLIENTS) {
      if (this.className.indexOf(CLASS_CLIENTSELECT) !== -1) {
        this.className = CLASS_CLIENTSELECT + " " + this.value;
      } else if (this.className.indexOf(CLASS_JOBSELECT) !== -1) {
        this.className = CLASS_JOBSELECT + " " + this.value;
      }
    }

    if (pagetype === PAGETYPE_TIMESHEETS) {
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
    workingIndicator_el = document.getElementById("sidebar-main").getElementsByTagName("H1")[0].getElementsByTagName("EM")[0];
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
		registerEventHandler(document.getElementById("clear-data"), "click", onClearDataBtnClick, false);
  };


  doSetup();


	// return references to methods (make them public) that will be called
	// from eg. callbacks which don't have a reference to this scope
  return {
    drawTimesheet: drawTimesheet,
    drawJobsAndClients: drawJobsAndClients,
    addItem: addItem,
    removeItem: removeItem,
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
