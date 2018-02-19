/*
---------------------------------------------------------
  Firm Gently HTMLBuild
  Collection of functions for creating HTML elements
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
	createButtonFromOb, createRadioFromOb, createCheckboxFromOb,
	createInputFromOb, createSelectFromOb,
	createFormFromOb,
	addLIsFromOb, createBasicElementFromOb, createColorPickerFromOb
	;


	fillHTMLFromOb = function(ob) {
    for (var prop in ob) {
      if (document.getElementById(prop)) {
        document.getElementById(prop).innerHTML = ob[prop];
      }
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

    if (ob.disabled) { button_el.disabled = ob.disabled; }

		return button_el;
  };


  createInputFromOb = function(ob) {
    var
    prop, input_el, label_el,
    innerHTML = "",
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

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

		return input_el;
  };


  createSelectFromOb = function(ob) {
    var
    i, prop, select_el, label_el, option_el, clientOrJob_ob,
    dayPrefix, placeholderOption,
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

		if (ob.placeholderText) {
			placeholderOption = new Option(ob.placeholderText, "");
			placeholderOption.disabled = true;
			placeholderOption.selected = true;
			placeholderOption.hidden = true;
			select_el.options[select_el.options.length] = placeholderOption;
		}

    if (ob.contentType) { // clients / jobs options get treated differently to normal options
      if (ob.contentType === CONTENTTYPE_CLIENTS) {
				addClassname(select_el, CLASS_CLIENTSELECT);
      } else if (ob.contentType === CONTENTTYPE_JOBS) {
				addClassname(select_el, CLASS_JOBSELECT);
      }
      for (prop in ob.options) {
        clientOrJob_ob = ob.options[prop];
        option_el = select_el.options[select_el.options.length] = new Option(clientOrJob_ob.name, clientOrJob_ob.class);
        addClassname(option_el, clientOrJob_ob.class);
      }
    } else { // normal options
      for (prop in ob.options) {
        select_el.options[select_el.options.length] = new Option(ob.options[prop], prop);
      }
    }

    select_el.ob = ob;

		return select_el;
  };


  createCheckboxFromOb = function(ob) {
    var
    prop, checkbox_el, label_el, div_el,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    if (ob.label) {
      label_el = document.createElement("label");
      label_el.innerHTML = ob.label;
      parent_el.appendChild(label_el);
    }

		if (ob.id) {
			checkbox_el.id = ob.id;
			checkbox_el.name = ob.id;
			if (ob.label) {
				label_el.htmlFor = ob.id;
			}
		}

    checkbox_el = document.createElement("input");
    if (ob.class) { addClassname(checkbox_el, ob.class); }

    checkbox_el.setAttribute("type", "checkbox");
    checkbox_el.ob = ob;
    checkbox_el.checked = ob.checked;
		if (ob.wrapLabel) {
			label_el.appendChild(checkbox_el);
			if (ob.addDivToLabel) { // add empty div to facilitate 'toggle switch' CSS
				div_el = document.createElement("div");
				label_el.appendChild(div_el);
			}
		} else {
    	parent_el.appendChild(checkbox_el);
		}

		return checkbox_el;
  };


  createRadioFromOb = function(ob) {
    var
    prop, description_el, radio_el, label_el,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    if (ob.label) {
      description_el = document.createElement("p");
      description_el.innerHTML = ob.label;
      parent_el.appendChild(description_el);
    }

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
      label_el.htmlFor = ob.id;
    }

		return radio_el;
  };


  addLIsFromOb = function(ob) {
    var
    i, li_el, UL_el,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

		if (ob.id) {
			UL_el = createElementWithId("ul", ob.id)
		} else {
			UL_el = document.createElement("ul");
		}

    addClassname(UL_el, CLASS_ROW);

		if (ob.ar) {
	    for (i = 0; i < ob.ar.length; i++) {
	      li_el = document.createElement("li");
	      li_el.innerHTML = ob.ar[i];
	      UL_el.appendChild(li_el);
	      if (ob.class) { addClassname(li_el, ob.class); }
	    }
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






	return {
		/*
		---------------------------------------------------------
								PUBLIC
		---------------------------------------------------------
		*/
		fillHTMLFromOb: fillHTMLFromOb,
		createButtonFromOb: createButtonFromOb,
		createSelectFromOb: createSelectFromOb,
		createInputFromOb: createInputFromOb,
		createRadioFromOb: createRadioFromOb,
		createCheckboxFromOb: createCheckboxFromOb,
		addLIsFromOb: addLIsFromOb,
		createBasicElementFromOb: createBasicElementFromOb,
		createColorPickerFromOb: createColorPickerFromOb
	};

}());
