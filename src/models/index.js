const {userValidate} = require("./user.model");

const userValidator = (userData)=>{
    return new Promise((resolve,reject)=>{
        if(!userData){
            reject(new Error('User data does not exist'))
        }
        const {error,value} = userValidate(userData)
        if(error) {
            reject(new Error(`invalid user schema: ${error}`))
        }
        resolve(value)
    })
}

module.exports = {userValidator}
