const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('List', listSchema)