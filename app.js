const express = require('express')
const indexRouter = require('./routes/indexRouter')
const app = express()

app.use("/", indexRouter)

app.listen(8000, () => {
    console.log("Listening to port 8000")
})