const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit")
const helmet = require("helmet");
const app = express();

const article = require("./app/routes/article.route");
const commentaires = require("./app/routes/commentaire.route")
const auth = require("./app/routes/user.route")
const like = require("./app/routes/like-article.route")
const likeComment = require("./app/routes/like-comment.route")

//Réglage helmet : masquer l'utilisation d'express
app.use(helmet());

//Réglage sécurité : limiter le nombre de requêtes
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

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
app.use('/api/like/comment', likeComment);


// Config du port sur lequel joindre le serveur
app.listen(3001, () => {
  console.log("running on port 3001");
});
