const router = require("express").Router();
const {
  showDevelopers,
  saveDeveloper,
  deleteDeveloper,
  editDeveloper,
  edit
} = require("../controllers/developerController");

router.get("/", showDevelopers);

router.post("/add", saveDeveloper);

router.get("/updateDeveloper/:id", editDeveloper);
router.post("/updateDeveloper/:id", edit);


router.get("/delete/:id", deleteDeveloper);

module.exports = router;
