module.exports = (app) => {
  const articles = require("../controllers/article.ctrl.js");
  let router = require("express").Router();

  router.post("/post/article", articles.create);

  router.get("/get/article", articles.findAll);

  router.get("/get/article/:id", articles.findOne);

  router.put("/update/article/:id", articles.update);

  router.delete("/delete/article/:id", articles.deleteOne);

  app.use("/api", router);
};
