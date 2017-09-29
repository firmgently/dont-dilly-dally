/*
---------------------------------------------------------
  Firm Gently Utilities
  Mark Mayes 2016
---------------------------------------------------------
*/
// create namespace: uk.co.firmgently
var uk = (uk !== undefined) ? uk : {};
uk.co = (uk.co !== undefined) ? uk.co : {};
uk.co.firmgently = (uk.co.firmgently !== undefined) ? uk.co.firmgently : {};
//
uk.co.firmgently.FGUtils = (function() {
	"use strict";

	var
	addCSSRule, getIEVersion, isTouchDevice,
	registerEventHandler, unregisterEventHandler, stopPropagation,
	hexOpacityToRGBA, getRandomHexColor, createElementWithId,
	removeClassname, addClassname, getStyle,
  treatAsUTC, daysBetween, getFormattedDate,
	logMsg;


  /* -------------------------------------------------------------------------------
  	extend some global objects
  ---------------------------------------------------------------------------------- */

	String.prototype.isEmpty = function() {
		return (!this || /^\s*$/.test(this));
	};



  Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
  };


/*
  http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
  Because of short-circuit evaluation, getObject() will immediately return null
  if key is not in Storage. It also will not throw a SyntaxError exception if
  value is "" (the empty string; JSON.parse() cannot handle that). */
  Storage.prototype.getObject = function(key) {
      var value = this.getItem(key);
      return value && JSON.parse(value);
  };



	// http://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
	Date.prototype.monthDays= function() {
	    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
	    return d.getDate();
	};


	// http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
	Date.prototype.isLeapYear = function() {
	    var year = this.getFullYear();
	    if ((year & 3) !== 0) { return false; }
	    return ((year % 100) !== 0 || (year % 400) === 0);
	};

	//http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
	// Get Day of Year
	Date.prototype.getDOY = function() {
	    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	    var mn = this.getMonth();
	    var dn = this.getDate();
	    var dayOfYear = dayCount[mn] + dn;
	    if(mn > 1 && this.isLeapYear()) dayOfYear++;
	    return dayOfYear;
	};

	Date.prototype.getWeekDay = function(length) {
	    var ret,
					weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			ret = weekday[this.getDay()];
			if (length > 0) { ret = ret.substring(0, length);	}

	    return ret;
	};


	/* -------------------------------------------------------------------------------
		general helpers
	---------------------------------------------------------------------------------- */

	// prevent bubbling/propagation/default events (image drag and drop etc)
	// also when showing another image on click we don't want the event to bubble
	// up to its container, as a click on the container closes the overlay
	stopPropagation = function(e) {
    if (e.preventDefault) { e.preventDefault(); }
    if (e.stopPropagation) { e.stopPropagation(); }
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
	};


	registerEventHandler = function(node, event, handler, useCapture) {
    useCapture = (useCapture === undefined) ? false : useCapture;
    if (typeof node.addEventListener === "function") {
      node.addEventListener(event, handler, useCapture);
    } else {
      node.attachEvent("on" + event, handler);
    }
		// logMsg("node: " + node);
		// logMsg("event: " + event);
		// logMsg("handler: " + handler);
  };


	unregisterEventHandler = function(node, event, handler, useCapture) {
    useCapture = (useCapture === undefined) ? false : useCapture;
    if (typeof node.removeEventListener === "function") {
      node.removeEventListener(event, handler, useCapture);
    } else {
      node.detachEvent("on" + event, handler);
    }
  };


  hexOpacityToRGBA = function(hexColour, opacity) {
    var r, g, b;
    r = parseInt(hexColour.substring(0,2), 16);
    g = parseInt(hexColour.substring(2,4), 16);
    b = parseInt(hexColour.substring(4,6), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
  };


	getRandomHexColor = function(tone) {
		// Based on http://www.paulirish.com/2009/random-hex-color-code-snippets/
		var full = 16777215, mid = 8388607, third = 5592405, smalln = 1864135, hexString;
		if (tone === undefined) {
			hexString = '#' + Math.floor(Math.random()*full).toString(16);
		} else if (tone.toUpperCase() === "LIGHT") {
			hexString = '#' + Math.floor(full - Math.random()*third).toString(16);
		} else if (tone.toUpperCase() === "DARK") {
			hexString = '#' + Math.floor(Math.random()*smalln).toString(16);
		}
		return hexString;
	};


  createElementWithId = function(elType, id) {
    var el = document.createElement(elType);
		el.id = id;
    return el;
  };


  removeClassname = function(element, name) {
    element.className = element.className.replace(" " + name,"");
  };


  addClassname = function(element, name) {
    name = " " + name;
    element.className = element.className.replace(name,"");
    element.className = element.className + name;
  };


	addCSSRule = function(selector, property, newValue) {
		// logMsg("selector: " + selector);
		// logMsg("property: " + property);
		// logMsg("newValue: " + newValue);
		var	i, curStyleSheet,
			totalStyleSheets = document.styleSheets.length,
			newStyle = property + ": " + newValue;
		for (i = 0; i < totalStyleSheets; i++) {
			curStyleSheet = document.styleSheets[i];
			// logMsg("curStyleSheet: " + curStyleSheet);
			try {
				curStyleSheet.insertRule(selector + " {" + newStyle + "}", curStyleSheet.cssRules.length);
			} catch(err1) {
				try {
					curStyleSheet.addRule(selector, newStyle);
				} catch(err2) {}
			}
		}
	};


	getFormattedDate = function(date, format) {
		var dateString;
		format = format.replace("yy", date.getUTCFullYear().toString().substr(-2));
		format = format.replace("dd", ("0" + (date.getUTCDate())).slice(-2));
		format = format.replace("mm", ("0" + (date.getUTCMonth()+1)).slice(-2));
		return format;
		// =
		//   date.getUTCFullYear() +"/"+
		//   ("0" + (date.getUTCMonth()+1)).slice(-2) +"/"+
		//   ("0" + date.getUTCDate()).slice(-2);
	};


	getStyle = function(el, styleProp) {
		var style;
		if (el.currentStyle) {
			style = el.currentStyle[styleProp];
		} else if (window.getComputedStyle) {
			style = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
		}
		return style;
	};


	logMsg = function(msg) {
    console.log(msg);
  };


	// ----------------------------------------------------------
  // A short snippet for detecting versions of IE in JavaScript
  // without resorting to user-agent sniffing
  // http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/
  // ----------------------------------------------------------
  // If you're not in IE (or IE version is less than 5) then:
  //     getIEVersion() === undefined
  // If you're in IE (>=5) then you can determine which version:
  //     getIEVersion() === 7; // IE7
  // Thus, to detect IE:
  //     if (getIEVersion()) {}
  // And to detect the version:
  //     getIEVersion() === 6 // IE6
  //     getIEVersion() > 7 // IE8, IE9 ...
  //     getIEVersion() < 9 // Anything less than IE9
  // ----------------------------------------------------------

  // UPDATE: Now using Live NodeList idea from @jdalton
  getIEVersion = function(){
    var undef,
      v = 3,
      div = document.createElement('div'),
      all = div.getElementsByTagName('i');

    while (
      div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
      all[0]
    );

    return v > 4 ? v : undef;
  };


	isTouchDevice = function() {
    // window.alert("ontouchstart in window: " + ('ontouchstart' in window) );
    // window.alert("onmsgesturechange in window: " + ('onmsgesturechange' in window) );
    // return 'ontouchstart' in window || 'onmsgesturechange' in window;

     return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  };


  // http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
  treatAsUTC = function(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  };
  daysBetween = function(startDate, endDate) {
      var msPerDay = 24 * 60 * 60 * 1000;
      return (treatAsUTC(endDate) - treatAsUTC(startDate)) / msPerDay;
  };




	return {
		/*
		---------------------------------------------------------
								PUBLIC
		---------------------------------------------------------
		*/
		registerEventHandler: registerEventHandler,
		unregisterEventHandler: unregisterEventHandler,
		stopPropagation: stopPropagation,
		removeClassname: removeClassname,
		addClassname: addClassname,
		addCSSRule: addCSSRule,
		hexOpacityToRGBA: hexOpacityToRGBA,
		getRandomHexColor: getRandomHexColor,
		createElementWithId: createElementWithId,
		getFormattedDate: getFormattedDate,
		treatAsUTC: treatAsUTC,
		daysBetween: daysBetween,
		logMsg: logMsg,
		getIEVersion: getIEVersion,
		getStyle: getStyle,
		isTouchDevice: isTouchDevice
	};

}());

