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
