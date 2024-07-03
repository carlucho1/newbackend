var express = require("express");
var router = express.Router();
var db = require("../bin/db");

/* GET tablaautos -- Obtengo tablaautos en formato JSON en el Front End */
router.get("/tablaautos", function (req, res, next) {
    let query = "select * from tablaautos";
    db.query(query, function (error, results, fields) {
        if (error) throw error;
        res.json({data: results});
        console.log(results);
    });
});

/* GET tablaimages -- Obtengo tablaimages en formato JSON en el Front End */
router.get("/tablaimages", function (req, res, next) {
  let query = "select * from autosimages";
  db.query(query, function (error, results, fields) {
    if (error) throw error;
    res.json({ data: results });
    console.log(results);
  });
});

/* GET home page -- Renderizo la tabla de la sección 3 y las fotos de la sección 4 */
router.get("/", function (req, res, next) {
  // let query1 = "SELECT * FROM tablaautos"; -- Esto estaba mal porque me traía todo y desbordaba la tabla, lo solucioné poniendo un límite de traer sólo 10 filas (ver query1) ---

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

router.post("/tablaautos", function (req, res, next) {
 
  let query = 'insert into tablaautos (marca, modelo, año, precio, color) values("' + req.body.marca + '","' + req.body.modelo + '",' + req.body.año + ',' + req.body.precio + ',"' + req.body.color + '")';

  db.query(query, function (error, results, fields) {
    if (error) throw error;
    res.json({ data: results });
    console.log(req.body);
    console.log(results);
  });
});



module.exports = router;
