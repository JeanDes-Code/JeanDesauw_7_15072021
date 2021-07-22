module.exports = (app) => {
  const commentaires = require("../controllers/commentaire.ctrl.js");
  let router = require("express").Router();

  router.post("/post/commentaires/?id", commentaires.create);

  router.get("/get/commentaires/?id", commentaires.findAll);

  router.put("/put/commentaires/?id", commentaires.update);

  router.delete("/delete/commentaires/?id", commentaires.deleteOne);

  app.use("/api", router);
};
