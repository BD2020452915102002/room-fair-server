module.exports = (app, container) => {
    const {userController} = require("../controller")(container);
    const { basePath , version } = container.resolve('serverSettings')
    app.get(`${basePath}/${version}/user/login`, userController.login )
}
