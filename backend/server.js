const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pz3YIiTtX1%:K5J',
    database: 'groupomania',
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM articles";
  db.query(sqlSelect, (err, result) => {
      if (err) {
            console.log(err)
      } else {
            res.send(result);
      }
  });
});

app.post("/api/insert", (req, res) => {
  console.log(req.body)
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
});

app.delete("/api/delete/:id", (req, res) => {
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
});

app.put("/api/update/:id", (req, res) => {
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
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
