/*
This contains the functions to process the input and allocate the workers to the working shifts

Author
Name: Lim Wei Cheng
Email: wclim@outlook.com
*/

var workShift = {
	MONDAY: 	new Array(),
	TUESDAY: 	new Array(),
	WEDNESDAY: 	new Array(),
	THURSDAY: 	new Array(),
	FRIDAY: 	new Array(),
	SATURDAY: 	new Array(),
	SUNDAY: 	new Array()

}

var availableWorkers = {
	MONDAY: 	new Array(),
	TUESDAY: 	new Array(),
	WEDNESDAY: 	new Array(),
	THURSDAY: 	new Array(),
	FRIDAY: 	new Array(),
	SATURDAY: 	new Array(),
	SUNDAY: 	new Array()
}

function processData(contents){
	contents = parseData(contents);
	if (contents.length > 4){
		$('#input').show();
		$('.error').show();
		$('.error').html("Error: There are more than 4 workers! Please select another input with at most 4 workers.");
		return;
	}
	var workers = new Array();
	for (var i=0; i<contents.length; i++){
		var workerInfo = removeEmptyElements(contents[i].split(/\s*[\s,]\s*/));
		var workerOffDays = getOffDays(workerInfo);
		var workerName = workerInfo[0];
		var curWorker = new worker(workerName, workerOffDays);
		addWorkerAvailability(curWorker);
		workers.push(curWorker);
	}
	allocateWork(workers);
	printToScreen(workShift, workers);
}

function parseData(contents){
	contents = contents.split("=");
	contents = contents[contents.length-1].split("\n");
	
	return removeEmptyElements(contents);
}

function isEmptyString(str){
	if (!str.trim()){
		return true;
	}
	return false;
}

function removeEmptyElements(input){
	var output = new Array();
	for (var i=0; i<input.length; i++){
		if(!isEmptyString(input[i])){
			output.push(input[i]);
		}
	}
	return output;
}

function getOffDays(info){
	var output = new Array();
	for (var i=1; i<info.length; i++){
		output.push(info[i]);
	}
	return output;
}

function addWorkerAvailability(worker){
	for (var j in availableWorkers){
		availableWorkers[j].push(worker);
	}
	for (var i=0; i<worker.offDays.length; i++){
		for (var j in availableWorkers){
			if (j.toUpperCase() == worker.offDays[i].toUpperCase()){
				var index = availableWorkers[j].indexOf(worker);
				if (index > -1){
					availableWorkers[j].splice(index,1);
				}
			}
		}
	}
}

function allocateWork(workers){
	for (var i in availableWorkers){
		switch(i) {
		    case "MONDAY":
		    	setWorkers(2, i);
		        break;
		    case "TUESDAY":
		    	setWorkers(2, i);
		        break;
		    case "WEDNESDAY":
		    	setWorkers(2, i);
		        break;
		    case "THURSDAY":
		    	setWorkers(2, i);
		        break;
		    case "FRIDAY":
		    	setWorkers(2, i);
		        break;
		    case "SATURDAY":
		    	setWorkers(3, i);
		        break;
		    case "SUNDAY":
		    	setWorkers(3, i);
		        break;
		    default:
		        console.log("This message should not appear, if it ever appears, it is bad news.");
		}
	}
}

function setWorkers(workersNeeded, day){
	if (availableWorkers[day].length < workersNeeded){
		return;
	}else{
		var curAvailableWorkers = availableWorkers[day];
		while(workersNeeded > 0){
			var curWorker = curAvailableWorkers[Math.floor(Math.random() * curAvailableWorkers.length)];
			workShift[day].push(curWorker);
			curWorker.workingDays.push(day);
			var index = curAvailableWorkers.indexOf(curWorker);
			if (index > -1){
				curAvailableWorkers.splice(index,1);
			}
			workersNeeded--;
		}
	}
}