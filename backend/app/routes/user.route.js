const user = require("../controllers/user.ctrl.js");
let router = require("express").Router();

router.post("/post/signup", user.signup);

router.post("/post/login", user.login);

module.exports = router;