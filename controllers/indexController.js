const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

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

module.exports = {
    showUsersGet,
    createUserPost
}