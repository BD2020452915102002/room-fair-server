module.exports = (container) => {
    const userValidator = container.resolve('model');
    const {encryptPassword, genToken} = container.resolve('serverHelper');
    const {connectUserRepo} = container.resolve('repo');
    const httpCode = container.resolve('httpCode');

    const login = async (req, res) => {
        const {phone, password} = req.body;
        try {
            const userData = await connectUserRepo.getUserByPhone(phone);
            if (!userData) {
                return res.status(httpCode.NOT_FOUND).send('User does not exist or entered incorrect phone number')
            }else {
                let inputPassWord = encryptPassword(password)
                if (inputPassWord !== userData.password) {
                    return res.status(httpCode.NOT_FOUND).send('Wrong password')
                } else {
                    let token = genToken(userData)
                    return res.status(httpCode.SUCCESS).send({
                        userData: userData,
                        token: token,
                    })
                }
            }
        } catch (err) {
            res.status(httpCode.INTERNAL_SERVER_ERROR).send(err.message)
        }
    };

    const register = async (req, res) => {
        const {name, email, password, phone, repeatPassword} = req.body;
        try {
            const userValid = await userValidator({name, email, password, phone, repeatPassword});
            let passwordHash = encryptPassword(userValid.password);
            await connectUserRepo.addUser({
                name: userValid.name,
                email: userValid.email,
                password: passwordHash,
                phone: userValid.phone,
                createTime: userValid.createTime
            });
            res.status(httpCode.CREATED).send('Registered successfully!');
        } catch (e) {
            res.status(httpCode.BAD_REQUEST).send(e.message);
        }
    };

    return {login, register};
};
