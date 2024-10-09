module.exports = (container) => {
    const userValidator = container.resolve('model');
    const {encryptPassword} = container.resolve('serverHelper');
    const {connectUserRepo} = container.resolve('repo');
    const httpCode = container.resolve('httpCode');

    const login = async (req, res) => {
        res.send('Login endpoint');
    };

    const register = async (req, res) => {
        const {name, email, password, phone, repeatPassword} = req.body;
        try {
            const userValid = await userValidator({name, email, password, phone, repeatPassword});
           const userData = await connectUserRepo.addUser(userValid, encryptPassword)
            res.status(httpCode.CREATED).send(userData);
        } catch (e) {
            res.status(httpCode.BAD_REQUEST).send(e.message);
        }
    };

    return {login, register};
};
