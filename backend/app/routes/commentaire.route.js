module.exports = app => {
    const commentaires = require('../controllers/commentaire.ctrl.js');
    let router = require('express').Router();

    router.post('/post/commentaires', commentaires.create);

    router.get('/get/commentaires', commentaires.findAll);

    router.put('/update/commentaires/:id', commentaires.update);

    router.delete('/delete/commentaires/:id', commentaires.deleteOne);

    app.use('/api', router);
}