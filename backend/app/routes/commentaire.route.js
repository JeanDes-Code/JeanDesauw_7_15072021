const commentaires = require("../controllers/commentaire.ctrl.js");
let router = require("express").Router();

router.post("/post/:id", commentaires.create);

router.get("/get/:id", commentaires.findAll);

router.put("/put/:articleId/:id", commentaires.update);

router.delete("/delete/:articleId/:id", commentaires.deleteOne);

module.exports = router