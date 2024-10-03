const {runMongoDb} = require("./mongodb");

const connectDb = async ()=>{
    try {
        await runMongoDb()
    } catch(err){
        throw err;
    }
}
module.exports = {connectDb};
