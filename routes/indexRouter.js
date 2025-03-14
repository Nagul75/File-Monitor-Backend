const {Router} = require('express')
const indexController = require('../controllers/indexController')
const indexRouter = Router()

indexRouter("/", indexController)

module.exports = indexRouter