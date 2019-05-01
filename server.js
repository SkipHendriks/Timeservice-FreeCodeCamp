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
app.get("/api/:", function (req, res) {
  res.json({greeting: 'hello API'});
});


var http = require('http');

var server = http.createServer(function(req, res) {
    var path = require('url').parse(req.url).path;
    path = path.slice(13, path.length);
    path = decodeURI(path);
    var is_natural = /^\w{3,7} ?\d{1,2}(, | |,)(\d{2}|\d{4})$/i.test(path);
    var is_unix = /^\d{10}$/.test(path);

    if (is_natural === true && is_unix === true) {
        throw new RegexError("Both expressions match. Path: " + path);
    }
    if ((!is_natural && !is_unix) || path.length === 0) {
        res.writeHead(422, {'Content-type': 'text/plain'});
        res.end("Unrecognized natural language or unix time format");
    }

    res.writeHead(200, {'Content-type': 'text/plain'});
    if (is_natural) {
        res.end(parseJSON(path, undefined));
    }
    if (is_unix) {
        res.end(parseJSON(undefined, path));
    }
});
server.listen(8081);

function parseJSON(natural, unix) {
    if(natural === undefined) {
        natural = parseNatural(unix);
    }
    if(unix === undefined) {
        unix = parseUnix(natural);
    }
    return JSON.stringify({'unix': unix, 'natural': natural});
}

function parseUnix (natural) {
    var date = new Date(natural);
    return date.getTime() / 1000;
}

function parseNatural(unix) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var date = new Date(unix * 1000);
    var string = monthNames[date.getMonth()] + " ";
    string += date.getDate() + ", ";
    string += date.getFullYear();
    return string;
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});