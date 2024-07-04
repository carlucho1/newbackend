var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var db = require("../bin/db");
const fs = require("fs");

/* GET tablaautos -- Obtengo tablaautos en formato JSON en el Front End */
router.get("/tablaautos", function (req, res, next) {
  let query = "select * from tablaautos";
  db.query(query, function (error, results, fields) {
    if (error) throw error;
    res.json({ data: results });
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

      res.render("index", { data1: results1, data2: results2 });
    });
  });
});

//Ruta para insertar un registro en la tabla tablaautos
router.post("/", function (req, res, next) {
  let query =
    'insert into tablaautos (marca, modelo, año, precio, color) values("' +
    req.body.marca +
    '","' +
    req.body.modelo +
    '",' +
    req.body.año +
    "," +
    req.body.precio +
    ',"' +
    req.body.color +
    '")';

  db.query(query, function (error, results, fields) {
    if (error) throw error;
    res.json({ data: results });
    console.log(req.body);
    console.log(results);
  });
});

/* Dashboard de Productos */
router.get("/listado/", function (req, res, next) {
  // En el objeto query viene lo que se pasa por GET en línea de comandos
  if (req.query.id) {
    query = "select * from autosimages where id = " + req.query.id;
  } else {
    query = "select * from autosimages";
  }

  db.query(query, function (error, results, fields) {
    if (error) throw error;
    // res.json({data: results})
    res.render("dashboard", { data: results });
  });
});

// Formulario de alta
router.get("/alta", function (req, res, next) {
  res.render("alta");
});

// Ruta con el alta de producto
router.post(
  "/alta/",
  upload.single("urlImage"),
  async function (req, res, next) {
    // Concatenando cadenas con signo +

    let query =
      'insert into autosimages (urlImage, descripcion, precio) values("' +
      "/images/" +
      req.file.originalname +
      '","' +
      req.body.descripcion +
      '","' +
      req.body.precio +
      '")';

    // Usando template string

    // `insert into productos(nombre, descripcion,  imagen) values('${req.body.nombre}','${req.body.descripcion}','/images/${req.file.originalname}')`

    let results = await db.query(query);

    fs.createReadStream("./uploads/" + req.file.filename).pipe(
      fs.createWriteStream("./public/images/" + req.file.originalname),
      function (error) {}
    );

    res.render("finalizado", { mensaje: "Producto Ingresado Exitosamente" });
  }
);

// Ruta para editar el producto
router.get("/update/:id", function (req, res, next) {
  db.query(
    "select * from autosimages where id = " + req.params.id,
    function (error, results, fields) {
      if (error) throw error;
      // res.json({data: results})
      res.render("update", { data: results });
    }
  );
});

router.post("/update/:id",upload.single("urlImage"), async function (req, res, next) {
    // Concatenando cadenas con signo +

    let query;

if (req.file) {
  query = `update autosimages set urlImage  = '/images/${req.file.originalname}, 
  descripcion = '${req.body.descripcion}', precio = '${req.body.precio}' where id = ${req.params.id}`;

      fs.createReadStream("./uploads/" + req.file.filename).pipe(
        fs.createWriteStream("./public/images/" + req.file.originalname),
        function (error) {}
      );
    } else {
      query = `update autosimages set descripcion  = '${req.body.descripcion}', precio  = '${req.body.precio}' where id = ${req.params.id}`;
    }

    db.query(query, function (error, results, fields) {
      if (error) throw error;
      // res.json({data: results})
      res.render("finalizado", {mensaje: "El producto fue modificado exitosamente",
      });
    });
  }
);

module.exports = router;