const router = require("express").Router();
const {
  deleteAula,
  editAula,
  listarAulas,
  renderEditAula,
  saveAula,
} = require("../controllers/aulasController");

router.get("/aulas",listarAulas);

router.post("/aulas/add",saveAula);

router.get("/aulas/edit/:id",renderEditAula);
router.post("/aulas/edit/:id",editAula);

router.get("/aulas/delete/:id",deleteAula);

module.exports = router;
