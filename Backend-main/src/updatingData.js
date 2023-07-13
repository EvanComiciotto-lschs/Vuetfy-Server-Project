const { request } = require("express");

var serverArray = {};
var data = require("./output_UTF8.json");
var repeats = 0;

function makeServerArray(hostID, currentTime){
    if(typeof serverArray[hostID] == "undefined"){
        serverArray[hostID] = currentTime;
    }else if(serverArray[hostID] < currentTime){
        serverArray[hostID] = currentTime;
    }else if(serverArray[hostID] > currentTime){
    }
}
function printData(){
    console.log('');
    console.log(serverArray);
    console.log('');
}
function infoCollection(){
    data.Servers.forEach(Server => makeServerArray(Server.VMName, Server.LastCheckInTime));
    printData();
    console.log('timed loop');
}
function changeData(){
    data = require("./output_UTF8.json");
}

infoCollection();
setTimeout(changeData, 1000);
setTimeout(infoCollection, 2000);

