const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../models/user-model')
const router = express.Router()
const { JWT_SECRET } = require('../config/keys')

router.post('/signup', (req, res) => {
    const { email, password } = req.body

    if(!email || !password ){
        return res.status(422).json({ err : "Please fill all the feilds"})
    }
    User
    .findOne({ email: email })
    .then( userExist => {
        if( userExist ){
            return res.status(422).json({ err: "User already exist"})
        }
        bcrypt
        .hash(password, 12)
        .then( hashpassword => {
            const newUser = new User({
                email,
                password: hashpassword
            })

            newUser
            .save()
            .then( savedUser => {
                const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                res.json({
                    token
                })
            })
            .catch( err => console.log(err))
        })
    })
})

router.post('/signin', (req, res) => {

    const { email, password } = req.body

    if( !email || !password ){
        return res.status(422).json({ err: "Please fill all the feilds"})
    }

    User
    .findOne({ email })
    .then( savedUser => {
        if(!savedUser){
            return res.status(422).json({ err: "You have to register first. Please Signup"})
        }
        bcrypt
        .compare(password, savedUser.password)
        .then( match => {
            if(match) {
                const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                const { _id, email } = savedUser
                res.json({
                    token
                })
            } else {
                return res.status(422).json({ err: "Invalid email or password"})
            }
        })
    })
})

module.exports = router