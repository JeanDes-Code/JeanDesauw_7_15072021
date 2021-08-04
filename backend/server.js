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
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60 // limit each IP to 15 requests per windowMs
});
app.use("/api/auth", authLimiter); // On limite à 4 requetes par minutes pour luter contre les attaques de force brute.

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15minutes
  max: 600
})
app.use('/api', limiter) //Pour les autres type de requêtes on limite à 40 requêtes par minutes.
app.use('/uploads', limiter)
app.use('/api/commentaires', limiter)
app.use('/api/like', limiter)
app.use('/api/like/comment', limiter)

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
