const {userSchemas} = require("./user.model");

const userValidator = (userData) => {
    return new Promise((resolve, reject) => {
        const { error, value } = userSchemas.validate(userData);
        if (error) reject(error);
        else resolve(value);
    });
};


module.exports = {userValidator}
