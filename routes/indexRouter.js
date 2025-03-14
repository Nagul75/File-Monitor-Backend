const {Router} = require('express')
const indexController = require('../controllers/indexController')
const indexRouter = Router()

indexRouter.get("/", indexController.showUsersGet)
indexRouter.post("/signup", indexController.createUserPost)

module.exports = indexRouter