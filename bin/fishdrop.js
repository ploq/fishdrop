#!/usr/bin/env node

var prompt = require('prompt');
var program = require('commander');

var http = require("http");


function add_links(links, ns, pw, cb) {
    var data = {links: links, ns: ns, pw: pw};
    var options = {
        method: "POST",
        hostname: "fishdrop.xyz",
        port: 3000,
        path: "/api/add/",
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': JSON.stringify(data).length
        }


    };

    var http_req = http.request(options, function (http_res) {
        cb(http_res.statusCode);
    });
    http_req.write(JSON.stringify(data));
    http_req.end();
}

program.version("0.0.1")
    .usage("<links ...>")
    .option("-n, --namespace <namespace>", "Namespace for links")
    .option("-p, --password <password>", "Password for namespace")
    .parse(process.argv);

if(program.args.length < 1 || typeof program.namespace === "undefined") {
    program.help();
    return -1;
}

if (typeof program.password === "undefined") {
    prompt.get({properties: {password:{hidden:true}}}, function (err, result) {
        if (err) { return onErr(err); }
        add_links(program.args, program.namespace, result.password, function(status){
            console.log("Links added to namespace", program.namespace) ;
        });
    });
} else {
    add_links(program.args, program.namespace, program.password, function(status){
        console.log("Links added to namespace", program.namespace);
    });

}
