var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.evn.PORT || 80;

var router = express.Router();

router.get("/", function (req, res) {
    res.json({ message: "This REST service is online." });
});

app.use("/api", router);

app.listen(port);
console.log("Magic happens on port " + port);