const like = require("../controllers/like-article.ctrl");
const auth = require("../middleware/auth.middleware");
let router = require("express").Router();

router.post("/", auth, like.create);

router.get("/:articleId", auth, like.get);

router.delete("/", auth, like.delete);

module.exports = router