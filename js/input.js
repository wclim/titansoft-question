/*
This file is to open the file dialogue and read in the text input

Assume that a valid text file will have the following contents:

Name    Off Days
========================
Alpha   Sunday, Tuesday
Bravo   Monday, Saturday
Charlie   Tuesday, Friday
Delta   Wednesday, Monday

Author
Name: Lim Wei Cheng
Email: wclim@outlook.com
*/

var fileSelector = document.createElement('input');
fileSelector.setAttribute('accept', '.txt');
fileSelector.setAttribute('type', 'file');
fileSelector.addEventListener('change', handleFileSelect, false);
$('#input').click(function(e) {  
    if (window.File && window.FileReader && window.FileList && window.Blob) {
		fileSelector.click();
    	return false;
	} else {
	  	alert('The File APIs are not fully supported in this browser.');
	}
});


function handleFileSelect(evt) {
	var f = evt.target.files[0]; 
	if (f.type == "text/plain") {
      	var r = new FileReader();
      	r.onload = function(e) { 
          	var contents = e.target.result;
        	processData(contents);
      }
      r.readAsText(f);
      $('#input').hide();
      $('.error').hide();
    } else { 
      $('#input').hide();
      $('.error').show();
      $('.error').html("Error: Invalid file");
    }
}