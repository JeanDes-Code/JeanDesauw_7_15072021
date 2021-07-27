const db = require("../config/db.config");

//CREATE a Comment
exports.create = (req, res) => {
  const commentaireContent = req.body.commentaire;
  const username = req.res.locals.username;
  const articleId = req.params.id;
  let createTable = "CREATE TABLE IF NOT EXISTS Commentaires (id INT UNSIGNED NOT NULL AUTO_INCREMENT, commentaire TEXT NOT NULL, author VARCHAR(45) NOT NULL, articleId INT, PRIMARY KEY (id))"
  let sqlInsert = "INSERT INTO Commentaires (commentaire, author, articleId) VALUES (?,?,?)";

  db.query(createTable, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table commentaire créée ou déjà existante !")
    }
    db.query(sqlInsert, [commentaireContent, username, articleId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const newComment = {
          id: result.insertId,
          commentaire: commentaireContent,
          author: username,
        };
        res.send(newComment);
        console.log("Le nouveau commentaire : ", newComment, " a été publié ")
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
      res.send(result);
      console.log("Commentaires lu avec succès")
    }
  });
};

//UPDATE a Comment
exports.update = (req, res) => {
  const commentId = req.params.id;
  const commentContent = req.body.data.commentaire;

  let sqlUpdate = "UPDATE commentaires SET commentaire = ? WHERE id = ?";

  db.query(sqlUpdate, [commentContent, commentId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Commentaire modifié !");
    }
    res.send(result).end();
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
    }
  });
};
