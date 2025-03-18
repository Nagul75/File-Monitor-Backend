const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
require('dotenv').config()
const pathToPrivKey = path.join(__dirname, "..", "cryptography", "id_rsa_priv.pem")
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf-8')


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