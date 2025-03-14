const {Pool} = require('pg')

module.exports = new Pool({
    host: "localhost",
    user: process.env.PGUSER,
    database: "File-Monitor",
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT)
})
