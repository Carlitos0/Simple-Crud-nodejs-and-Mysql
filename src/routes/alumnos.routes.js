const router = require("express").Router();
const {
  deleteAlumno,
  listarAlumnos,
  renderEditAlumno,
  saveAlumno,
  editAlumno,
} = require("../controllers/alumnosController");

router.get("/alumnos/", listarAlumnos);

router.post("/alumnos/add", saveAlumno);

router.get("/alumnos/edit/:id", renderEditAlumno);
router.post("/alumnos/edit/:id", editAlumno);

router.get("/alumnos/delete/:id", deleteAlumno);

module.exports = router;
