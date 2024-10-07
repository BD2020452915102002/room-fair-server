const Joi = require("joi");
let options = {timeZone: 'Asia/Ho_Chi_Minh', hour12: false}
const userSchemas = Joi.object(
    {
        name: Joi.string().trim().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().trim().pattern(/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/).required(),
        password: Joi.string().min(8).trim().required(),
        repeatPassword: Joi.string().valid(Joi.ref('password')).required(),
        createTime: Joi.string().empty('').default(() => new Date().toLocaleString('vi-VN', options))
    }
)
module.exports = {userValidate: userSchemas.validate};

