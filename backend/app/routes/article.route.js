const articles = require("../controllers/article.ctrl.js");
const auth = require("../middleware/auth.middleware");
const multer = require("../middleware/multer-config");

const middleware = require("../middleware/joi-validation.middleware");
const schemas = require("../schemas/joi-validation.schemas");

let router = require("express").Router();

router.post(
  "/post/article",
  auth,
  multer,
  middleware(schemas.articleSchema),
  articles.create
);

router.get("/get/article", auth, articles.findAll);

router.get("/get/article/:id", auth, articles.findOne);

router.put(
  "/update/article/:id",
  auth,
  multer,
  middleware(schemas.articleSchema),
  articles.update
);

router.delete("/delete/article/:id", auth, articles.deleteOne);

module.exports = router;
