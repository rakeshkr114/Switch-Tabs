//Written By: @Rakqesh
//Created on: July 4rd, 2018


var recent_tabs = new Array();

//Push the current tabId to the array in the begining
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	recent_tabs.push(tabs[0].id);
});
	

//Maintain the "Queue" on celection change of Tabs
chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {

	//maintain the length of queue(array) == 2
	if(recent_tabs.length > 1){
		//remove first tabId from the array
		recent_tabs.shift();
	}
	//push new tabId to the array at index 1
	recent_tabs.push(tabId);
});
	

//Execute commands on Alt+Q
chrome.commands.onCommand.addListener(function(command) {
	//jump to the tab with tabId
	chrome.tabs.update(recent_tabs[0], {active: true,highlighted: true});
});



