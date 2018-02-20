/* File: browser_action.js
 * -----------------------
 * This javascript file listens for a click on the submit
 * button, and responds by saving the current value of the
 * textarea to Chrome's local storage. You shouldn't have to
 * change this file unless you also change the corresponding
 * browser_action.html file.
 */

// Saves settings to chrome.storage.local.
function save_settings() {
	var $textarea = document.getElementById('settings');
	var text = $textarea.value;
	chrome.storage.local.set({
		'settings': text
	}, function() {
		// This code block is executed when the settings are saved.
		var $status = document.getElementById('status');
		$status.textContent = "Settings saved.";
		setTimeout(function() {
		  status.textContent = '';
		}, 1000);
	});
}

// Retrieves settings from chrome.storage.local.
function restore_settings() {
	chrome.storage.local.get('settings', function(response) {
		var text = response.settings || "";
		document.getElementById('settings').value = text;
	});
}

// Clear all settings in chrome.storage.local
function clear_settings() {
	chrome.storage.local.clear(function() {
		var $textarea = document.getElementById('settings');
		$textarea.value = "";
		var $status = document.getElementById('status');
		$status.textContent = "Settings cleared.";
		setTimeout(function() {
		  status.textContent = '';
		}, 1000);
	});
}

// Restore settings when the DOM loads
document.addEventListener('DOMContentLoaded', restore_settings);
// Save settings when the save button is clicked.
document.getElementById('send').addEventListener('click', sendmessage);
// Clear settings when the clear button is clicked.
function sendmessage(){

	var content = JSON.stringify({"message": document.getElementById("settings").value});

	$.ajax({
  	url: "http://localhost:8000",
  	type: "POST",
  	data: content,
  	success: function(d,status,XHR){
 		console.log(d) 
  	}
  })}
  function getmessage(){
  	$.ajax({
  		url: "http://localhost:8000",
  		type: "GET",
  		success: function(d,status,XHR){
  			var u = d.slice(1, -1) //Take off the brackets
  			var q = u.replace(/['"]+/g, '') //takes off the quotation marks
  			var r = q.split(",").join("<br />") //Break the array at commas
 			document.getElementById("messages").innerHTML = r //originally d


 		}
  	
  	})
  }

	getmessage();
  	setInterval(function() {getmessage()}, 2000);



  
	