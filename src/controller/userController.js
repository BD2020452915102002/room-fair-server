module.exports = (container) => {
    const login = async (req, res) => {
        res.send('kkkkk')
    }
    const register = async (req, res) => {
        const { name, email, password, phone, repeatPassword } = req.body
        try {

        }catch (e){

        }
    }

    return {login, register}
}
