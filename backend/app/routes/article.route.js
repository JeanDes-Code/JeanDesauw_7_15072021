const articles = require("../controllers/article.ctrl.js");
const auth = require('../middleware/auth.middleware')

let router = require("express").Router();

router.post("/post/article", auth, articles.create);

router.get("/get/article", auth, articles.findAll);

router.get("/get/article/:id", auth, articles.findOne);

router.put("/update/article/:id", auth, articles.update);

router.delete("/delete/article/:id", auth, articles.deleteOne);

module.exports = router;