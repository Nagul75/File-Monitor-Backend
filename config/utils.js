const jwt = require('jsonwebtoken')
require('dotenv').config()
const PRIV_KEY = process.env.PRIV_KEY


function issueJWT(user) {
    const id = user.id
    const expiresIn = '1d'

    const payload = {
        sub: id,
        iat: Date.now()
    }

    const signedToken = jwt.sign(payload, PRIV_KEY, {expiresIn: expiresIn, algorithm: 'RS256'})

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

module.exports = {
    issueJWT
}