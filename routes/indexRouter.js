const {Router} = require('express')
const indexController = require('../controllers/indexController')
const indexRouter = Router()
const passport = require('passport')

indexRouter.get("/", passport.authenticate('jwt', { session: false }), indexController.showUsersGet);
indexRouter.post("/signup", indexController.createUserPost)
indexRouter.post("/login", indexController.loginUserPost)

module.exports = indexRouter