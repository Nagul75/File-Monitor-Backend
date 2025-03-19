const express = require('express')
const cors = require('cors')
const passport = require('passport')

const app = express()

require('./config/passport')(passport)

const indexRouter = require('./routes/indexRouter')
const adminRouter = require('./routes/adminRouter')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use("/", indexRouter)
app.use("/admin", adminRouter)

app.listen(8000, () => {
    console.log("Listening to port 8000")
})