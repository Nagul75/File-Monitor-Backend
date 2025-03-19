const fs = require('fs')
const path = require('path')

async function showLogsGet(req, res) {
    const combinedLogPath = path.join(__dirname, "..", "combined.log")
    const combinedLog = fs.readFileSync(combinedLogPath, 'utf-8')
    const combinedLogArr = combinedLog.split("\r\n")
    res.json({logs: combinedLogArr})
}


async function showAlertsGet(req, res) {

}

module.exports = {
    showLogsGet,
    showAlertsGet
}