const like = require("../controllers/like-comment.ctrl");
const auth = require("../middleware/auth.middleware");
let router = require("express").Router();

router.post("/", auth, like.create);

router.get("/:id", auth, like.get);

router.delete("/:id", auth, like.delete);

module.exports = router