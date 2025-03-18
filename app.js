const express = require('express')
const cors = require('cors')

const pool = require('./db/pool')
const app = express()
const indexRouter = require('./routes/indexRouter')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use("/", indexRouter)

app.listen(8000, () => {
    console.log("Listening to port 8000")
})