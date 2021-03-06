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
	SPINNER_REPEAT_RATE = 250, SPINNER_REPEAT_ACCEL = 1.04,
  SPINNER_CLASSNAME = "spinner", SPINNER_UPBTN_CLASSNAME = "spin-button-up", SPINNER_DOWNBTN_CLASSNAME = "spin-button-down",

  COLORPICKER_IMG_ID = "color-picker-img", COLORPICKER_CANVAS_ID = "color-picker-canvas", COLORPICKER_IMG_PATH = "/images/wheel.png",

  HELPITEM_CLASSNAME = "helpItem",

	fillHTMLFromOb,
	createButtonFromOb, createRadioFromOb, createCheckboxFromOb,
	createInputFromOb, createSpinnerFromOb, createSelectFromOb,
	createFormFromOb, createHelpItemFromOb,
	addLIsFromOb, createBasicElementFromOb, createColorPickerFromOb,

	onSpinnerStart, onSpinnerMouseUp, doSpinStep, spinnerTimer,
	onIncreaseSpinnerMouseDown, onDecreaseSpinnerMouseDown,

  onColorPickerClick, onColorPickerCanvasClick, onColorPickerClickOutside,
  onColorPickerCanvasMoveOver, onColorPickerImageLoad, colorPickerImage, colorPickerCanvas,
  colorPickerClose, colorPickerCanvasClickCount,
  colorPickerSelectedCurrent
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


  createSpinnerFromOb = function(ob) {
    var
    prop, input_el, label_el, up_el, down_el,
    innerHTML = "",
    wrapper_el = document.createElement("div"),
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    parent_el.appendChild(wrapper_el);
    input_el = document.createElement("input");
    if (ob.class) { addClassname(input_el, ob.class); }

    addClassname(wrapper_el, SPINNER_CLASSNAME);
    wrapper_el.appendChild(input_el);

		input_el.ob = ob;
		input_el.spin_ob = {};
		for (prop in ob.attributes) {
			input_el.spin_ob[prop] = ob.attributes[prop];
		}

    up_el = document.createElement("button");
    up_el.innerHTML = "&#x25B2;";
    up_el.spinner = input_el;
    addClassname(up_el, SPINNER_UPBTN_CLASSNAME);
    wrapper_el.appendChild(up_el);
    up_el.setAttribute('tabIndex', -1);
    registerEventHandler(up_el, "mousedown", onIncreaseSpinnerMouseDown);
    registerEventHandler(up_el, "touchstart", onIncreaseSpinnerMouseDown);
    registerEventHandler(up_el, "mouseup", onSpinnerMouseUp);
    registerEventHandler(up_el, "mouseout", onSpinnerMouseUp);
    registerEventHandler(up_el, "touchend", onSpinnerMouseUp);
    
    down_el = document.createElement("button");
    down_el.innerHTML = "&#x25BC;";
    down_el.spinner = input_el;
    addClassname(down_el, SPINNER_DOWNBTN_CLASSNAME);
    wrapper_el.appendChild(down_el);
    down_el.setAttribute('tabIndex', -1);
    registerEventHandler(down_el, "mousedown", onDecreaseSpinnerMouseDown);
    registerEventHandler(down_el, "touchstart", onDecreaseSpinnerMouseDown);
    registerEventHandler(down_el, "mouseup", onSpinnerMouseUp);
    registerEventHandler(down_el, "mouseout", onSpinnerMouseUp);
    registerEventHandler(down_el, "touchend", onSpinnerMouseUp);

		return input_el;
  };


	onIncreaseSpinnerMouseDown = function() {
		onSpinnerStart(this.spinner, 1);
	};


	onDecreaseSpinnerMouseDown = function() {
		onSpinnerStart(this.spinner, -1);
	};


	onSpinnerStart = function(spinner, dir) {
		spinner.isChanging = true;
		spinner.curRepeatRate = SPINNER_REPEAT_RATE;
		doSpinStep(spinner, dir);
	};


	onSpinnerMouseUp = function() {
		this.spinner.isChanging = false;
		clearTimeout(spinnerTimer);
	};


	doSpinStep = function(spinner, dir) {
		var valNew = parseInt(spinner.value) + (parseInt(spinner.spin_ob.step) * dir);
		if (isNaN(valNew)) { valNew = 0; }
		if (valNew < spinner.spin_ob.min) {
			if (spinner.spin_ob.wrapNum) {
				valNew = spinner.spin_ob.max;
			} else {
				valNew = spinner.spin_ob.min;
			}
		} else if (valNew > spinner.spin_ob.max) {
			if (spinner.spin_ob.wrapNum) {
				valNew = spinner.spin_ob.min;
			} else {
				valNew = spinner.spin_ob.max;
			}
		}
		spinner.value = valNew;
		manualEvent(spinner, "change");
		clearTimeout(spinnerTimer);
		if (spinner.isChanging) {
			spinner.curRepeatRate /= SPINNER_REPEAT_ACCEL;
			spinnerTimer = setTimeout(doSpinStep, spinner.curRepeatRate, spinner, dir);
		}
	};


  createSelectFromOb = function(ob) {
    var i, prop, select_el, label_el, option_el, clientOrJob_ob,
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
        if (clientOrJob_ob.class) { addClassname(option_el, clientOrJob_ob.class); }
        if (clientOrJob_ob.id) { addClassname(option_el, clientOrJob_ob.id); }
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
    prop, description_el, radio_el, label_el, optionID,
    optionCount = 0,
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;

    if (ob.label) {
      description_el = document.createElement("p");
      description_el.innerHTML = ob.label;
      parent_el.appendChild(description_el);
    }

    for (prop in ob.options) {
      optionID = ob.id + optionCount;
      optionCount ++;

      label_el = document.createElement("label");
      label_el.innerHTML = ob.options[prop];

      radio_el = document.createElement("input");
      if (ob.class) { addClassname(radio_el, ob.class); }


      if (ob.swapLabelPos) {
        parent_el.appendChild(radio_el);
        parent_el.appendChild(label_el);
      } else {
        parent_el.appendChild(label_el);
        parent_el.appendChild(radio_el);
      }

      radio_el.setAttribute("type", "radio");
      radio_el.id = optionID;
      radio_el.name = ob.id;
      radio_el.value = prop;
      if (prop === ob.checkIfMatched) { radio_el.checked = true; }
      label_el.htmlFor = optionID;
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
    if (ob.class) { addClassname(UL_el, ob.class); }

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
      case GUITYPE_PARA:
        elType = "p";
        break;
      case GUITYPE_SECTION:
        elType = "section";
        break;
      case GUITYPE_HEADING:
        elType = "h" + ob.heirarchy;
        break;
      case GUITYPE_SPACER:
        elType = "hr";
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
    if (ob.text) { el.innerHTML = ob.text; }

		return el;
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
    if (ob.hidden) { form_el.style.display = "none"; }

    form_el.ob = ob;

		return form_el;
  };


  createColorPickerFromOb = function(ob) {
    var
    el, label_el, 
    parent_el = (typeof ob.parent == "string") ? document.getElementById(ob.parent) : ob.parent;
    el = createElementWithId("input", ob.id);
    el.type = "checkbox";
    parent_el.appendChild(el);
    if (ob.class) { addClassname(el, ob.class); }

    label_el = document.createElement("label");
    label_el.htmlFor = ob.id;
    label_el.style.backgroundColor = ob.color;
    parent_el.appendChild(label_el);

    if (!colorPickerImage) {
      colorPickerImage = createElementWithId("img", COLORPICKER_IMG_ID);
      colorPickerImage.src = COLORPICKER_IMG_PATH;
      registerEventHandler(colorPickerImage, "load", onColorPickerImageLoad);
    }

    registerEventHandler(label_el, "mousedown", onColorPickerClick);

		return el;
  };


  onColorPickerImageLoad = function() {
    colorPickerCanvas = createElementWithId("canvas", COLORPICKER_CANVAS_ID);
    colorPickerCanvas.width = colorPickerImage.width;
    colorPickerCanvas.height = colorPickerImage.height;
    colorPickerCanvas.getContext('2d').drawImage(colorPickerImage, 0, 0, colorPickerImage.width, colorPickerImage.height);
    document.body.appendChild(colorPickerCanvas);
  };


  onColorPickerClick = function(event) {
    var xPos = event.clientX,
        yPos = event.clientY;
    
    colorPickerSelectedCurrent = event.currentTarget;
    colorPickerCanvas.style.display = "inline-block";
    
    if (xPos + colorPickerCanvas.offsetWidth > window.innerWidth) {
      xPos -= colorPickerCanvas.offsetWidth;
    }
    if (xPos < 0) {
      xPos += colorPickerCanvas.offsetWidth;
    }
    
    if (yPos + colorPickerCanvas.offsetHeight > window.innerHeight) {
      yPos -= colorPickerCanvas.offsetHeight;
    }
    if (yPos < 0) {
      yPos += colorPickerCanvas.offsetHeight;
    }

    colorPickerCanvas.style.left = xPos + "px";
    colorPickerCanvas.style.top = yPos + "px";

    colorPickerCanvasClickCount = 0;
    registerEventHandler(document.body, "click", onColorPickerCanvasClick);
    registerEventHandler(colorPickerCanvas, "mousemove", onColorPickerCanvasMoveOver);
  };


  onColorPickerCanvasClick = function(event) {
    var activeAreaClicked = false,
        pixelData = colorPickerCanvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;

    if (pixelData[3] > 0) { activeAreaClicked = true; }
    
    if (activeAreaClicked) {
      manualEvent(colorPickerSelectedCurrent.parentNode, COLORPICKER_CONFIRMEVENT_ID);
      colorPickerClose();
    } else {
      // HACK event is registered on document.body, so initial click was
      // triggering this function and making the picker close as soon as it opened
      // increment a counter so that we can ignore this first erroneous click
      if (colorPickerCanvasClickCount > 1) {
        colorPickerClose();
      }
      colorPickerCanvasClickCount ++;
    }
  };


  onColorPickerCanvasMoveOver = function(event) {
    var pixelData = colorPickerCanvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
    colorPickerSelectedCurrent.style.backgroundColor = "#" + rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
    manualEvent(colorPickerSelectedCurrent.parentNode, COLORPICKER_CHANGEEVENT_ID);
    if (pixelData[3] > 0) {
      colorPickerCanvas.style.cursor = "crosshair";
    } else {
      colorPickerCanvas.style.cursor = "default";
    }
  };


  colorPickerClose = function() {
    colorPickerCanvas.style.display = "none";
    unregisterEventHandler(document.body, "click", onColorPickerCanvasClick);
    unregisterEventHandler(colorPickerCanvas, "mousemove", onColorPickerCanvasMoveOver);
  };


  createHelpItemFromOb = function(ob) {
    var i, el, temp_el, for_el;
    el = createElementWithId("div", ob.id);
    
    document.body.appendChild(el);
    addClassname(el, HELPITEM_CLASSNAME);

    for (i = 0; i < ob.items.length; i++) {
      temp_el = document.createElement("span");
      temp_el.innerHTML = ob.items[i].text;
      el.appendChild(temp_el);
    }
    temp_el = document.createElement("div");
    addClassname(temp_el, "cover-left");


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
		createFormFromOb: createFormFromOb,
		createSpinnerFromOb: createSpinnerFromOb,
		onSpinnerStart: onSpinnerStart,
		onSpinnerMouseUp: onSpinnerMouseUp,
		onIncreaseSpinnerMouseDown: onIncreaseSpinnerMouseDown,
		onDecreaseSpinnerMouseDown: onDecreaseSpinnerMouseDown,
		doSpinStep: doSpinStep,
		createRadioFromOb: createRadioFromOb,
		createCheckboxFromOb: createCheckboxFromOb,
		addLIsFromOb: addLIsFromOb,
		createBasicElementFromOb: createBasicElementFromOb,
		createColorPickerFromOb: createColorPickerFromOb,
    createHelpItemFromOb: createHelpItemFromOb
	};

}());
