var cfg = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var webhook = require('express-ifttt-webhook');
var ipUpdate = require('./ipUpdate');
var fs = require('fs');

// updates the IP when the server is started.
ipUpdate.doit();
// Every hour, it updates the IP address on
// http://jakeanderson.net/homeip.php 
setTimeout(function () {
	ipUpdate.doit();
}, 3600000);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
    IFTTT WEBHOOKS
*/
app.use(webhook(function (json, done) {
	var newFileName = new Date().getTime();
    fs.writeFile("./IFTTT_MSGS/" + newFileName + ".json", JSON.stringify(json, null, 2));

    // Check for Tags telling me what to do...
    // if (json.hasOwnProperty("tags") && json.tags.hasOwnProperty("string")) {
    // 	if (json.tags.indexOf("SaveMyInstagramPhoto") !== -1) {
    // 		SaveMyInstagramPhoto(json);
    // 	}
    // }

    done();
}));


var SaveMyInstagramPhoto = function (json) {
	console.log("New Instagram Photo!");
	if (json.hasOwnProperty("description")) {
		console.log(json.description);
	}
};



var router = express.Router();
router.get("/", function (req, res) {
    res.json({ message: "This REST service is online." });
});

app.use(router);
app.use("/api", router);

app.listen(cfg.server.port);
console.log("Magic happens on port " + cfg.server.port);