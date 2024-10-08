const serverSettings = {
    port: process.env.PORT || 5000,
    basePath: process.env.BASE_PATH || '',
    version: 'v1',
}
const dbSettings = {
    dbUser: process.env.MONGODB_USER || '',
    dbPassword: process.env.MONGODB_PASSWORD || '',
    dbName: process.env.MONGODB_NAME || '',
}

const httpCode = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    TOKEN_EXPIRED: 409,
    UNKNOWN_ERROR: 520,
    FORBIDDEN: 403,
    ADMIN_REQUIRE: 406,
    UNAUTHORIZED: 401
}
const serverHelper = function () {
    const jwt = require('jsonwebtoken')
    const crypto = require('crypto')
    const secretKey = process.env.SECRET_KEY || ''

    function decodeToken(token) {
        return jwt.decode(token)
    }

    function genToken(obj) {
        return jwt.sign(obj, secretKey, {expiresIn: '1d'})
    }

    function verifyToken(token) {
        try {
            return jwt.verify(token, secretKey)
        } catch (e) {
            return null
        }
    }

    // stringToSlug('Hà Nội, Việt Nam!')
    // Output: 'ha-noi-viet-nam'
    function stringToSlug(str) {
        const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ'
        const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy'
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(RegExp(from[i], 'gi'), to[i])
        }
        str = str.toLowerCase().trim()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/ +/g, '-')
        return str
    }

    function formatRegex(str) {
        const re = /([[\\^$.|?*+()])/g
        return new RegExp(str.replace(re, '\\$1'), 'gi')
    }

    function encryptPassword(password) {
        return crypto.createHash('sha256').update(password, 'binary').digest('base64')
    }

    return {decodeToken, encryptPassword, verifyToken, genToken, stringToSlug, formatRegex}
}
module.exports = {serverHelper: serverHelper(), serverSettings, httpCode, dbSettings}
