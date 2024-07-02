var express = require("express");
var router = express.Router();
var db = require("../bin/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  // let query1 = "SELECT * FROM tablaautos"; -- Esto estaba mal porque me traía todo y desbordaba la tabla ---

  let query1 = "SELECT * FROM tablaautos ORDER BY id DESC LIMIT 10";
  let query2 = "SELECT * FROM autosimages";

  db.query(query1, (err, results1) => {
    if (err) throw err;

    db.query(query2, (err, results2) => {
      if (err) throw err;

      res.render("index", {data1: results1, data2: results2});
    });
  });
});

module.exports = router;
