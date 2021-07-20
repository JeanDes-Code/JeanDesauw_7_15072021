const express = require("express");
const cors = require("cors");
const app = express();

//Réglages CORS
app.use(cors());

//Parse les éléments de type application/json
app.use(express.json());

//Parse les éléments de type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/article.route", "./app/routes/commentaire.route")(app);

// Config du port sur lequel joindre le serveur
app.listen(3001, () => {
  console.log("running on port 3001");
});
