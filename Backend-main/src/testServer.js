//express.js api server
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.json());
//declare the main lists so they can be accesssed between functions
let masterServerList = [];
let masterDBList = [];

//input function (post requests to /servers)
app.post('/servers', function(request, response){
  var reqData = (request.body);     //store the request body
  response.send("data received");
    reqData.Servers.forEach(function(server){
      //check if the VM is already in the list
    if (masterServerList.some(existingServer => existingServer.VMName === server.VMName)){
        console.log(server.VMName + " already exists in masterServerList");
        //check if the last check in time is newer
       var curServer = masterServerList.find(existingServer => existingServer.VMName === server.VMName);
        if (server.LastCheckInTime > curServer.LastCheckInTime){
          console.log(server.VMName + " has a newer check in time. Updating its attributes.");
          //update masterServerList with newer attributes
          curServer.LastCheckInTime = server.LastCheckInTime;
          curServer.IP = server.IP;
          curServer.HyperVisor = server.HyperVisor;
          curServer.Hostname = server.Hostname;
        }
      } 
    else {
        masterServerList.push(server);
      }
  });
  
  console.log(masterServerList);
  console.log("the masterServerList has " + masterServerList.length + " servers.");
});
//output function (get requests to /servers)
app.get('/servers', (req, res) => {
  console.log(req.get("User-Agent"));
  res.json(masterServerList);
});
//input function (post requests to /databases)
app.post('/databases', function(request, response){
  var reqData = (request.body); // store the request body
  response.send("data received");
  
  reqData.forEach(function(db){
    // check if the database is already in the list
    if (masterDBList.some(existingDB => existingDB.database_id === db.database_id)){
      console.log(db.name + " is already in the masterDBList");
      
      // find the matching database in masterDBList
      var matchDB = masterDBList.find(existingDB => existingDB.database_id === db.database_id);
      
      // combine the sizes
      matchDB.size += db.size;
    } else {
      masterDBList.push(db);
    }
  });
  
  console.log(masterDBList.length);
  
});

app.get('/databases', function(request, response){
  response.json(databases);
});



app.listen(6284);