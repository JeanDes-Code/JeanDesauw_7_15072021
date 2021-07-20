const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();


//Config BDD
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pz3YIiTtX1%:K5J',
    database: 'groupomania',
});

//Réglages CORS
app.use(cors());

//Parse les éléments de type application/json
app.use(express.json());

//Parse les éléments de type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


//Routes CRUD Articles

//On récupère tous les articles de notre base de donnée et on les renvoie vers le Client
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

//On enregistre le nouvel article dans la BDD et on renvoie cet article dans la réponse de la requête.
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

//On supprime de la BDD l'article portant l'ID fournit.
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


//On modifie dans la BDD l'article portant l'ID fournit en utilisant le nouveau titre 
//et le nouveau contenu fournit dans le corps de la requête
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



// Config du port sur lequel joindre le serveur
app.listen(3001, () => {
  console.log("running on port 3001");
});
