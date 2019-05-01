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
app.get("/api/timestamp//^(\d{10})$/", function (req, res) {
    console.log('in there');
    respond(new Date(req.params[1]*1000), res);
});

app.get("/api/timestamp/:dat", function (req, res) {
    respond(new Date(req.params.dat), res);
});

app.get("/api/timestamp/", function (req, res) {
    respond(new Date(), res);
});

function respond (date, res) {
    let res_object = {
        natural: date.toUTCString(),
        unix: date.getTime()
    };
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end(JSON.stringify(res_object));
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});