const Joi = require("joi");

const schemas = {
  articleSchema: Joi.object()
    .keys({
      title: Joi.string().min(3).max(45).required(),
      content: Joi.string().required(),
    })
    .unknown(true),

  commentSchema: Joi.object()
    .keys({
      commentaire: Joi.string().required(),
    })
    .unknown(true),

  userSignUpSchema: Joi.object()
    .keys({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string()
        .required()
        .pattern(
          new RegExp(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,120})$/
          )
        ),
      username: Joi.string().alphanum().required(),
    })
    .unknown(true),

  userLoginSchema: Joi.object()
    .keys({
      password: Joi.string()
        .required()
        .pattern(
          new RegExp(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,120})$/
          )
        ),
    })
    .unknown(true),
};

module.exports = schemas;
