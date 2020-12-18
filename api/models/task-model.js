const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "List"
    },
    completed: {
        type: Boolean,
        default: false
    }
})

mongoose.model('Task', taskSchema)
