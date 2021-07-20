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
        }
      }
    );
};

//READ all Articles
exports.findAll = (req,res) => {
    const sqlSelect = "SELECT * FROM articles";
    db.query(sqlSelect, (err, result) => {
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
        res.send(result).end()
        console.log("Article modifié !", result)}
    });
};

//DELETE an Article
exports.deleteOne = (req, res) => {
    const articleId = req.params.id;
    const sqlDelete = "DELETE FROM articles WHERE id = ?";
  
    db.query(sqlDelete, articleId, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(204).send()
       
        console.log("Article supprimé !")
      };
    });
};