/*
This file is to print the work shift to the browser

Author
Name: Lim Wei Cheng
Email: wclim@outlook.com
*/

function printToScreen(workShift, workers){
	$('.results').show();
	printWorkShift(workShift);
	printWorkersSchedules(workers);
}

function getDay(){
	var d = new Date();
	var weekday = new Array(7);
	weekday[0]=  "SUNDAY";
	weekday[1] = "MONDAY";
	weekday[2] = "TUESDAY";
	weekday[3] = "WEDNESDAY";
	weekday[4] = "THURSDAY";
	weekday[5] = "FRIDAY";
	weekday[6] = "SATURDAY";

	return weekday[d.getDay()];
}

function getDate(addDateCount){
	var today = new Date();
	var date = new Date(today.getTime() + addDateCount * 24 * 60 * 60 * 1000);
	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0
	var yyyy = date.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	date = dd+'/'+mm+'/'+yyyy;
	return date;
}

function printWorkShift(workShift){
	var dayQueue = [];
	var curDay = getDay();
	var curDayFound = false;
	var dateCounter = 0;
	for(var i in workShift){
		if (i != curDay && !curDayFound){
			dayQueue.push(i);
		}else{
			curDayFound = true;
			var table_data  = document.createElement('td');
			var t = document.createTextNode(i);
			table_data.appendChild(t);  
			table_data.appendChild(document.createElement("br"));
			var t = document.createTextNode(getDate(dateCounter));
			dateCounter++;
			table_data.appendChild(t); 
			var trow = document.getElementById('days');
			trow.appendChild(table_data);

			var table_data  = document.createElement('td');
			if (workShift[i].length == 0 ){
				var t = document.createTextNode("Not enough workers");
				table_data.appendChild(t); 
			}
			for (var j in workShift[i]){
				var t = document.createTextNode(workShift[i][j].workerName);
				table_data.appendChild(t); 
				table_data.appendChild(document.createElement("br"));
			}
			var trow = document.getElementById('workers');
			trow.appendChild(table_data);
		}
	}
	while (dayQueue.length > 0){
		var i = dayQueue.shift();
		var table_data  = document.createElement('td');
		var t = document.createTextNode(i);
		table_data.appendChild(t);  
		table_data.appendChild(document.createElement("br"));
		var t = document.createTextNode(getDate(dateCounter));
		dateCounter++;
		table_data.appendChild(t); 
		var trow = document.getElementById('days');
		trow.appendChild(table_data);

		var table_data  = document.createElement('td');
		if (workShift[i].length == 0 ){
			var t = document.createTextNode("Not enough workers");
			table_data.appendChild(t); 
		}
		for (var j in workShift[i]){
			var t = document.createTextNode(workShift[i][j].workerName);
			table_data.appendChild(t); 
			table_data.appendChild(document.createElement("br"));
		}
		var trow = document.getElementById('workers');
		trow.appendChild(table_data);
	}
}

function printWorkersSchedules(workers){
	for(var i in workers){
		var table_data  = document.createElement('td');
		var t = document.createTextNode(workers[i].workerName);
		table_data.appendChild(t);  
		var trow = document.getElementById('workerNames');
		trow.appendChild(table_data);

		var table_data  = document.createElement('td');
		for (var j in workers[i].workingDays){
			var t = document.createTextNode(workers[i].workingDays[j]);
			table_data.appendChild(t);  
			table_data.appendChild(document.createElement("br"));
		}
		var trow = document.getElementById('workersDays');
		trow.appendChild(table_data);
	}
}