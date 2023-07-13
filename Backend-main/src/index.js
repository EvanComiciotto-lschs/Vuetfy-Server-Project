var express = require('express');
var app = express();


app.use(express.json());

const data = require('./AISHQVHS14_output.json');

app.post('/api', function(request, response){
var reqData = (request.body)     // your JSON
response.send("data received")
});

//output function
app.get('/servers', (req, res) => {
  res.json({
    "Status": "Running",
    "IP": "192.168.1.5",
    "LastCheckInTime": "2023-02-15T11:50:17",
    "VMName": "TestServer1",
    "HyperVisor": "TestHyperV",
    "Hostname": "TestServer1.test.local"  
  })
})

 

app.listen(3000);