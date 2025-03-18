const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const utils = require('../config/utils')

async function showUsersGet(req, res) {
    res.send("idk")
}

async function createUserPost(req, res) {
    let {username, email, password} = req.body
    password = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password
        }
    })
    console.log(user)
    req.body.confirm = "user created ..."
    res.json(req.body)
}

async function loginUserPost(req, res) {
    const user = prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })
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

async function logoutGet(req, res){

}

module.exports = {
    showUsersGet,
    createUserPost,
    loginUserPost,
    logoutGet
}