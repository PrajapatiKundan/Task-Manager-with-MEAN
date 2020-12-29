const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
})

module.exports = mongoose.model('User', userSchema);

