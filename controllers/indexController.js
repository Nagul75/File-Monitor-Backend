const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const utils = require('../config/utils')
const logger = require('../logger/logger')

async function showUsersGet(req, res) {
    res.send("idk")
}

async function createUserPost(req, res) {
    let {username, email, password} = req.body
    password = await bcrypt.hash(password, 10)
    logger.info(`Executing query: INSERT DATA with params: [${username}, ${email}, ${password}]`)
    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password
            }
        })
        logger.info(`Successfully executed INSERT DATA query`)
        console.log(user)
        req.body.confirm = "user created ..."
        res.json(req.body)
    }
    catch(err) {
        logger.error(`Error executing INSERT DATA query: ${err.message}`)
    }

}

async function loginUserPost(req, res) {
    try {
        logger.info(`Executing query: SELECT DATA with params: [${req.body.username}]`)
        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username
            }
        })
        logger.info(`Successfully executed SELECT DATA query`)
        if(!user) {
            return res.status(401).json({success: false, msg: "Username doesn't exist"})
        }
        const password = req.body.password
        const match = await bcrypt.compare(password, user.password)
        if(match) {
            const tokenObject = utils.issueJWT(user)
            res.status(200).json({success: true, token: tokenObject.token, expiresIn: tokenObject.expires})
        } else {
            res.status(401).json({success: false, msg: "Incorrect password"})
        }
    }
    catch(err) {
        logger.error(`Error executing SELECT DATA query: ${err.message}`)
    }
}

async function logoutGet(req, res){

}

module.exports = {
    showUsersGet,
    createUserPost,
    loginUserPost,
    logoutGet
}