const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const randomToken = "!kfr*kç_"; //Randomiser le token de session

//Sign Up
exports.signup = async (req, res) => {
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;

    const sqlCreate ="CREATE TABLE IF NOT EXISTS Users (id INT UNSIGNED NOT NULL AUTO_INCREMENT, email VARCHAR(45) NOT NULL UNIQUE, password CHAR(60) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL, username VARCHAR(45) NOT NULL UNIQUE, role INT NOT NULL DEFAULT 0, PRIMARY KEY (id))"
    const sqlInsert ="INSERT INTO Users (email, password, username) VALUES (?,?,?)"
    //Création de la table user
    db.query(sqlCreate, (err, result) => {
        if (err) {
          console.log(err);
          res.end("An error occured")
        } else {
          console.log("Table Users créée ou déjà existante !")
        }
        //Création du compte utilisateur [après cryptage du mdp]
        db.query(sqlInsert, [email, password, username], (err,result) => {
            if (err) {
                console.log(err);
                res.end()
            } else {
                console.log("Compte utilisateur créé !")
                res.end()
            }
        })
    });
    
    //TOKEN SESSION
};


//Login
exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlGetUser = "SELECT password FROM Users WHERE username = ?";
    //Récupération du hash du mdp de l'utilsateur portant le pseudo ou l'@mail indiquée
    db.query (sqlGetUser, username, async (err, result) => {
        if (err) {
            console.log(err)
            res.end();
        } else {
            const hash = JSON.parse(JSON.stringify(result));
            await bcrypt.compare(password, hash[0].password, function(err, result) {
                if( result === false ) {
                    console.log("Mot de passe incorrect !")
                    res.end();
                } else {
                    const auth = {
                        username: username,
                        token: jwt.sign(
                            { username: username},
                            randomToken,
                            { expiresIn: "24h" }
                        )
                    };
                    console.log(auth)
                    res.send(auth)
                    console.log("Vous êtes connecté !")
                    res.end();
                }
           });
        }
    })
    //Comparaison des deux hash
    //TOKEN SESSION
}
