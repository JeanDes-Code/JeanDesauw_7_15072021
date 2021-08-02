const db = require("../config/db.config");
const fs = require('fs');

const getFileName = require('../utils/getFileName.utils')
//CREATE an Article
exports.create = (req, res) => {

  const userId = req.res.locals.userId;
  const username = req.res.locals.username;
  const articleTitle = req.body.title;
  const articleContent = req.body.content;
  const articleFile = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

  const sqlCreate = "CREATE TABLE IF NOT EXISTS Articles (id INT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR(45) NOT NULL, content TEXT NOT NULL, author VARCHAR(45) NOT NULL, userId INT UNSIGNED NOT NULL,  file CHAR(120) NULL ,PRIMARY KEY (id))"
  const sqlInsert =
    "INSERT INTO articles (title, content, author, userId, file) VALUES (?,?,?,?,?)";

  db.query(sqlCreate, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table Article créée ou déjà existante !")
    }
    db.query(
      sqlInsert,
      [articleTitle, articleContent, username, userId, articleFile],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const newArticle = {
            id: result.insertId,
            title: articleTitle,
            content: articleContent,
            author: username,
            author_userId: userId,
            articleFile: articleFile
          };
          console.log("Article créé !")
          res.status(201).send(newArticle)
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
      console.log("Articles récupérés !")
      res.status(200).send(result);
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
      res.status(200).send(data);
    }
  });
};

//UPDATE an Article
exports.update = (req, res) => {
  const articleId = req.params.id;
  const articleTitle = req.body.title;
  const articleContent = req.body.content;
  const articleFile = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;
  const sqlSelectOne = "SELECT file FROM articles WHERE id = ?"
  const sqlUpdate = "UPDATE articles SET title = ?, content = ?, file = ? WHERE id = ?";
  db.query(sqlSelectOne, articleId, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      getFileName(result)
      if (filename !== "nofile") {
        fs.unlink(`./uploads/${filename}`, () => {
        console.log("image : ", filename, "supprimée !")
      })
  }} 
    db.query(
      sqlUpdate,
      [articleTitle, articleContent, articleFile, articleId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Article modifié !");
          res.status(200).end();
        }
      }
  );
  })
};

//DELETE an Article
exports.deleteOne = (req, res) => {
  const articleId = req.params.id;
  const sqlSelectOne = "SELECT file FROM articles WHERE id = ?"
  const sqlDelete = "DELETE FROM articles WHERE id = ?";
  const sqlDeleteComs = "DELETE FROM commentaires WHERE articleId = ?"
  const sqlDeleteLikes ="DELETE FROM Article_Like WHERE articleId = ? "
  db.query(sqlSelectOne, articleId, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if(result) {
        getFileName(result)
      }
      fs.unlink(`./uploads/${filename}`, () => {
        console.log("image : ", filename, "supprimée !")
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
            db.query(sqlDeleteLikes, articleId, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Likes associés à l'article supprimés !")
                res.status(200).end()
              }
            })
          })
        });
      })
    }
    
  })
};
