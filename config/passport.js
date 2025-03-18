const JWTstrategy = require('passport-jwt').Strategy
const extractJWT = require('passport-jwt').ExtractJwt
const fs = require('fs')
const path = require('path')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const pathToPubKey = path.join(__dirname, "..", "cryptography", "id_rsa_pub.pem")
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf-8')

const options = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

module.exports = (passport) => {
    passport.use(new JWTstrategy(options, async function(jwt_payload, done) {
        console.log(jwt_payload)

        const user = await prisma.user.findUnique({
            where: {
                id: jwt_payload.id
            }
        })
        if(user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    }))
}