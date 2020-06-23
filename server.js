var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
app.use(fileUpload());
var cors = require('cors');
app.use(cors());
var path = require('path');
var fs = require('fs');

var sql = require("mssql");

app.post('/checkfileexists', function (req, res) {

  let filename = req.body.filename.trim();
  var dropoffLocation = '/MonthlyJsonFiles/';
  var filePath = __dirname + dropoffLocation + filename + '.json';
  console.log(filePath)
  console.log(fs.existsSync(filePath));
  res.send(fs.existsSync(filePath));
});

app.post('/createjsonfile', function (req, res) {

  let filename = req.body.filename.trim();
  let jsondata = req.body.jsondata.trim();
  var dropoffLocation = '/MonthlyJsonFiles/';
  var filePath = __dirname + dropoffLocation + filename + '.json';

fs.writeFileSync(filePath,jsondata );

var file_content = fs.readFileSync(filePath);
var content = JSON.parse(file_content);
console.log(content)

  res.send(filePath);


});

app.post('/getjsondata', function (req, res) {

  let filename = req.body.filename.trim();
  var dropoffLocation = '/MonthlyJsonFiles/';
  var filePath = __dirname + dropoffLocation + filename + '.json';
  try {

    var jsondata = fs.readFileSync(filePath);
   
     //chatdata = chatdata.toString().replace(/,\s*$/, "");
     console.log("filename ", jsondata)
     res.send( jsondata );
  }
  catch{
    console.log("empty")
   res.send( jsondata );
  }


});

app.post('/updatejson', function (req, res) {

  let filename = req.body.filename.trim();
  let jsondata = req.body.jsondata.trim();
  var dropoffLocation = '/MonthlyJsonFiles/';
  var filePath = __dirname + dropoffLocation + filename + '.json';

fs.writeFileSync(filePath,jsondata );

var file_content = fs.readFileSync(filePath);
var content = JSON.parse(file_content);
console.log(content)

  res.send(filePath);


});

app.listen(8002, function () {
  console.log('App running on port 8002');
});

