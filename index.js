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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//Get the request with provided date
app.get('/api/:date?',function(req,res){
  //Use today's date if "date" variable is empty
  if(!req.params.date){
    var date = new Date();
  }else{
    let date_string = req.params.date;
    //If unix timestap (all numerical values from start to end), convert to number
    //Otherwise keep the same
    const re = /^[0-9]+$/g;
    if(re.test(date_string)){
      var date_input = Number(date_string);
    }else{
      var date_input = date_string;
    }
    //Check if valid date, if not return an error
    var date = new Date(date_input);
    console.log(date);
    if(date=="Invalid Date"){
      return res.json({error: "Invalid Date"});
    }
  }
  //convert to unix timestamp (ms)
  let unixTS = date.getTime();

  //Convert to UTC datetime
  let dateUTC = date.toUTCString();

  //Provide the reponse
  return res.json({unix: unixTS, utc: dateUTC});
});
