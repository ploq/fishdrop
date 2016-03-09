var mongodb = require('mongodb');
var sjcl = require("sjcl");

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/vulink';


module.exports.add = function(links, cb) {
    module.exports.links.insert(links, cb);
};

module.exports.gen_test = function(ns, cb) {
  module.exports.links.find({ns: ns, test: true}).toArray(cb);
};

module.exports.ns_exists = function(ns, cb) {
    module.exports.links.find({ns: ns}).toArray(function (err, docs){
        if (docs.length === 0) {
            cb(false);
        } else {
            cb(true);
        }
    });
};

module.exports.ns_get = function(ns, cb) {
    module.exports.links.find({ns: ns, test: {$exists: false}}).toArray(cb);
};

module.exports.ns_add = function(ns, pw) {
    module.exports.links.insert({ns: ns, test: true, link: sjcl.encrypt(pw, "test_data_to_be_decrypted")});
};

module.exports.init = function (onErrorCB) {
    MongoClient.connect(url, function(err, db) {
        module.exports.db = db;
        db.collection('links', function(err, coll){
            if(err) {
                onErrorCB(err);
            } else {
                module.exports.links = coll;

                onErrorCB(err);
            }
        });
    });
};
