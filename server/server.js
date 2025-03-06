const createError = require("http-errors")

// Server-side global variables
require(`dotenv`).config({path:`./config/.env`})

// Database
require(`./config/db`)

// Express
const express = require(`express`)
const app = express()

app.use(require(`express-session`)({
    secret: process.env.SESSION_PRIVATE_KEY,
    resave: false,
    cookie: {secure: false, maxAge: 60000},
    saveUninitialized: true
}))

app.use(express.json())
app.use(require(`body-parser`).json())
app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))

// Routers
app.use(require(`./routes/guitars`))
app.use(`/uploads/guitars`, express.static(process.env.GUITAR_STORE_IMAGES))
app.use(require(`./routes/users`))
app.use(`/uploads/users`, express.static(process.env.USER_ACCOUNT_IMAGES))

// Port
app.listen(process.env.SERVER_PORT, () =>
{
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})

// Error 404
app.use((req, res, next) => {next(createError(404))})

// Other errors
app.use(function (err, req, res, next)
{
    console.error(err.message)
    if (!err.statusCode)
    {
        err.statusCode = 500
    }
    res.status(err.statusCode).send(err.message)
})