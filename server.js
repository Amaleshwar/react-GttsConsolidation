var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
app.use(fileUpload());
var cors = require('cors');
app.use(cors());
var path = require('path');
var fs = require('fs');

var sql = require("mssql");
var nodemailer = require('nodemailer');
// require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
//login to mail
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mail2giridharsai@gmail.com',
    pass: 'Savechanges@@123'
  }
});

var mailsent =false;
setInterval(()=>{
  var date = new Date();
  var day = date.getDay();
  var time = date.getHours()
  if(day===5&& time ===18){
    if(mailsent===false){
      console.log(day,time);
      gttssendremindermail();
      mailsent=true;
    }
    else{
      console.log("mail already sent, don't send mail");
      if(time ===19){
        mailsent=false;
      }
    }
  }
          },3600000);
function gttssendremindermail(){ 

  let filename = "EmployeeData";
  var dropoffLocation = '/Files/';
  var filePath = __dirname + dropoffLocation + filename + '.json';


    var jsondata = fs.readFileSync(filePath);
    var mailids = JSON.parse(jsondata).Employee.map((emp)=>{ return emp.EmpMail });
   // console.log(mailids);
   console.log(mailids.join(';'));

  var mailOptions = {
    from: 'mail2giridharsai@gmail.com',
    to: mailids.join(';'),
    subject: 'GTTS Reminder',
    html: '<h1> GTTS Reminder </h1><p> Please fill GTTS, ignore if filled</p>'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      console.log("unable to send otp");
    } else {
      console.log('Email sent: ' + info.response);
    }
  });    

  return;
}


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

// edite on 7/2/2020 --- adding authentication
app.post('/getempdata', function (req, res) {

  let filename = req.body.filename.trim();
  var dropoffLocation = '/Files/';
  var filePath = __dirname + dropoffLocation + filename + '.json';
  try {

    var jsondata = fs.readFileSync(filePath);
   
     //chatdata = chatdata.toString().replace(/,\s*$/, "");
    // console.log("filename ", jsondata)
     res.send( jsondata );
  }
  catch{
    console.log("empty")
   res.send( jsondata );
  }


});

app.post('/sendotp', function (req, res) {

  let empname = req.body.empname.trim();
  let Mailid =  req.body.empmailid.trim();


  try {
    const Otp = Math.floor(100000 + Math.random() * 900000);

    var mailOptions = {
      from: 'mail2giridharsai@gmail.com',
      to: Mailid,
      subject: 'GTTS Login OTP',
      html: '<h1>'+Otp+'</h1><p> OTP Expires in 2 minutes. Please Hurry!</p>'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.send("unable to send otp");
      } else {
        console.log('Email sent: ' + info.response);
        res.send(Otp.toString());
      }
    });     
  }
  catch(error){
    console.log(error)
    res.send("unable to send otp");
  }


});

app.listen(8002, function () {
  console.log('App running on port 8002');
});

