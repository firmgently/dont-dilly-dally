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
	createButtonFromOb, createTextInputFromOb, createRadioFromOb,
	addLIsFromOb, createBasicElementFromOb, createColorPickerFromOb,
	callMethodFromObOnElement, callMethodFromOb;



	fillHTMLFromOb = function(ob) {
    for (var prop in ob) {
      document.getElementById(prop).innerHTML = ob[prop];
    }
  };



	  callMethodFromObOnElement = function(e) {
	    // logMsg("callMethodFromObOnElement: " + JSON.stringify(e.target.ob));
	    callMethodFromOb(e.target.ob);
	  };


	  callMethodFromOb = function(ob) {
	    var scope = (ob.scopeID !== undefined) ? document.getElementById(ob.scopeID) : undefined;
	    // logMsg("\tcallMethodFromOb: " + JSON.stringify(ob));

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

    if (ob.attributes) {
      for (prop in ob.attributes) {
        logMsg(prop + ": " + ob.attributes[prop]);
        input_el.setAttribute("" + prop, "" + ob.attributes[prop]);
      }
    }


    input_el.setAttribute("type", "text");
    parent_el.appendChild(input_el);

    input_el.ob = ob;

    if (ob.class) { addClassname(input_el, ob.class); }

    if (ob.method !== undefined) {
      registerEventHandler(input_el, "change", callMethodFromObOnElement);
      registerEventHandler(input_el, "keyup", callMethodFromObOnElement);
      registerEventHandler(input_el, "paste", callMethodFromObOnElement);
      registerEventHandler(input_el, "input", callMethodFromObOnElement);
    }
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
    // logMsg("addLIsFromOb");
    // logMsg(ob.ulID);
    // logMsg(ob.ar);

    for (i = 0; i < ob.ar.length; i++) {
      // logMsg(i);
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


	return {
		/*
		---------------------------------------------------------
								PUBLIC
		---------------------------------------------------------
		*/
		fillHTMLFromOb: fillHTMLFromOb,
		createButtonFromOb: createButtonFromOb,
		createTextInputFromOb: createTextInputFromOb,
		createRadioFromOb: createRadioFromOb,
		addLIsFromOb: addLIsFromOb,
		createBasicElementFromOb: createBasicElementFromOb,
		callMethodFromOb: callMethodFromOb,
		callMethodFromObOnElement: callMethodFromObOnElement,
		createColorPickerFromOb: createColorPickerFromOb
	};

}());
