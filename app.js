var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 80;

var router = express.Router();

router.get("/", function (req, res) {
    res.json({ message: "This REST service is online." });
});

app.use("/api", router);

app.listen(port);
console.log("Magic happens on port " + port);
