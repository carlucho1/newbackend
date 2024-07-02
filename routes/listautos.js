var express = require("express");
var router = express.Router();
var db = require("../bin/db");

/* GET tablaautos */

router.get("/", function (req, res, next) {
    let query = "select * from tablaautos";
    db.query(query, function (error, results, fields) {
        if (error) throw error;
        res.json({data: results});
        console.log(results);
    });
});
module.exports = router;