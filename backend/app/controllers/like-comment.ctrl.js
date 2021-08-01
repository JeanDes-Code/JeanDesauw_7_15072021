const db = require("../config/db.config");

//CREATE
exports.create = (req,res) => {
    console.log(req.body)
    const commentId = req.body.commentId;
    const userId = req.res.locals.userId;
    const sqlCreate ="CREATE TABLE IF NOT EXISTS Comment_Like (id INT UNSIGNED NOT NULL AUTO_INCREMENT, commentId INT UNSIGNED NOT NULL, userId INT UNSIGNED NOT NULL, PRIMARY KEY (id), CONSTRAINT UC_likeCom UNIQUE(commentId, userId))"
    const like ="INSERT INTO Comment_Like (commentId, userId) VALUES (?,?)"
    
    db.query(sqlCreate, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Table Comment_like créée ou déjà existante !")   
        }
        db.query(like, [commentId, userId], (err,result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Le j'aime du user n° ${userId} a été enregistré pour le commentaire n° ${commentId} !` )
                res.status(201).send('item created')
            }
        })
    }) 
}

//READ

exports.get = (req,res) => {
    console.log(req.params)
    const commentId = req.params.id;
    const userId = req.res.locals.userId;
    const sqlCheck="SELECT COUNT(*) AS liked FROM Comment_Like WHERE commentId = ? AND userId = ?"
    const sqlSelect ="SELECT COUNT(*) AS count FROM Comment_Like WHERE commentId = ?";
    let alreadyLiked = false;

    /*Vérifier s'il existe déjà une ligne contenant userId et articleId
    CAS TRUE : alreadyLiked = true
    CAS FALSE : alreadyLiked = false 
    envoyer alreadyLiked au FRONT qui fera : 
    if -> alreadyLiked = true : un clic sur Like fera une requete delete
    if -> alreadyLiked = false : un clic sur Like fera une requete post
    */

    db.query(sqlCheck, [commentId, userId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const checkResult = JSON.parse(JSON.stringify(result));
            if (checkResult[0].liked >= 1) {
                alreadyLiked=true
            } else {
                alreadyLiked= false 
            }
            console.log("resultat du check alreadyLiked: " , checkResult[0].liked, "already like = ", alreadyLiked)
        }
        db.query(sqlSelect, commentId, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log( "nombre de likes : ", result[0].count )
                res.status(200).send({count: result[0].count, alreadyLiked: alreadyLiked});
            }
    })})
}


//DELETE

exports.delete = (req,res) => {
    const commentId = req.params.id;
    const userId = req.res.locals.userId;
    const sqlDelete = "DELETE FROM Comment_Like WHERE commentId = ? AND userId = ?"

    db.query(sqlDelete, [commentId, userId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log( "L'utilisateur n'aime plus ce commentaire. ")
            res.status(200).end()
        }
    })
}