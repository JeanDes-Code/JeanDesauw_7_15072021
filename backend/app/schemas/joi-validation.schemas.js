const Joi = require('joi') 

const schemas = {
    articleSchema: Joi.object().keys({
        title : Joi.string().min(3).max(45).required(),
        content : Joi.string().required(),
    }).unknown(true),
    
    commentSchema: Joi.object().keys({
        commentaire: Joi.string().required()
    }).unknown(true),

    userSignUpSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    }).unknown(true),

    userLoginSchema: Joi.object().keys({
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    }).unknown(true)
}


module.exports = schemas;