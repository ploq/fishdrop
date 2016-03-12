var express = require("express");
var path = require("path");

module.exports = (function(){
    'use strict';
    var index = express.Router();
    index.get("/", function(req,res) {
        res.sendFile(path.join(__dirname, "..", "static", "index.html"));
    });
    index.get("/ns/:namespace?", function(req,res) {
        console.log(req.params.namespace);
        if(typeof req.params.namespace !== "undefined") {
            res.sendFile(path.join(__dirname, "..", "static", "namespace.html"));
        }
    });
    return index;
})();
