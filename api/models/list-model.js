const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: 1,
        trim: true,
        unique: true
    }
})

mongoose.model('List', listSchema)