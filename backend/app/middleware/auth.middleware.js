const jwt = require("jsonwebtoken");
const TOKEN = "!kfr*kç_"; //Randomiser le token de session ;

module.exports = (req, res, next) => { 
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(' Token bien reçu !');
    
    //verify is token is matching with API
    const decodedToken = jwt.verify(token, TOKEN);

    //Get userID from token
    const userId = decodedToken.id;
    const userRole = decodedToken.role;
    console.log(" Utilisateur : n°" + userId);
    
    //If is null or != from that one of API : invalid request
    if (req.body.userId && req.body.userId != userId) {
      throw " Utilisateur non authentifié ";
    } else {
      console.log("  Accès autorisé ! ");
      res.locals.userId = userId;
      res.locals.userRole = userRole;
      next();
    }
  } catch {
    res.status(401).json({ error: new Error(" Requète invalide ") });
    console.log(" Requête invalide ");
  }
};


