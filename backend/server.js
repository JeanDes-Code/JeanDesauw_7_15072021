const express = require("express");
const cors = require("cors");
const app = express();
const article = require("./app/routes/article.route");
const commentaires = require("./app/routes/commentaire.route")
//Réglages CORS
app.use(cors());

//Parse les éléments de type application/json
app.use(express.json());

//Parse les éléments de type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api', article);
app.use('/api/commentaires', commentaires);

// Config du port sur lequel joindre le serveur
app.listen(3001, () => {
  console.log("running on port 3001");
});
