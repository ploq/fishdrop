var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var index = require("./routes/fishdrop");
var api = require("./routes/fishdrop_api");

var http = require("http");

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use("/", index);
app.use("/api", api);

app.use(express.static("static"));

var server = app.listen(3000, "localhost", function () {
    var host = server.address().address;
    var port = server.address().port;
});

module.exports.server = server;

