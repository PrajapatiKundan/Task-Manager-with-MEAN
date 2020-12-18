const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const List = mongoose.model('List')
const Task = mongoose.model('Task')
// const bodyParser = require('body-parser')

// router.use(bodyParser.json())
router.get('/lists', (req, res) => {
    console.log(">> getting list works")
    List.find({})
        .then( (lists) => {
            res.send(lists)
        })
})

router.post('/lists', (req, res) => {
    let title = req.body.title
    console.log(">> posting new list works")
    if(title === undefined){
        console.log("SORRY TITLE IS UNDEFINED")
        return
    }
    let newList = new List({
        title
    })
    newList
        .save()
        .then((listDoc) => {
            res.status(200).json(listDoc)
        })
        .catch( err => console.log(err))
})

router.put('/lists/:id', (req, res) => {
    console.log(">> putting new list works")
    List
        .findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true})
        .then( result => {
            res.status(200).json(result)
        })
        .catch( err => console.log(err))
})

router.delete('/lists/:id', (req, res) => {
    let id = req.params.id
    console.log(">> deleting list works")
    List
        .findOneAndRemove({ _id: id})
        .then( result => {
             
            Task
                .deleteMany({
                    _listId: id 
                })
                .then( result => {
                    res.json(result)
                })

        })
        .catch( err => console.log(err))
})

//-------------------------------Task------------------------------------------------//

router.get('/lists/:listId/tasks', (req, res) => {
    console.log(">> getting tasks of the list works")
    Task 
        .find({
            _listId: req.params.listId
        })
        .then((tasks)=>{
            res.json(tasks)
        })
        .catch(err=>console.log(err))
})

router.post('/lists/:listId/tasks', (req, res) => {
    let title = req.body.title

    if(!title){ return }
    console.log(">> posting tasks to the list works")

    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    })
    newTask
        .save()
        .then((newTaskDoc)=>{
            console.log("Task added...!")
            res.json(newTaskDoc)
        })
        .catch(err=>console.log(err))
})

router.put('/lists/:listId/tasks/:taskId', (req, res) => {
    // let newTitle = req.body.title
    console.log(">> putting tasks to the list works")

    Task
        .findOneAndUpdate({
            _id: req.params.taskId,
            _listId: req.params.listId
        },{
            $set: req.body
        })
        .then( (result) => {
            res.json(result)
        })
        .catch(err=>console.log(err))
})

router.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    console.log(">> delete task called")
    Task
        .findOneAndRemove({
            _id: req.params.taskId
        })
        .then((result) => {
            res.json(result)
        })
        .catch( err => console.log(err))
})
module.exports = router