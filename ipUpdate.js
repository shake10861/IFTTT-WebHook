var cfg = require('./config');
var http = require('http');
var request = require('request');

exports.doit = function () {
	var req = http.request({
		hostname: 'jsonip.com'
	}, function (res) {
		ipAddr = "";
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			ipAddr += chunk;
		});
		res.on('end', function () {
			var myCurrentIP = JSON.parse(ipAddr).ip;
			
			//console.log("IP: " + myCurrentIP);

			// Post this to jakeanderson.net/homeip.php
			request.post(
			    cfg.ipUpdate.host,
			    {form: {secret: cfg.ipUpdate.secret, newip: myCurrentIP}},
			    function (error, response, body) {
			        if (!error && response.statusCode == 200) {
			            console.log(body);
			        }
			    }
			);
		});
	});
	req.end();
};