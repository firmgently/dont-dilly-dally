var uk=uk!==undefined?uk:{};uk.co=uk.co!==undefined?uk.co:{};uk.co.firmgently=uk.co.firmgently!==undefined?uk.co.firmgently:{};uk.co.firmgently.FGUtils=function(){"use strict";var addCSSRule,registerEventHandler,unregisterEventHandler,stopPropagation,hexOpacityToRGBA,createElementWithId,removeClassname,addClassname,treatAsUTC,daysBetween,logMsg;Storage.prototype.setObject=function(key,value){this.setItem(key,JSON.stringify(value))};Storage.prototype.getObject=function(key){var value=this.getItem(key);return value&&JSON.parse(value)};stopPropagation=function(e){if(e.preventDefault){e.preventDefault()}if(e.stopPropagation){e.stopPropagation()}e.cancelBubble=true;e.returnValue=false;return false};registerEventHandler=function(node,event,handler,useCapture){useCapture=useCapture===undefined?false:useCapture;if(typeof node.addEventListener==="function"){node.addEventListener(event,handler,useCapture)}else{node.attachEvent("on"+event,handler)}};unregisterEventHandler=function(node,event,handler,useCapture){useCapture=useCapture===undefined?false:useCapture;if(typeof node.removeEventListener==="function"){node.removeEventListener(event,handler,useCapture)}else{node.detachEvent("on"+event,handler)}};hexOpacityToRGBA=function(hexColour,opacity){var r,g,b;r=parseInt(hexColour.substring(0,2),16);g=parseInt(hexColour.substring(2,4),16);b=parseInt(hexColour.substring(4,6),16);return"rgba("+r+", "+g+", "+b+", "+opacity+")"};createElementWithId=function(elType,id){var el=document.createElement(elType);el.id=id;return el};removeClassname=function(element,name){element.className=element.className.replace(" "+name,"")};addClassname=function(element,name){name=" "+name;element.className=element.className.replace(name,"");element.className=element.className+name};addCSSRule=function(selector,property,newValue){logMsg("selector: "+selector);var i,curStyleSheet,totalStyleSheets=document.styleSheets.length,newStyle=property+": "+newValue;for(i=0;i<totalStyleSheets;i++){curStyleSheet=document.styleSheets[i];logMsg("curStyleSheet: "+curStyleSheet);try{curStyleSheet.insertRule(selector+" {"+newStyle+"}",curStyleSheet.cssRules.length)}catch(err1){try{curStyleSheet.addRule(selector,newStyle)}catch(err2){}}}};logMsg=function(msg){console.log(msg)};treatAsUTC=function(date){var result=new Date(date);result.setMinutes(result.getMinutes()-result.getTimezoneOffset());return result};daysBetween=function(startDate,endDate){var msPerDay=24*60*60*1e3;return(treatAsUTC(endDate)-treatAsUTC(startDate))/msPerDay};return{registerEventHandler:registerEventHandler,unregisterEventHandler:unregisterEventHandler,stopPropagation:stopPropagation,removeClassname:removeClassname,addClassname:addClassname,addCSSRule:addCSSRule,hexOpacityToRGBA:hexOpacityToRGBA,createElementWithId:createElementWithId,treatAsUTC:treatAsUTC,daysBetween:daysBetween,logMsg:logMsg}}();var uk=uk!==undefined?uk:{};uk.co=uk.co!==undefined?uk.co:{};uk.co.firmgently=uk.co.firmgently!==undefined?uk.co.firmgently:{};uk.co.firmgently.DDDConsts=function(){"use strict";var APP_ID="FGDDD",PAGETYPE_TIMESHEETS="pagetypeTimesheets",PAGETYPE_CONFIG="pagetypeConfig",PAGETYPE_JOBSANDCLIENTS="pagetypeJobsAndClients",PAGETYPE_DEFAULT=PAGETYPE_TIMESHEETS,GUITYPE_BTN="GUITypeBtn",GUITYPE_TEXTINPUT="GUITypeTextInput",GUITYPE_SELECT="GUITypeSelect",GUITYPE_FORM="GUITypeForm",GUITYPE_SECTION="GUITypeSection",GUITYPE_METHODCALL="GUITypeMethodCall",CLASS_BTNMAIN="btnMain",CLASS_FORMMAIN="formMain",TIMESHEETCONTAINER_ID="timesheetContainer",PAGEDATA_JOBSANDCLIENTS={pageTitle:"Jobs and Clients",intro:"Add, delete or edit jobs and clients on this page."},GUIDATA_JOBSANDCLIENTS=[{type:GUITYPE_BTN,id:"createCompanyBtn",class:CLASS_BTNMAIN,label:"Create new company",method:"createCompany",parentID:"main"},{type:GUITYPE_BTN,id:"createClientBtn",class:CLASS_BTNMAIN,label:"Create new client",method:"createClient",parentID:"main",disabled:true},{type:GUITYPE_FORM,id:"createClientForm",class:CLASS_FORMMAIN,title:"Fill in client details",method:"submitClientForm",parentID:"main",hidden:false,el_ar:[{type:GUITYPE_TEXTINPUT,id:"clientNameIn",label:"Client name",parentID:"createClientForm"},{type:GUITYPE_BTN,label:"Create new",method:"submitForm",parentID:"createClientForm",disabled:true},{type:GUITYPE_SELECT,label:"Existing clients",method:"selectClient",parentID:"createClientForm",id:"selectClient",options:{opt1:"Option 1",opt2:"Option 2",opt3:"Option 3"},disabled:true}]}],PAGEDATA_TIMESHEETS={pageTitle:"Timesheets",intro:"This is where you keep track of actual work."},GUIDATA_TIMESHEETS=[{type:GUITYPE_SECTION,id:TIMESHEETCONTAINER_ID,parentID:"main"},{type:GUITYPE_METHODCALL,method:"drawTimesheets",scope:"main"}],PAGEDATA_CONFIG={pageTitle:"Configuration",intro:"Show and hide things and customise settings."},GUIDATA_CONFIG=[{type:GUITYPE_METHODCALL,method:"drawConfigGUI",scope:"main"}],DATETYPE_YYMMDD={label:"yy/mm/dd"},DATETYPE_DDMMYY={label:"dd/mm/yy"},DATETYPE_MMDDYY={label:"mm/dd/yy"},DATETYPE_DEFAULT=DATETYPE_DDMMYY,TIMESPAN_WEEK="timespanWeek",TIMESPAN_MONTH="timespanMonth",TIMESPAN_YEAR="timespanYear",TIMESPAN_DEFAULT=TIMESPAN_MONTH,DAYSINWEEK=7,DAYSINMONTH=31,DAYSINYEAR=365,TXT_STORAGE_UNSUPPORTED="Sorry - storage is not supported on this device or browser";return{APP_ID:APP_ID,PAGETYPE_TIMESHEETS:PAGETYPE_TIMESHEETS,PAGETYPE_CONFIG:PAGETYPE_CONFIG,PAGETYPE_JOBSANDCLIENTS:PAGETYPE_JOBSANDCLIENTS,PAGETYPE_DEFAULT:PAGETYPE_DEFAULT,GUITYPE_BTN:GUITYPE_BTN,GUITYPE_FORM:GUITYPE_FORM,GUITYPE_SELECT:GUITYPE_SELECT,GUITYPE_TEXTINPUT:GUITYPE_TEXTINPUT,GUITYPE_SECTION:GUITYPE_SECTION,GUITYPE_METHODCALL:GUITYPE_METHODCALL,TIMESHEETCONTAINER_ID:TIMESHEETCONTAINER_ID,PAGEDATA_JOBSANDCLIENTS:PAGEDATA_JOBSANDCLIENTS,GUIDATA_JOBSANDCLIENTS:GUIDATA_JOBSANDCLIENTS,PAGEDATA_TIMESHEETS:PAGEDATA_TIMESHEETS,GUIDATA_TIMESHEETS:GUIDATA_TIMESHEETS,PAGEDATA_CONFIG:PAGEDATA_CONFIG,GUIDATA_CONFIG:GUIDATA_CONFIG,DATETYPE_YYMMDD:DATETYPE_YYMMDD,DATETYPE_DDMMYY:DATETYPE_DDMMYY,DATETYPE_MMDDYY:DATETYPE_MMDDYY,DATETYPE_DEFAULT:DATETYPE_DEFAULT,TIMESPAN_WEEK:TIMESPAN_WEEK,TIMESPAN_MONTH:TIMESPAN_MONTH,TIMESPAN_YEAR:TIMESPAN_YEAR,TIMESPAN_DEFAULT:TIMESPAN_DEFAULT,DAYSINWEEK:DAYSINWEEK,DAYSINMONTH:DAYSINMONTH,DAYSINYEAR:DAYSINYEAR,TXT_STORAGE_UNSUPPORTED:TXT_STORAGE_UNSUPPORTED}}();var uk=uk!==undefined?uk:{};uk.co=uk.co!==undefined?uk.co:{};uk.co.firmgently=uk.co.firmgently!==undefined?uk.co.firmgently:{};uk.co.firmgently.DontDillyDally=function(){"use strict";var prop,dateDisplayStart,dateDisplaySelected,dateToday,timespanDisplay,doSetup,selectPage,drawPage,fillHTMLFromOb,drawGUIFromAr,createButtonFromOb,createFormFromOb,createTextInputFromOb,callMethodFromOb,createSelectFromOb,createSectionFromOb,drawTimesheets,drawConfigGUI;for(prop in uk.co.firmgently.DDDConsts){this[prop]=uk.co.firmgently.DDDConsts[prop]}doSetup=function(){dateDisplayStart=new Date;dateDisplaySelected=new Date;dateToday=new Date;timespanDisplay=TIMESPAN_DEFAULT;localStorage.clear();if(typeof Storage!=="undefined"){if(!localStorage.getObject(APP_ID)){localStorage.setObject(APP_ID,{pagetypeCurrent:PAGETYPE_DEFAULT})}selectPage(localStorage.getObject(APP_ID).pagetypeCurrent)}else{logMsg(TXT_STORAGE_UNSUPPORTED)}};selectPage=function(pageType){localStorage.getObject(APP_ID).pagetypeCurrent=pageType;drawPage()};drawPage=function(){switch(localStorage.getObject(APP_ID).pagetypeCurrent){case PAGETYPE_TIMESHEETS:fillHTMLFromOb(PAGEDATA_TIMESHEETS);drawGUIFromAr(GUIDATA_TIMESHEETS);break;case PAGETYPE_CONFIG:fillHTMLFromOb(PAGEDATA_CONFIG);drawGUIFromAr(GUIDATA_CONFIG);break;case PAGETYPE_JOBSANDCLIENTS:fillHTMLFromOb(PAGEDATA_JOBSANDCLIENTS);drawGUIFromAr(GUIDATA_JOBSANDCLIENTS);break;default:break}};fillHTMLFromOb=function(ob){for(var prop in ob){document.getElementById(prop).innerHTML=ob[prop]}};drawGUIFromAr=function(ar){var i,ob;for(i=0;i<ar.length;i++){ob=ar[i];switch(ob.type){case GUITYPE_BTN:createButtonFromOb(ob);break;case GUITYPE_FORM:createFormFromOb(ob);break;case GUITYPE_TEXTINPUT:createTextInputFromOb(ob);break;case GUITYPE_SELECT:createSelectFromOb(ob);break;case GUITYPE_SECTION:createSectionFromOb(ob);break;case GUITYPE_METHODCALL:callMethodFromOb(ob);break;default:break}}};createButtonFromOb=function(ob){var button_el,parent_el=document.getElementById(ob.parentID);if(ob.id){button_el=createElementWithId("button",ob.id)}else{button_el=document.createElement("button")}parent_el.appendChild(button_el);if(ob.class){addClassname(button_el,ob.class)}button_el.innerHTML=ob.label;registerEventHandler(button_el,"mousedown",ob.method);if(ob.disabled){button_el.disabled=ob.disabled}};createTextInputFromOb=function(ob){var input_el,label_el,parent_el=document.getElementById(ob.parentID);if(ob.label){label_el=document.createElement("label");label_el.innerHTML=ob.label;parent_el.appendChild(label_el);label_el.htmlFor=ob.id}if(ob.id){input_el=createElementWithId("input",ob.id);input_el.name=ob.id}else{input_el=document.createElement("input")}parent_el.appendChild(input_el);if(ob.class){addClassname(input_el,ob.class)}};createSelectFromOb=function(ob){var prop,select_el,label_el,parent_el=document.getElementById(ob.parentID);if(ob.label){label_el=document.createElement("label");label_el.innerHTML=ob.label;parent_el.appendChild(label_el);label_el.htmlFor=ob.id}if(ob.id){select_el=createElementWithId("select",ob.id);select_el.name=ob.id}else{select_el=document.createElement("select")}parent_el.appendChild(select_el);for(prop in ob.options){select_el.options[select_el.options.length]=new Option(ob.options[prop],prop)}if(ob.class){addClassname(select_el,ob.class)}registerEventHandler(select_el,"change",ob.method)};createSectionFromOb=function(ob){var el,parent_el=document.getElementById(ob.parentID);if(ob.id){el=createElementWithId("section",ob.id)}else{el=document.createElement("section")}parent_el.appendChild(el);if(ob.class){addClassname(el,ob.class)}};createFormFromOb=function(ob){var i,form_el,parent_el=document.getElementById(ob.parentID);if(ob.id){form_el=createElementWithId("form",ob.id)}else{form_el=document.createElement("form")}parent_el.appendChild(form_el);if(ob.class){addClassname(form_el,ob.class)}if(ob.el_ar){drawGUIFromAr(ob.el_ar)}if(ob.hidden){form_el.style.display="none"}};callMethodFromOb=function(ob){eval(ob.method).call(ob.scope)};for(prop in uk.co.firmgently.FGUtils){this[prop]=uk.co.firmgently.FGUtils[prop]}drawTimesheets=function(){var i,daysToDraw,isOddDay,weekdayCur,isToday,rowClassname,day_el,weekStartDay=1,parent_el=document.getElementById(TIMESHEETCONTAINER_ID),dayCur=new Date;switch(timespanDisplay){case TIMESPAN_WEEK:weekdayCur=dayCur.getDay();dayCur.setDate(dayCur.getDate()-weekdayCur+weekStartDay);daysToDraw=DAYSINWEEK;break;case TIMESPAN_MONTH:dayCur.setDate(1);daysToDraw=DAYSINMONTH;break;case TIMESPAN_YEAR:dayCur.setMonth(0);dayCur.setDate(1);daysToDraw=DAYSINYEAR;break;default:break}isOddDay=false;for(i=0;i<daysToDraw;i++){rowClassname="day ";isToday=!Math.round(daysBetween(dayCur,dateToday));if(isToday){rowClassname+="today "}if(isOddDay){rowClassname+="odd "}if(dayCur.getDay()===weekStartDay){rowClassname+="week-start "}if(dayCur.getDate()===1){rowClassname+="month-start "}day_el=document.createElement("span");parent_el.appendChild(day_el);addClassname(day_el,rowClassname);day_el.innerHTML=dayCur;dayCur.setDate(dayCur.getDate()+1);isOddDay=!isOddDay}};drawConfigGUI=function(){logMsg("DRAWING CONFIG GUI")};doSetup();return}.call(this);
//# sourceMappingURL=js/FGDontDillyDally.js.map