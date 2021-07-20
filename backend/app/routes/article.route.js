module.exports = app => {
    const articles = require('../controllers/article.ctrl.js');
    let router = require('express').Router();

    router.post('/insert', articles.create);

    router.get('/get', articles.findAll);

    router.put('/update/:id', articles.update);

    router.delete('/delete/:id', articles.deleteOne);

    app.use('/api', router);
}