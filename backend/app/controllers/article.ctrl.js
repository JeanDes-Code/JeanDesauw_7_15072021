const db = require('../config/db.config');

//CREATE an Article
exports.create = (req, res) => {
    console.log(req.body) //debug
    const articleTitle = req.body.title;
    const articleContent = req.body.content;
    const articleAuthor = req.body.author;
  
    const sqlInsert =
      "INSERT INTO articles (title, content, author) VALUES (?,?,?)";
    
    db.query(sqlInsert,[articleTitle, articleContent, articleAuthor],(err, result) => {
        if (err) {
            console.log(err)
        } else {
            const newArticle = {
              id : result.insertId,
              title : articleTitle,
              content: articleContent,
              author : articleAuthor,
            }
            res.send(newArticle)
            id = newArticle.id;
        } 
        let sqlCreateCom =
        `CREATE TABLE IF NOT EXISTS commentaires_${id} (id INT UNSIGNED NOT NULL AUTO_INCREMENT, commentaire TEXT NOT NULL, author VARCHAR(45) NOT NULL, PRIMARY KEY (id))`;
        
        db.query(sqlCreateCom, (err, result) => {
          if(err) {
            console.log(err)
          } else {
            console.log(`Table Commentaires créée ! ${result}`)
          }
        })
      },

    );
};

//READ all Articles
exports.findAll = (req, res) => {
    const articleSelect = "SELECT * FROM articles";

    db.query(articleSelect, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result);
        }
    });
};

//UPDATE an Article
exports.update = (req, res) => {
    console.log("PARAMS", req.params, "BODY : ", req.body) //debug
    const articleId = req.params.id;
    const articleTitle = req.body.modifiedArticle.title;
    const articleContent = req.body.modifiedArticle.content;
    const sqlUpdate = "UPDATE articles SET title = ?, content = ? WHERE id = ?";
  
    db.query(sqlUpdate, [articleTitle, articleContent, articleId], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log("Article modifié !", result)}
        res.send(result).end()
    });
};

//DELETE an Article
exports.deleteOne = (req, res) => {
    const articleId = req.params.id;
    const sqlDelete = "DELETE FROM articles WHERE id = ?";
    const commentaireDrop = `DROP TABLE IF EXISTS commentaires_${articleId}`;
      
    db.query(commentaireDrop, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(204).send()

        console.log("Commentaires reliés à l'article supprimés !")
      }
      db.query(sqlDelete, articleId, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Article supprimé !")
        };
      });
    })
};