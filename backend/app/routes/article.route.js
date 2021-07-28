const articles = require("../controllers/article.ctrl.js");
const auth = require('../middleware/auth.middleware')
const multer = require('../middleware/multer-config')

let router = require("express").Router();

router.post("/post/article", auth, multer, articles.create);

router.get("/get/article", auth, articles.findAll);

router.get("/get/article/:id", auth, articles.findOne);

router.put("/update/article/:id", auth, multer, articles.update);

router.delete("/delete/article/:id", auth, articles.deleteOne);

module.exports = router;