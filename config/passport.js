const JWTstrategy = require('passport-jwt').Strategy
const extractJWT = require('passport-jwt').ExtractJwt
const fs = require('fs')
const path = require('path')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const logger = require('../logger/logger')

const pathToPubKey = path.join(__dirname, "..", "cryptography", "id_rsa_pub.pem")
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf-8')

const options = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

module.exports = (passport) => {
    passport.use(new JWTstrategy(options, async function(jwt_payload, done) {
        try{
            logger.info(`Executing query: SELECT DATA with params: [${jwt_payload.id}]`)
            const user = await prisma.user.findUnique({
                where: {
                    id: jwt_payload.id
                }
            })
            logger.info(`Successfully executed SELECT DATA query`)
        }
        catch(err) {
            logger.error(`Error executing SELECT DATA query: ${err.message}`)
        }
        if(user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    }))
}