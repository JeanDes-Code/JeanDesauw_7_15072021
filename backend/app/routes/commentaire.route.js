const commentaires = require("../controllers/commentaire.ctrl.js");
let router = require("express").Router();

router.post("/post/:id", commentaires.create);

router.get("/get/:id", commentaires.findAll);

router.put("/put/:id", commentaires.update);

router.delete("/delete/:id", commentaires.deleteOne);

module.exports = router