const db = require("../config/db.config");

//CREATE a Comment
exports.create = (req, res) => {
  const commentaireContent = req.body.content;
  const commentaireAuthor = req.body.author;
  const articleId = req.params.articleId;

  let sqlInsert = `INSERT INTO commentaires_${articleId} (commentaire, author) VALUES (?,?)`;

  db.query(
    sqlInsert,
    [commentaireContent, commentaireAuthor],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const newComment = {
          id: result.insertId,
          commentaire: commentaireContent,
          author: commentaireAuthor,
        };
        res.send(newComment);
      }
    }
  );
};

//READ all Comments
exports.findAll = (req, res) => {
  const articleId = req.params.id;
  let commentSelect = `SELECT * FROM commentaires_${articleId}`;

  db.query(commentSelect, (err, result) => {
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
  const articleId = req.params.articleId;
  const commentId = req.params.commentId;
  const commentContent = req.body.content;

  let sqlUpdate = `UPDATE commentaires_${articleId} SET commentaire = ? WHERE id = ?"`;

  db.query(sqlUpdate, [commentContent, commentId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Commentaire modifié !", result);
    }
    res.send(result).end();
  });
};

//DELETE a Comment
exports.deleteOne = (req, res) => {
  const articleId = req.params.articleId;
  const commentId = req.params.commentId;
  let sqlDelete = `DELETE FROM commentaires_${articleId} WHERE id = ?`;

  db.query(sqlDelete, commentId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Commentaire supprimé !");
    }
  });
};
