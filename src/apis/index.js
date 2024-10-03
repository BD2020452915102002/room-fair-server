const userApi = require('./userApi');
const apis = (app)=>{
    app.use('/user', userApi)
}
module.exports = {apis};
