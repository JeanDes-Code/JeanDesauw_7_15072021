const db = require("../config/db.config");

//CREATE
exports.create = (req,res) => {
    console.log(req.body)
    const articleId = req.body.ArticleId;
    const userId = req.res.locals.userId;
    const sqlCreate ="CREATE TABLE IF NOT EXISTS Article_Like (id INT UNSIGNED NOT NULL AUTO_INCREMENT, articleId INT UNSIGNED NOT NULL, userId INT UNSIGNED NOT NULL, PRIMARY KEY (id))"
    const like ="INSERT INTO Article_Like (articleId, userId) VALUES (?,?)"
    
    db.query(sqlCreate, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Table Article_Like créée ou déjà existante !")   
        }
        db.query(like, [articleId, userId], (err,result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`J'aime du ${userId} enregistré pour l'article n° ${articleId} !` )
            }
        })
    }) 
}

//READ

exports.get = (req,res) => {
    console.log(req.params)
    const articleId = req.params.articleId;
    const userId = req.res.locals.userId;
    const sqlCheck="SELECT * FROM Article_Like WHERE articleId = ? AND userId = ?"
    const sqlSelect ="SELECT COUNT(*) AS count FROM Article_Like WHERE articleId = ?";
    let alreadyLiked = false;

    /*Vérifier s'il existe déjà une ligne contenant userId et articleId
    CAS TRUE : alreadyLiked = true
    CAS FALSE : alreadyLiked = false 
    envoyer alreadyLiked au FRONT qui fera : 
    if -> alreadyLiked = true : un clic sur Like fera une requete delete
    if -> alreadyLiked = false : un clic sur Like fera une requete post
    */


    db.query(sqlCheck, [articleId, userId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("resultat du check alreadyLiked: " , result)
        }
        db.query(sqlSelect, articleId, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log( "nombre de likes : ", result )
                res.send({count: result, alreadyLiked: alreadyLiked});
            }
    })})
}


//DELETE

exports.delete = (req,res) => {
    const articleId = req.body.id;
    const userId = req.res.locals.userId;
    const sqlDelete = "DELETE FORM Article_Like WHERE articleId = ? AND userId = ?"

    db.query(sqlDelete, [articleId, userId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log( "L'utilisateur n'aime plus cet article. ")
        }
    })
}