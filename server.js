// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:dat", function (req, res) {
    const request_string = req.params.dat;
    const is_natural = /^\w{3,7} ?\d{1,2}(, | |,)(\d{2}|\d{4})$/i.test(request_string);
    const is_unix = /^\d{10}$/.test(request_string);
    
    if ((!is_natural && !is_unix) || request_string.length === 0) {
        res.writeHead(422, {'Content-type': 'text/plain'});
        res.end("Unrecognized natural language or unix time format");
    }
  
    let res_object = {};
    if (is_natural) {
        res_object.natural = request_string;
        res_object.unix = getUnix(request_string);
    } else {
        res_object.unix = request_string;
        res_object.natural = parseNatural(request_string);
    }
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end(JSON.stringify(res_object));
});

function getUnix (natural) {
    const date = new Date(natural);
    return date.getTime() / 1000;
}

function parseNatural(unix) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date(unix * 1000);
    let string = monthNames[date.getMonth()] + " ";
    string += date.getDate() + ", ";
    string += date.getFullYear();
    return string;
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});