const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Base64 } = require("js-base64");

const randomToken = process.env.TOKEN; //Randomiser le token de session

//Sign Up
exports.signup = async (req, res) => {
  const email = Base64.encode(req.body.email);
  const password = await bcrypt.hash(req.body.password, 10);
  const username = req.body.username;
  const defaultRole = 0;
  let ERROR;

  //Compte moderateur :
  const moderateurUsername = process.env.MOD_USERNAME;
  const moderateurPassword = await bcrypt.hash(process.env.MOD_PASSWORD, 10);
  const moderateurEmail = Base64.encode(process.env.MOD_EMAIL);
  const moderateur = {
    id: 1,
    email: moderateurEmail,
    password: moderateurPassword,
    username: moderateurUsername,
    role: 1,
  };

  const sqlCreate =
    "CREATE TABLE IF NOT EXISTS Users (id INT UNSIGNED NOT NULL AUTO_INCREMENT, email VARCHAR(64) CHARACTER SET ascii NOT NULL UNIQUE, password CHAR(60) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL, username VARCHAR(45) NOT NULL UNIQUE, role INT NOT NULL, PRIMARY KEY (id))";
  const sqlAutoInsertModerateur =
    "INSERT INTO Users (id, email, password, username, role) VALUES (?,?,?,?,?)";
  const sqlInsert =
    "INSERT INTO Users (email, password, username, role) VALUES (?,?,?,?)";
  //Création de la table user
  db.query(sqlCreate, (err, result) => {
    if (err) {
      console.log(err);
      ERROR = err;
    } else {
      console.log("Table Users créée ou déjà existante !");
    }
    //Création d'un compte modérateur --> 'username: Moderateur, password : moderateur, email: moderateur@groupomania.fr'
    db.query(
      sqlAutoInsertModerateur,
      [
        moderateur.id,
        moderateur.email,
        moderateur.password,
        moderateur.username,
        moderateur.role,
      ],
      (err, result) => {
        if (err) {
          console.log("Modérateur non-créé ", err);
        } else {
          console.log("Compte modérateur créé ou déjà existant !");
        }
      }
    );
    //Création du compte utilisateur [après cryptage du mdp]
    db.query(
      sqlInsert,
      [email, password, username, defaultRole],
      (err, result) => {
        if (err) {
          console.log(err);
          ERROR = ERROR + "|" + err;
          res.status(500).send(ERROR);
        } else {
          console.log("Compte utilisateur créé !");
          res.status(201).send("user created");
        }
      }
    );
  });
};

//Login
exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlGetUser = "SELECT * FROM Users WHERE username = ?";
  //Récupération du hash du mdp de l'utilsateur portant le pseudo ou l'@mail indiquée
  db.query(sqlGetUser, username, async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Mauvaise combinaison username/ mot de passe !");
    } else {
      console.log(result);
      const hash = JSON.parse(JSON.stringify(result));
      if (hash[0] === undefined) {
        res.status(500).send("Mauvaise combinaison username/ mot de passe !");
      } else {
        const userId = hash[0].id;
        const username = hash[0].username;
        const role = hash[0].role;
        console.log(hash);
        await bcrypt.compare(
          password,
          hash[0].password,
          function (err, result) {
            if (result === false) {
              console.log("Mauvaise combinaison username/ mot de passe !");
              res.status(500).send("Mot de passe incorrect !");
            } else {
              const auth = {
                auth: true,
                id: userId,
                token: jwt.sign(
                  { id: userId, username: username, role: role },
                  randomToken,
                  { expiresIn: "24h" }
                ),
              };
              console.log(auth);
              res.send(auth);
              console.log("Vous êtes connecté !");
              res.status(200).end();
            }
          }
        );
      }
    }
  });
};

// Get One User

exports.getOne = (req, res) => {
  const userId = req.res.locals.userId;
  const sqlSelect = "SELECT username, email FROM Users WHERE id = ?";
  db.query(sqlSelect, userId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

// Modify User :

exports.modify = async (req, res) => {
  console.log(req.body);
  const userId = req.res.locals.userId;
  const username = req.body.username;
  const email = Base64.encode(req.body.email);
  const password = await bcrypt.hash(req.body.password, 10);
  const sqlUpdateUser =
    "UPDATE Users SET username = ?, email = ?, password = ? WHERE id = ?";
  const sqlUpdateArticles = "UPDATE Articles SET author = ? WHERE userId = ?";
  const sqlUpdateCommentaires =
    "UPDATE Commentaires SET author = ? WHERE userId = ?";
  let ERROR;

  db.query(
    sqlUpdateUser,
    [username, email, password, userId],
    (err, result) => {
      if (err) {
        console.log(err);
        ERROR =  err;
        res.status(500).send(ERROR);
        return
      } else {
        console.log("Compte User modifié !");
      }
  db.query(sqlUpdateArticles, [username, userId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Auteur des articles créés par l'utilsateur modifié pour correspondre au nouveau Username."
      );
    }
    db.query(sqlUpdateCommentaires, [username, userId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "Auteur des commentaires créés par l'utilsateur modifié pour correspondre au nouveau Username."
        );
        res.status(200).end();
      }
      
    });
  })})
};

// Delete One User

exports.delete = (req, res) => {
  const userId = req.res.locals.userId;
  const sqlDeleteUser = "DELETE FROM Users WHERE id = ?";
  const sqlDeleteArticles = "DELETE FROM Articles WHERE userId = ?";
  const sqlDeleteCommentaires = "DELETE FROM Commentaires WHERE userId = ?";
  const sqlDeleteArticleLike = "DELETE FROM Article_like WHERE userId = ?";
  const sqlDeleteCommentLike = "DELETE FROM Comment_like WHERE userId = ?";
  let ERROR;

  db.query(sqlDeleteArticles, userId, (err, result) => {
    if (err) {
      console.log(err);
      ERROR = err;
    } else {
      console.log("Articles créés par l'utilisateur supprimés !");
    }
    db.query(sqlDeleteCommentaires, userId, (err, result) => {
      if (err) {
        console.log(err);
        ERROR = ERROR + "|" + err;
      } else {
        console.log("Commentaires créés par l'utilisateur supprimés !");
      }
      db.query(sqlDeleteArticleLike, userId, (err, result) => {
        if (err) {
          console.log(err);
          ERROR = ERROR + "|" + err;
        } else {
          console.log("Likes articles par l'utilisateur supprimés !");
        }
        db.query(sqlDeleteCommentLike, userId, (err, result) => {
          if (err) {
            console.log(err);
            ERROR = ERROR + "|" + err;
          } else {
            console.log("Likes Commentaires par l'utilisateur supprimés !");
          }
          db.query(sqlDeleteUser, userId, (err, result) => {
            if (err) {
              console.log(err);
              ERROR = ERROR + "|" + err;
              res.status(500).send(ERROR);
            } else {
              console.log("Compte User supprimé !");
              res.status(200).send("Compte supprimé.");
            }
          });
        });
      });
    });
  });
};
