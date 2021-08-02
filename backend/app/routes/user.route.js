const user = require("../controllers/user.ctrl.js");
const auth = require("../middleware/auth.middleware");
let router = require("express").Router();

const middleware = require('../middleware/joi-validation.middleware')
const schemas = require('../schemas/joi-validation.schemas')


router.post("/post/signup", middleware(schemas.userSignUpSchema), user.signup);

router.post("/post/login",middleware(schemas.userLoginSchema), user.login);

router.get("/get", auth, user.getOne);

router.put("/put", auth, user.modify);

router.delete("/delete", auth, user.delete);

module.exports = router;