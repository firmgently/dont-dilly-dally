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
