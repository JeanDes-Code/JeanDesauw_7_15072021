const db = require("../config/db.config");

//CREATE
exports.create = (req, res) => {
  console.log(req.body);
  const commentId = req.body.commentId;
  const userId = req.res.locals.userId;
  const sqlCreate =
    "CREATE TABLE IF NOT EXISTS Comment_Like (id INT UNSIGNED NOT NULL AUTO_INCREMENT, commentId INT UNSIGNED NOT NULL, userId INT UNSIGNED NOT NULL, PRIMARY KEY (id), CONSTRAINT UC_likeCom UNIQUE(commentId, userId))";
  const like = "INSERT INTO Comment_Like (commentId, userId) VALUES (?,?)";
  let ERROR;
  db.query(sqlCreate, (err, result) => {
    if (err) {
      console.log(err);
      ERROR = err;
    } else {
      console.log("Table Comment_like créée ou déjà existante !");
    }
    db.query(like, [commentId, userId], (err, result) => {
      if (err) {
        console.log(err);
        ERROR = ERROR + "|" + err;
        res.status(500).send(ERROR);
      } else {
        console.log(
          `Le j'aime du user n° ${userId} a été enregistré pour le commentaire n° ${commentId} !`
        );
        res.status(201).send("item created");
      }
    });
  });
};

//READ

exports.get = (req, res) => {
  console.log(req.params);
  const commentId = req.params.id;
  const userId = req.res.locals.userId;
  const sqlCheck =
    "SELECT COUNT(*) AS liked FROM Comment_Like WHERE commentId = ? AND userId = ?";
  const sqlSelect =
    "SELECT COUNT(*) AS count FROM Comment_Like WHERE commentId = ?";
  let alreadyLiked = false;
  let ERROR;

  db.query(sqlCheck, [commentId, userId], (err, result) => {
    if (err) {
      console.log(err);
      ERROR = err;
    } else {
      const checkResult = JSON.parse(JSON.stringify(result));
      if (checkResult[0].liked >= 1) {
        alreadyLiked = true;
      } else {
        alreadyLiked = false;
      }
      console.log(
        "resultat du check alreadyLiked: ",
        checkResult[0].liked,
        "already like = ",
        alreadyLiked
      );
    }
    db.query(sqlSelect, commentId, (err, result) => {
      if (err) {
        console.log(err);
        ERROR = ERROR + "|" + err;
        res.status(500).send(ERROR);
      } else {
        console.log("nombre de likes : ", result[0].count);
        res
          .status(200)
          .send({ count: result[0].count, alreadyLiked: alreadyLiked });
      }
    });
  });
};

//DELETE

exports.delete = (req, res) => {
  const commentId = req.params.id;
  const userId = req.res.locals.userId;
  const sqlDelete =
    "DELETE FROM Comment_Like WHERE commentId = ? AND userId = ?";

  db.query(sqlDelete, [commentId, userId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log("L'utilisateur n'aime plus ce commentaire. ");
      res.status(200).end();
    }
  });
};
