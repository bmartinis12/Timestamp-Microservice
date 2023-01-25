// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let date  = req.params.date;  
  let unixDate;
  let newDate;
  let utcDate

  let isUnix = /^\d+$/.test(date);

  if(!date) {
    newDate = new Date;
    
  } else if (date && isUnix){
    unixDate = parseInt(date);
    newDate = new Date(unixDate);
  } else if (!isUnix){
    newDate = new Date(date);
  }
  if (newDate.toString() === "Invalid Date"){
    res.json({error: "Invalid Date"});
    return;
  }

    unixDate = newDate.getTime();
    utcDate = newDate.toUTCString();
  
  res.json({
    unix: unixDate,
    utc: utcDate
  })
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
