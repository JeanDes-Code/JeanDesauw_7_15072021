const express = require("express");
const cors = require("cors");
const app = express();

const article = require("./app/routes/article.route");
const commentaires = require("./app/routes/commentaire.route")
const auth = require("./app/routes/user.route")
const like = require("./app/routes/like-article.route")

//Réglages CORS
app.use(cors());

//Parse les éléments de type application/json
app.use(express.json());

//Parse les éléments de type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));
app.use('/api', article);
app.use('/api/auth', auth);
app.use('/api/commentaires', commentaires);
app.use('/api/like', like);


// Config du port sur lequel joindre le serveur
app.listen(3001, () => {
  console.log("running on port 3001");
});
