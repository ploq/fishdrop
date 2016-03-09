var db = require("../lib/database");
var express = require('express');
var sjcl = require("sjcl");


function test_pw(pw, namespace, cb) {
    db.ns_exists(namespace, function(exists){
        if (exists) {
            db.gen_test(namespace, function(err, doc){
                try {
                    sjcl.decrypt(pw, doc[0].link);
                    cb(true);
                } catch (e) {
                    cb(false);
                }
            });
        } else {
            db.ns_add(namespace, pw);
            cb(true);
        }
    });
}

module.exports = (function(){
    'use strict';
    var api = express.Router();
    db.init(function(err){
        if(err) {
            console.log(err);
        }
        api.post("/add",function(req,res){
            var data = req.body.links;
            var pw = req.body.pw;
            var ns = req.body.ns;

            test_pw(pw, ns, function(correct){
                if (correct) {
                    var links = [];
                    for (var n = 0; n < data.length; n++) {
                        sjcl.encrypt(pw, data);
                        links.push({ns: ns, link: sjcl.encrypt(pw, data[n])});
                    }
                    db.add(links, function(err){
                        res.sendStatus(200);
                    });
                } else {
                    res.sendStatus(409);
                }
            });
        });

        api.post("/access", function(req, res){
            var pw = req.body.pw;
            var ns = req.body.ns;

            test_pw(pw, ns, function(correct) {
                if(correct) {
                    db.ns_get(ns, function(err, docs){
                        var ret_docs = docs;
                        for (var n =  0; n < ret_docs.length; n++) {
                            delete ret_docs[n]._id;
                            delete ret_docs[n].ns;
                            ret_docs[n].link = sjcl.decrypt(pw, ret_docs[n].link);
                        }
                        res.send(ret_docs);
                    });
                } else {
                    res.sendStatus(409);
                }
            })
        });
    });
    return api;
})();