/*
---------------------------------------------------------
  Firm Gently Utilities
  Mark Mayes 2016
---------------------------------------------------------
*/
// create namespace: uk.co.firmgently
var uk = (uk !== undefined) ? uk : {};
uk.co = (uk.co !== undefined) ? uk.co : {};
uk.co.firmgently = (uk.co.firmgently !== undefined) ? uk.co.firmgently : {};
//
uk.co.firmgently.FGHTMLBuild = (function() {
	"use strict";

	var
	fillHTMLFromOb,
	createButtonFromOb, createRadioFromOb,
	createInputFromOb, createSelectFromOb,
	createFormFromOb,
	addLIsFromOb, createBasicElementFromOb, createColorPickerFromOb

	// callMethodFromObOnElement = uk.co.firmgently.DontDillyDally.callMethodFromObOnElement,
	// callMethodFromOb = uk.co.firmgently.DontDillyDally.callMethodFromOb;
	// callMethodFromObOnElement;
	;


	fillHTMLFromOb = function(ob) {
    for (var prop in ob) {
      document.getElementById(prop).innerHTML = ob[prop];
    }
  };


	/* -----------------------------------------------------------------------------
    create individual specific elements
  ----------------------------------------------------------------------------- */

  createButtonFromOb = function(ob) {
    var
    button_el,
    // ob.parent can be the ID(string) of the parent
    // or a reference to the HTML node/element itself
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    if (ob.id) {
      button_el = createElementWithId("button", ob.id);
    } else {
      button_el = document.createElement("button");
    }
    parent_el.appendChild(button_el);

    if (ob.class) { addClassname(button_el, ob.class); }
    button_el.innerHTML = ob.label;
    button_el.ob = ob;
    // registerEventHandler(button_el, "mousedown", uk.co.firmgently.DontDillyDally.callMethodFromObOnElement);

    if (ob.disabled) { button_el.disabled = ob.disabled; }

		return button_el;
  };


  createInputFromOb = function(ob) {
    var
    prop, input_el, label_el,
    innerHTML = "",
    // parent_el = document.getElementById(ob.parent);
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    // logMsg("ob.parent: " + ob.parent);
    // logMsg("parent_el: " + parent_el);
    // logMsg("typeof ob.parent: " + typeof ob.parent);

    if (ob.id) {
      if (ob.label) {
        label_el = document.createElement("label");
        label_el.innerHTML = ob.label;
        parent_el.appendChild(label_el);
        label_el.htmlFor = ob.id;
      }
      input_el = createElementWithId("input", ob.id);
      input_el.name = ob.id;
      input_el.id = ob.id;
    } else {
      input_el = document.createElement("input");
    }
    if (ob.class) { addClassname(input_el, ob.class); }
    parent_el.appendChild(input_el);

    if (ob.attributes) {
      for (prop in ob.attributes) {
        input_el.setAttribute("" + prop, "" + ob.attributes[prop]);
      }
    }

    input_el.ob = ob;

    // if (ob.methodName !== undefined) {
    //   registerEventHandler(input_el, "change", uk.co.firmgently.DontDillyDally.callMethodFromObOnElement);
    //   registerEventHandler(input_el, "keyup", uk.co.firmgently.DontDillyDally.callMethodFromObOnElement);
    //   registerEventHandler(input_el, "paste", uk.co.firmgently.DontDillyDally.callMethodFromObOnElement);
    //   registerEventHandler(input_el, "input", uk.co.firmgently.DontDillyDally.callMethodFromObOnElement);
    // }

		return input_el;
  };


  createSelectFromOb = function(ob) {
    var
    i, prop, select_el, label_el, option_el, clientOrJob_ob,
    dayPrefix,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    if (ob.id) {
      if (ob.label) {
        label_el = document.createElement("label");
        label_el.innerHTML = ob.label;
        parent_el.appendChild(label_el);
        label_el.htmlFor = ob.id;
      }
      select_el = createElementWithId("select", ob.id);
      select_el.name = ob.id;
      select_el.id = ob.id;
    } else {
      select_el = document.createElement("select");
    }
    if (ob.class) { addClassname(select_el, ob.class); }
    parent_el.appendChild(select_el);

    select_el.setAttribute("size", "1"); // HACK maybe to allow styling of individual options

    if (ob.contentType) { // clients / jobs options get treated differently to normal options
/*      if (ob.contentType === CONTENTTYPE_CLIENTS) {
        ob.options = ob.clientOptions;
      } else if (ob.contentType === CONTENTTYPE_JOBS) {
        ob.options = ob.jobOptions;
      }*/
			// logMsg("ob.options:");
      for (prop in ob.options) {
        clientOrJob_ob = ob.options[prop];
				// logMsg(JSON.stringify(clientOrJob_ob));
        option_el = select_el.options[select_el.options.length] = new Option(clientOrJob_ob.name, clientOrJob_ob.class);
        addClassname(option_el, clientOrJob_ob.class);
        addCSSRule("." + clientOrJob_ob.class, "background-color", clientOrJob_ob.bgcolor);
        addCSSRule("." + clientOrJob_ob.class, "color", clientOrJob_ob.color);
      }
    } else { // normal options
      for (prop in ob.options) {
        select_el.options[select_el.options.length] = new Option(ob.options[prop], prop);
      }
    }

    select_el.ob = ob;
    // select_el.ob.methodName = "updateSelected";
    // if (ob.methodName) {
    //   registerEventHandler(select_el, "change", uk.co.firmgently.DontDillyDally.callMethodFromObOnElement);
    // }

		return select_el;
  };


  createRadioFromOb = function(ob) {
    var
    prop, radio_el, label_el,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    for (prop in ob.options) {
      label_el = document.createElement("label");
      label_el.innerHTML = ob.options[prop];
      parent_el.appendChild(label_el);

      radio_el = document.createElement("input");
      if (ob.class) { addClassname(radio_el, ob.class); }
      parent_el.appendChild(radio_el);

      radio_el.setAttribute("type", "radio");
      radio_el.id = ob.id;
      radio_el.name = ob.id;
      radio_el.value = prop;
			logMsg("ob.checkIfMatched: " + ob.checkIfMatched);
      if (prop === ob.checkIfMatched) { radio_el.checked = true; }
      // if (prop === dataRetrieveObject("prefs").timespan) { radio_el.checked = true; }
      label_el.htmlFor = ob.id;
    }

		return radio_el;
  };


  addLIsFromOb = function(ob) {
    var
    i, li_el,
    UL_el = createElementWithId("ul", EL_ID_COLHEADING),
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

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
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

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

		return el;
  };


  createColorPickerFromOb = function(ob) {
    var
    el,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;
    if (ob.id) {
      el = createElementWithId("span", ob.id);
    } else {
      el = document.createElement("span");
    }
    parent_el.appendChild(el);
    if (ob.class) { addClassname(el, ob.class); }

		return el;
  };


/*	createFormFromOb = function(ob) {
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
  };*/








	return {
		/*
		---------------------------------------------------------
								PUBLIC
		---------------------------------------------------------
		*/
		fillHTMLFromOb: fillHTMLFromOb,
		createButtonFromOb: createButtonFromOb,
		createSelectFromOb: createSelectFromOb,
		// createFormFromOb: createFormFromOb,
		createInputFromOb: createInputFromOb,
		// createTextInputFromOb: createTextInputFromOb,
		createRadioFromOb: createRadioFromOb,
		addLIsFromOb: addLIsFromOb,
		createBasicElementFromOb: createBasicElementFromOb,
		// callMethodFromOb: callMethodFromOb,
		// callMethodFromObOnElement: callMethodFromObOnElement,
		createColorPickerFromOb: createColorPickerFromOb
	};

}());

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
  PAGETYPE_CONFIG = " > preferences",
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
  GUITYPE_UL = "GUITypeUL",

  CLASS_BTNNAV = "btnNav",
  CLASS_FORMMAIN = "formMain",
  CLASS_COL = "col",
  CLASS_ROW = "row",

  CLIENT_STR = "client",
  JOB_STR = "job",

  EL_ID_COLHEADING = "column-headings",
  EL_ID_JOBNAMEIN = "jobNameIn",
  EL_ID_CLIENTNAMEIN = "clientNameIn",
  EL_ID_CLIENTSAVEBTN = "saveNewClientBtn",
  EL_ID_JOBSAVEBTN = "saveNewJobBtn",
  EL_ID_SELECTCLIENT = "selectClient",
  EL_ID_SELECTJOB = "selectJob",

  CLIENT_FG_COLPICK = "clientFGPicker",
  CLIENT_BG_COLPICK = "clientBGPicker",
  JOB_FG_COLPICK = "jobFGPicker",
  JOB_BG_COLPICK = "jobBGPicker",

  DATATYPE_JOB = "dataTypeJob",
  DATATYPE_CLIENT = "dataTypeClient",

  CONTENTTYPE_CLIENTS = "contentTypeClients",
  CONTENTTYPE_JOBS = "contentTypeJobs",

  TIMESHEETCONTAINER_ID = "timesheetContainer",
  LOADINGINDICATOR_ID = "loading-indicator",

  GUIDATA_NAVMAIN = [
    {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      id: BODYID_TIMESHEETS,
      label: "Timesheets",
      methodName: "navClick",
      args: [PAGETYPE_TIMESHEETS],
      scopeID: "main",
      parent: "nav-main"
    }, {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      id: BODYID_JOBSANDCLIENTS,
      label: "Jobs & Clients",
      methodName: "navClick",
      args: [PAGETYPE_JOBSANDCLIENTS],
      scopeID: "main",
      parent: "nav-main"
    }, {
      type: GUITYPE_BTN,
      class: CLASS_BTNNAV,
      id: BODYID_CONFIG,
      label: "Preferences",
      methodName: "navClick",
      args: [PAGETYPE_CONFIG],
      scopeID: "main",
      parent: "nav-main"
    }, {
      type: GUITYPE_UL,
      ar: [
        "date", "hrs", "client", "job", "job notes", "£", "£ notes"
      ],
      ulID: EL_ID_COLHEADING,
      class: CLASS_COL,
      parent: "header-main"
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
      parent: "main",
    }, {
      type: GUITYPE_FORM,
      id: "createClientForm",
      class: CLASS_FORMMAIN,
      title: "Fill in client details",
      // method: null,
      parent: "editClientCol",
      el_ar: [
        {
          type: GUITYPE_ROW,
          id: "clientNewRow",
          class: CLASS_ROW,
          parent: "createClientForm",
        }, {
          type: GUITYPE_ROW,
          id: "clientsExistingRow",
          class: CLASS_ROW,
          parent: "createClientForm",
        }, {
          type: GUITYPE_BTN,
          label: "Create new",
          id: "createNewClientBtn",
          methodName: "newClientCreate",
          args: [],
          scopeID: "createClientForm",
          parent: "clientNewRow"
        }, {
          type: GUITYPE_TEXTINPUT,
          id: EL_ID_CLIENTNAMEIN,
          label: "Client name",
          parent: "clientNewRow",
          methodName: "onClientTyped",
          args: [],
          scopeID: "createClientForm",
          attributes: { "type": "text" }
        }, {
          type: GUITYPE_BTN,
          label: "Save",
          id: EL_ID_CLIENTSAVEBTN,
          methodName: "newClientFormSave",
          args: [],
          scopeID: "createClientForm",
          parent: "clientNewRow",
          disabled: true
        }, {
          type: GUITYPE_COLORPICKER,
          id: CLIENT_FG_COLPICK,
          class: "color-picker",
          parent: "clientsExistingRow"
        }, {
          type: GUITYPE_COLORPICKER,
          id: CLIENT_BG_COLPICK,
          class: "color-picker",
          parent: "clientsExistingRow"
        }, {
          type: GUITYPE_SELECT,
          label: "Existing clients",
          args: [],
          scopeID: "createClientForm",
          parent: "clientsExistingRow",
          methodName: "updateSelected",
          id: EL_ID_SELECTCLIENT,
          contentType: CONTENTTYPE_CLIENTS
        }
      ]
    }, {
      type: GUITYPE_COL,
      id: "editJobCol",
      class: CLASS_COL,
      parent: "main",
    }, {
      type: GUITYPE_FORM,
      id: "createJobForm",
      class: CLASS_FORMMAIN,
      title: "Fill in job details",
      // methodName: null,
      parent: "editJobCol",
      hidden: false,
      el_ar: [
        {
          type: GUITYPE_ROW,
          id: "jobNewRow",
          class: CLASS_ROW,
          parent: "createJobForm",
        }, {
          type: GUITYPE_ROW,
          id: "jobsExistingRow",
          class: CLASS_ROW,
          parent: "createJobForm",
        }, {
          type: GUITYPE_BTN,
          label: "Create new",
          id: "createNewJobBtn",
          methodName: "newJobCreate",
          scopeID: "createJobForm",
          args: [],
          parent: "jobNewRow"
        }, {
          type: GUITYPE_TEXTINPUT,
          id: EL_ID_JOBNAMEIN,
          label: "Job name",
          parent: "jobNewRow",
          attributes: { "type": "text" }
        }, {
          type: GUITYPE_BTN,
          label: "Save",
          id: EL_ID_JOBSAVEBTN,
          methodName: "newJobFormSave",
          scopeID: "createJobForm",
          args: [],
          parent: "jobNewRow",
          disabled: true
        }, {
          type: GUITYPE_COLORPICKER,
          id: JOB_FG_COLPICK,
          class: "color-picker",
          parent: "jobsExistingRow"
        }, {
          type: GUITYPE_COLORPICKER,
          id: JOB_BG_COLPICK,
          class: "color-picker",
          parent: "jobsExistingRow"
        }, {
          type: GUITYPE_SELECT,
          label: "Existing jobs",
          args: [],
          scopeID: "createJobForm",
          parent: "jobsExistingRow",
          methodName: "updateSelected",
          id: "selectJob",
          contentType: CONTENTTYPE_JOBS
        }
      ]
    }
  ],

  PAGEDATA_TIMESHEETS = {
    pageTitle: "Timesheets",
    intro: "Keep track of where you spend your time. Also record payments in and expenses paid out."
  },
  GUIDATA_TIMESHEETS = [
    {
      type: GUITYPE_SECTION,
      id: TIMESHEETCONTAINER_ID,
      parent: "main"
    }, {
      type: GUITYPE_METHODCALL,
      methodName: "drawTimesheets",
      scopeID: "main"
    }
  ],

  PAGEDATA_CONFIG = {
    pageTitle: "Preferences",
    intro: "Show and hide things and customise settings."
  },
  GUIDATA_CONFIG = [
    {
      type: GUITYPE_FORM,
      id: "configForm",
      class: CLASS_FORMMAIN,
      title: "Set your preferences here",
      parent: "main",
      hidden: false,
      el_ar: [
         {
           type: GUITYPE_RADIOBTN,
           id: "dateFormat",
           label: "Format used to show dates",
           parent: "configForm",
           options: {
             DATETYPE_DDMMYY: "dd/mm/yy",
             DATETYPE_MMDDYY: "mm/dd/yy",
             DATETYPE_YYMMDD: "yy/mm/dd"
           },
           disabled: true
         }, {
           type: GUITYPE_RADIOBTN,
           id: "timesheetRange",
           label: "Choose how many days you want to show on the timesheet page",
           parent: "configForm",
           options: {
             timespanWeek: "A week",
             timespanMonth: "A month",
             timespanYear: "A year"
           },
           disabled: true
         }, {
           type: GUITYPE_RADIOBTN,
           id: "totalsToShow",
           label: "Choose which totals you want totted up and displayed",
           parent: "configForm",
           options: {
             showTotalsWeek: "Show weekly totals",
             showTotalsMonth: "Show monthly totals",
             showTotalsWeekAndMonth: "Show both weekly and monthly totals"
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
    name: "Purchasing",
    color: "#000",
    bgcolor: "#0ff"
  },

  JOB_DEFAULT_2 = {
    name: "Administration",
    color: "#0f0",
    bgcolor: "#123"
  },

  CLIENT_DEFAULT_1 = {
    name: "Will @ ACME CO",
    color: "#fff",
    bgcolor: "#f00"
  },

  CLIENT_DEFAULT_2 = {
    name: "Diamond Jules",
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

  // which totals to showing
  SHOWTOTALS_WEEK = "showTotalsWeek",
  SHOWTOTALS_MONTH = "showTotalsMonth",
  SHOWTOTALS_BOTH = "showTotalsWeekAndMonth",
  SHOWTOTALS_DEFAULT = SHOWTOTALS_BOTH,

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
    GUITYPE_UL: GUITYPE_UL,
    TIMESHEETCONTAINER_ID: TIMESHEETCONTAINER_ID,
    LOADINGINDICATOR_ID: LOADINGINDICATOR_ID,
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
    EL_ID_COLHEADING: EL_ID_COLHEADING,
    CLIENT_STR: CLIENT_STR,
    JOB_STR: JOB_STR,
    EL_ID_JOBNAMEIN: EL_ID_JOBNAMEIN,
    EL_ID_CLIENTNAMEIN: EL_ID_CLIENTNAMEIN,
    JOB_FG_COLPICK: JOB_FG_COLPICK,
    JOB_BG_COLPICK: JOB_BG_COLPICK,
    CLIENT_FG_COLPICK: CLIENT_FG_COLPICK,
    CLIENT_BG_COLPICK: CLIENT_BG_COLPICK,
    TXT_STORAGE_UNSUPPORTED: TXT_STORAGE_UNSUPPORTED,
    JOB_DEFAULT_1: JOB_DEFAULT_1,
    JOB_DEFAULT_2: JOB_DEFAULT_2,
    CLIENT_DEFAULT_1: CLIENT_DEFAULT_1,
    CLIENT_DEFAULT_2: CLIENT_DEFAULT_2,
    CONTENTTYPE_CLIENTS: CONTENTTYPE_CLIENTS,
    CONTENTTYPE_JOBS: CONTENTTYPE_JOBS,
    DATATYPE_JOB: DATATYPE_JOB,
    DATATYPE_CLIENT: DATATYPE_CLIENT,
    EL_ID_CLIENTSAVEBTN: EL_ID_CLIENTSAVEBTN,
    EL_ID_JOBSAVEBTN: EL_ID_JOBSAVEBTN,
    EL_ID_SELECTCLIENT: EL_ID_SELECTCLIENT,
    EL_ID_SELECTJOB: EL_ID_SELECTJOB,
    SHOWTOTALS_WEEK: SHOWTOTALS_WEEK,
    SHOWTOTALS_MONTH: SHOWTOTALS_MONTH,
    SHOWTOTALS_BOTH: SHOWTOTALS_BOTH,
    SHOWTOTALS_DEFAULT: SHOWTOTALS_DEFAULT
  };


}());

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