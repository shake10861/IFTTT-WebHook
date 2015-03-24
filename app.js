var port = 80;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var webhook = require('express-ifttt-webhook');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(webhook(function (json, done) {
    fs.writeFile("./IFTTT_IN.txt", JSON.stringify(json, null, 2));
    done();
}));


var router = express.Router();
router.get("/", function (req, res) {
    res.json({ message: "This REST service is online." });
});

app.use("/api", router);

app.listen(port);
console.log("Magic happens on port " + port);
