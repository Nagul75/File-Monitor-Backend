const express = require('express')
const cors = require('cors')
const session = require('express-session')
const pgStore = require('connect-pg-simple')(session)
const passport = require('./config/passport')

const pool = require('./db/pool')
const app = express()
const indexRouter = require('./routes/indexRouter')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const sessionStore = new pgStore({
    pool: pool,
    tableName: "user_sessions",
    createTableIfMissing: true
})

app.use(session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.session())


app.use("/", indexRouter)

app.listen(8000, () => {
    console.log("Listening to port 8000")
})