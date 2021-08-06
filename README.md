# JeanDesauw_7_15072021
 
Ce dépôt GitHub correspond au projet 7 de la formation Développeur web d'Openclassrooms.
 
## Mise en place :
 
>Dans un terminal depuis la racine du dépôt :
 
        > cd groupomania 
 
        > npm install (installation des dépendances)
 
        > npm start (après quelques instants un navigateur web devrait s'ouvrir sur la page de connexion de l'application)
 
>Dans un second terminal depuis la racine du dépôt :
 
        > cd backend
 
        > npm install (installation des dépendances)
 
>Pendant l'installation des dépendances : ouvrir le fichier .env-exemple ('./backend/.env-exemple')
 
    - Remplir les différentes informations (DB_HOST, DB_USER, DB_PASS, DB, TOKEN, ...).
 
    - Sauvegarder et renommer le fichier ".env-exemple" en ".env".
 
>Puis dans le second terminal que nous avions ouvert:
 
        > npm run dev (la console devrait afficher "Running on port 3001")
 
>La page web "http://localhost:3000/" qui s'était ouverte est maintenant utilisable. Vous pouvez commencer par créer un compte.
 
</br>
 
## Si vous rencontrez des problèmes lors de ces étapes, n'hésitez pas à me contacter par mail : desauwjean@gmail.com
 
</br>
 
## NB :
 
### Le mot de passe des comptes utilisateurs doit être "Fort" :
    - entre 8 et 120 signes
    - pas d'espace
    - au minimum une lettre minuscule
    - au minimum une lettre majuscule
    - au minimum un chiffre
    - au minimum un des symboles spéciaux suivant : $ @ % * + - _ !
 
### Les tables nécessaires au fonctionnement de l'app seront créées automatiquement (ex : lors du post du premier article, lors de la création du premier compte, ...). Seule la base de données et l'utilisateur de cette base de données doivent être créés (cf les variables d'environnement ".env" : DB_USER DB_PASS, ...)
 
</br>
 
### Le compte modérateur sera également créé automatiquement lorsqu'un premier compte utilisateur sera créé.
 

