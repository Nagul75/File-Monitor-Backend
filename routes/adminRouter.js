const {Router} = require('express')
const adminController = require('../controllers/adminController')
const adminRouter = Router()

adminRouter.get("/logs", adminController.showLogsGet)
adminRouter.get("/alerts", adminController.showAlertsGet)

module.exports = adminRouter