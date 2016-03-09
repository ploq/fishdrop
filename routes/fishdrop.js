var express = require("express");
var path = require("path");

module.exports = (function(){
    'use strict';
    var index = express.Router();
    index.get("/",function(req,res){
        res.sendFile(path.join(__dirname, "..", "static", "index.html"));
    });
    return index;
})();
