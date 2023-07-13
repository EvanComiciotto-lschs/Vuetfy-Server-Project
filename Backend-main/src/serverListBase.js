const { request } = require("express");

var serverArray = {};

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

var data = require("./jWertsDataOne.json");
data.Servers.forEach(Server => makeServerArray(Server.VMName, Server.LastCheckInTime));


data = require("./AISHQVHS14_output.json");
data.Servers.forEach(Server => makeServerArray(Server.VMName, Server.LastCheckInTime));

var data = require("./jWertsDataTwo.json");
data.Servers.forEach(Server => makeServerArray(Server.VMName, Server.LastCheckInTime));

printData();


