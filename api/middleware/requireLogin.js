const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')

module.exports = (req, res, next) => {

    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({ err: "You must logged in first"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (err, decode) => {
        if(err){
            return res.status(401).json({ err: "Invalid login credentials" })
        }
        req.userId = decode._id
        next()
    })
}