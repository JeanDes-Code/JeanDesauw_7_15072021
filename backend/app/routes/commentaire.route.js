const commentaires = require("../controllers/commentaire.ctrl.js");
const auth = require('../middleware/auth.middleware')
let router = require("express").Router();

const middleware = require('../middleware/joi-validation.middleware')
const schemas = require('../schemas/joi-validation.schemas')

router.post("/post/:id", auth, middleware(schemas.commentSchema), commentaires.create);

router.get("/get/:id", auth, commentaires.findAll);

router.get("/get", auth, commentaires.findEverything);

router.put("/put/:articleId/:id", auth, middleware(schemas.commentSchema) ,commentaires.update);

router.delete("/delete/:articleId/:id",auth ,commentaires.deleteOne);

module.exports = router