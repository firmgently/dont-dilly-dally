
/*	All config (.conf) files must fit the following (JSON) format

	Comments are included in this README as a guide, but
	REAL CONFIG FILES MUST NOT CONTAIN ANY COMMENTS OF ANY KIND
	(or you'll get a parse error)	*/

{
	/* GOOGLE LOGIN */
	"loginStr":				"example@example.com",
	"pwdStr":				"p4ssw0rd",
	
	/* QUERYSTRING SETTINGS */
	"siteURL":				"http://www.example.com", // domain must match GWT's version including presence/lack of www
	"language":				"en", // eg. "en" etc
	"region":				null, // eg. "GB" etc, or null
	"dateFrom":				null, // "YYYYMMDD" eg. "20130928" or null
	"dateTo":				null, // "YYYYMMDD" eg. "20130928" or null
	"resultType":			null, // valid values: "WEB", "VIDEO", "MOBILE", "IMAGE", "ALL", null
	"numberOfResults":		null, // 1-2000 or null (gets capped at 2000)
	
	/* SCRAPE SETTINGS */
	"scrapeType":			"all", // valid values: "urls", "queries", "all"
	"logToFileEnabled":		true, // enables/disables logging to file (feedback is always sent to the console)
	
	// WARNING! logAllResources adds a huge amount of detail to logs
	// USE ONLY WITH LOW clickLimit, for debugging purposes. If used with a large number of clicks the
	// log file could grow to huge sizes (3 clicks with a scrapeType of "all" adds roughly 1mb to the log)
	"logAllResources":		null, // null, or "ENABLED" logs every resource sent or received
	
	/* BEHAVIOUR SETTINGS */
	"clicktimeMin_ms":		800, // shortest possible time between random clicks (milliseconds)
	"clicktimeMax_ms":		3000, // longest possible time between random clicks (milliseconds)
	"clickLimit":			3, // number of clicks to be performed per scrape type (urls/queries) 0 = unlimited (click all links)
	"loadCheck_ms":			2000 // how frequently we check to see if a page has loaded (milliseconds)
}