const express = require("express");
const cors = require ('cors');
const mysql = require("mysql2");
const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'pz3YIiTtX1%:K5J',
    database: 'groupomania',
});

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/api/get', (req, res) => {
    const sqlSelect = 
        'SELECT * FROM articles';
    db.query(sqlSelect, (err, result) => {
        res.send(result);
});
})

app.post('/api/insert', (req,res) => {

    const articleTitle = req.body.articleTitle
    const articleContent = req.body.articleContent
    const articleAuthor = req.body.articleAuthor

    const sqlInsert = 
        'INSERT INTO articles (title, content, author) VALUES (?,?,?)';
    db.query(sqlInsert, [articleTitle, articleContent, articleAuthor], (err, result) => {
        console.log(result);
    });
});

app.delete('/api/delete/:id', (req,res) => {
    const articleId = req.params.id
    const sqlDelete = 
        "DELETE FROM articles WHERE id = ?";

    db.query(sqlDelete, articleId, (err, result) => {
       if (err) console.log(err);
    });
});

app.put('/api/update', (req,res) => {
    const articleId = req.params.articleId
    const articleContent = req.body.articleContent
    const sqlUpdate = 
        "UPDATE articles SET content = ? WHERE id = ?";

    db.query(sqlUpdate, [articleContent, articleId], (err, result) => {
       if (err) console.log(err);
       console.log(result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});