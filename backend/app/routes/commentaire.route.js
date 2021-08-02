const commentaires = require("../controllers/commentaire.ctrl.js");
const auth = require('../middleware/auth.middleware')
let router = require("express").Router();

router.post("/post/:id",auth ,commentaires.create);

router.get("/get/:id",auth ,commentaires.findAll);

router.get("/get", auth, commentaires.findEverything);

router.put("/put/:articleId/:id",auth ,commentaires.update);

router.delete("/delete/:articleId/:id",auth ,commentaires.deleteOne);

module.exports = router