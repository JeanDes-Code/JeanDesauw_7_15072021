const db = require("../config/db.config");

//CREATE an Article
exports.create = (req, res) => {
  console.log(req)
  const articleTitle = req.body.title;
  const articleContent = req.body.content;
  const articleFile = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;
  const username = req.res.locals.username;

  console.log("Images : " + articleFile)

  const sqlCreate = "CREATE TABLE IF NOT EXISTS Articles (id INT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR(45) NOT NULL, content TEXT NOT NULL, author VARCHAR(45) NOT NULL, file CHAR(120) NULL ,PRIMARY KEY (id))"
  const sqlInsert =
    "INSERT INTO articles (title, content, author, file) VALUES (?,?,?,?)";

  db.query(sqlCreate, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table Article créée ou déjà existante !")
      res.end("An error occured")
    }
    db.query(
      sqlInsert,
      [articleTitle, articleContent, username, articleFile],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const newArticle = {
            id: result.insertId,
            title: articleTitle,
            content: articleContent,
            author: username,
            articleFile: articleFile
          };
          console.log("Article créé !")
        }
      })
  });
};

//READ all Articles
exports.findAll = (req, res) => {
  const articleSelect = "SELECT * FROM articles";
  db.query(articleSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Articles récupérés !", result)
      res.send(result);
    }
  });
};

//Read one Article
exports.findOne = (req, res) => {
  const id= req.params.id;
  const username = req.res.locals.username;
  const role = req.res.locals.role
  const selectOne = "SELECT * FROM articles WHERE id= ?";

  db.query(
    selectOne, 
    [id], 
    (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Article id: ", id, "lu avec succès")
      const data = {
        result: result,
        username: username,
        role: role
      }
      res.send(data);
    }
  });
};

//UPDATE an Article
exports.update = (req, res) => {
  const articleId = req.params.id;
  const articleTitle = req.body.data.title;
  const articleContent = req.body.data.content;
  const articleFile = req.body.data.file;
  const sqlUpdate = "UPDATE articles SET title = ?, content = ? WHERE id = ?";

  db.query(
    sqlUpdate,
    [articleTitle, articleContent, articleId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Article modifié !");
      }
      res.send(result).end();
    }
  );
};

//DELETE an Article
exports.deleteOne = (req, res) => {
  const articleId = req.params.id;
  const sqlDelete = "DELETE FROM articles WHERE id = ?";
  const sqlDeleteComs = "DELETE FROM commentaires WHERE articleId = ?"

  db.query(sqlDelete, articleId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Article supprimé !");
    }
    db.query(sqlDeleteComs, [articleId], (err,result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Commentaires associés à l'article supprimés !")
      }
    })
  });
};
