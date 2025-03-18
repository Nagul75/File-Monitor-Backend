const {Router} = require('express')
const indexController = require('../controllers/indexController')
const indexRouter = Router()

indexRouter.get("/", indexController.showUsersGet)
indexRouter.post("/signup", indexController.createUserPost)
indexRouter.post("/login", indexController.loginUserPost)

module.exports = indexRouter