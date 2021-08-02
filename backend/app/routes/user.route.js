const user = require("../controllers/user.ctrl.js");
const auth = require("../middleware/auth.middleware");
let router = require("express").Router();

router.post("/post/signup", user.signup);

router.post("/post/login", user.login);

router.get("/get", auth, user.getOne);

router.put("/put", auth, user.modify);

router.delete("/delete", auth, user.delete);

module.exports = router;