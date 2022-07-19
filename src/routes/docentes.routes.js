const router = require("express").Router();
const {
  deleteDocente,
  editDocente,
  listarDocentes,
  renderEditDocente,
  saveDocente,
} = require("../controllers/docentesController");

router.get("/docentes",listarDocentes);

router.post("/docentes/add",saveDocente);

router.get("/docentes/edit/:id",renderEditDocente);
router.post("/docentes/edit/:id",editDocente);

router.get("/docentes/delete/:id",deleteDocente);

module.exports = router;
