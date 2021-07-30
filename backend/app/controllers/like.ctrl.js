const db = require("../config/db.config");

//CREATE
exports.create = (req,res) => {
    const articleId = req.body.articleId;
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
    const articleId = req.params.articleId
    const sqlSelect ="SELECT COUNT FROM Article_Like WHERE articleId = ?"

    db.query(sqlSelect, articleId, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log( "nombre de likes : ", result )
            res.send(result);
        }
    })
}


//DELETE

exports.delete = (req,res) => {
    const articleId = req.body.articleId;
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