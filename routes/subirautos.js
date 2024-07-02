var express = require("express");
var router = express.Router();
var db = require("../bin/db");

/* POST insertar datos en tablaautos */

router.post("/", function (req, res, next) {
  res.send("Hola desde POST");
  console.log(req.body);
});

module.exports = router;
