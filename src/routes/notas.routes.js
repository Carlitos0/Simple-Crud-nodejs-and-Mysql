const router = require("express").Router();
const {listarNotas,verAlumnos,deleteNotas,saveNota,editNota,renderEditNota} = require("../controllers/notasController");

/* router.get("/notas",verAlumnos); */
router.get("/notas",listarNotas);

router.post("/notas/add",saveNota);

router.get("/notas/edit/:id",renderEditNota);
router.post("/notas/edit/:id",editNota);

router.get("/notas/delete/:id",deleteNotas);

module.exports = router;