/*
This contains the worker class

Author
Name: Lim Wei Cheng
Email: wclim@outlook.com
*/

var worker = function (workerName, offDays) {
  this.workerName = workerName;
  this.offDays = offDays;
  this.workingDays = new Array();
};