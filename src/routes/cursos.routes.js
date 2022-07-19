const router = require("express").Router();
const {
  ListarCursos,
  deleteCurso,
  editCurso,
  renderEditCurso,
  saveCurso,
} = require("../controllers/cursosController");

router.get("/cursos", ListarCursos);

router.post("/cursos/add", saveCurso);

router.get("/cursos/edit/:id", renderEditCurso);
router.post("/cursos/edit/:id", editCurso);

router.get("/cursos/delete/:id",deleteCurso);

module.exports = router;
