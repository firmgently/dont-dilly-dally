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

	/* -------------------------------------------------------------------------------
		declare / init vars
	---------------------------------------------------------------------------------- */

	// var
	// constants

	// variables


	// methods

	// ;



	// create local references to public methods from FGUtils
	// (saves typing/less verbosity)
	for (var prop in uk.co.firmgently.FGUtils) {
		this[prop] = uk.co.firmgently.FGUtils[prop];
	}


	/* -------------------------------------------------------------------------------
		general helpers
	---------------------------------------------------------------------------------- */

	logMsg("HELLOh");


	return;


// 'this' is undefined because of "use strict",
// calling the function with .call(this) fixes it
}).call(this);
