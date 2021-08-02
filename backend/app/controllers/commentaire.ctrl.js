const db = require("../config/db.config");

//CREATE a Comment
exports.create = (req, res) => {
  const userId = req.res.locals.userId;
  const commentaireContent = req.body.commentaire;
  const username = req.res.locals.username;
  const articleId = req.params.id;
  let createTable = "CREATE TABLE IF NOT EXISTS Commentaires (id INT UNSIGNED NOT NULL AUTO_INCREMENT, commentaire TEXT NOT NULL, author VARCHAR(45) NOT NULL, userId INT UNSIGNED NOT NULL, articleId INT UNSIGNED NOT NULL, PRIMARY KEY (id))"
  let sqlInsert = "INSERT INTO Commentaires (commentaire, author, userId, articleId) VALUES (?,?,?,?)";

  db.query(createTable, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table commentaire créée ou déjà existante !")
    }
    db.query(sqlInsert, [commentaireContent, username, userId, articleId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const newComment = {
          id: result.insertId,
          commentaire: commentaireContent,
          author: username,
          author_userId : userId
        };
        console.log("Le nouveau commentaire : ", newComment, " a été publié ")
        res.status(201).send(newComment);
      }
    })
  })
};

//READ all Comments
exports.findAll = (req, res) => {
  const articleId = req.params.id;
  let commentSelect = "SELECT * FROM commentaires WHERE articleID = ?";

  db.query(commentSelect, [articleId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Commentaires lu avec succès")
      res.status(200).send(result);
    }
  });
};

exports.findEverything = (req, res) => {
  let sqlSelect = "SELECT * FROM commentaires";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Tous les commentaires lu avec succès")
      res.status(200).send(result);
    }
  });
}

//UPDATE a Comment
exports.update = (req, res) => {
  const commentId = req.params.id;
  const commentContent = req.body.commentaire;

  let sqlUpdate = "UPDATE commentaires SET commentaire = ? WHERE id = ?";

  db.query(sqlUpdate, [commentContent, commentId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Commentaire modifié !");
    }
    res.status(200).send(result);
  });
};

//DELETE a Comment
exports.deleteOne = (req, res) => {
  console.log(req.params)
  const commentId = req.params.id;
  let sqlDelete = "DELETE FROM commentaires WHERE id = ?";

  db.query(sqlDelete, [commentId], (err, result) => {
    if (err) {
      console.log("ERREUR");
    } else {
      console.log("Commentaire supprimé !");
      res.status(200).end()
    }
  });
};
