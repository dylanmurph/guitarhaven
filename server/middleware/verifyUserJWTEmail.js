const jwt = require('jsonwebtoken')
const fs = require('fs')

const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const verifyUserJWTEmail = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) return res.status(401).json({ errorMessage: "User is not logged in" })

    jwt.verify(token, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
        if (err) return res.status(403).json({ errorMessage: "User is not logged in" })

        req.decodedToken = decodedToken
        next()
    })
}

module.exports = verifyUserJWTEmail
