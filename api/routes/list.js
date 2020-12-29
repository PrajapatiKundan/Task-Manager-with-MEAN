const express = require('express')
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')

const List = require('../models/list-model')
const Task = require('../models/task-model')

const router = express.Router()

router.get( '/lists', requireLogin, (req, res) => {
    
    List
    .find( { _userId: req.userId } )
    .then( ( lists ) => {
        res.send(lists)
    })
})

router.post( '/lists',requireLogin, (req, res) => {
    let title = req.body.title
    
    if( title === undefined ){
        return
    }

    let newList = new List({
        title,
        _userId: req.userId
    })
    
    newList
    .save()
    .then( ( listDoc ) => {
        res.status(200).json(listDoc)
    })
    .catch( err => console.log(err))
})

router.put( '/lists/:id', requireLogin, (req, res) => {
    
    List
    .findByIdAndUpdate( req.params.id, { $set: req.body }, { new: true })
    .then( result => {
        res.status(200).json(result)
    })
    .catch( err => console.log(err))
})

router.delete( '/lists/:id', requireLogin, (req, res) => {
    let id = req.params.id
    
    List
    .findOneAndRemove( { _id: id } )
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

//-----------------------------------------------------Task-----------------------------------------------------------------//

router.get('/lists/:listId/tasks',requireLogin, (req, res) => {
    
    List 
    .findOne({
        _id: req.params.listId,
        _userId: req.userId
    })
    .then((list) => {
        if(!list){
            return res.sendStatus(400)
        }

        Task 
        .find({
            _listId: req.params.listId,
        })
        .then((tasks)=>{
            res.json(tasks)
        })
    })
    .catch(err=>console.log(err))
    
})

router.post( '/lists/:listId/tasks', requireLogin, (req, res) => {
    let title = req.body.title

    if(!title){ return res.sendStatus(400) }

    List
    .findOne({
        _id: req.params.listId,
        _userId: req.userId
    })
    .then((list) => {
        if(!list){
            return res.sendStatus(400)
        }
        let newTask = new Task({
            title: req.body.title,
            _listId: list._id
        })

        newTask
        .save()
        .then((newTaskDoc)=>{
            res.json(newTaskDoc)
        })
    })
    .catch(err=>console.log(err))
})

router.put('/lists/:listId/tasks/:taskId', requireLogin, (req, res) => {

    List
    .findOne({
        _id: req.params.listId,
        _userId: req.userId
    })
    .then((list) => {
        if(!list){
            return res.sendStatus(400)
        }
        Task
        .findOneAndUpdate({
            _id: req.params.taskId,
            _listId: list._id
        },{
            $set: req.body
        })
        .then( (result) => {
            res.json(result)
        })
    })
    .catch(err=>console.log(err))
})

router.delete('/lists/:listId/tasks/:taskId', requireLogin, (req, res) => {
    
    List
    .findOne({
        _id: req.params.listId,
        _userId: req.userId
    })
    .then((list) => {
        if(!list){
            return res.sendStatus(400)
        }
        Task
        .findOneAndRemove({
            _id: req.params.taskId
        })
        .then((result) => {
            res.json(result)
        })
    })
    .catch( err => console.log(err))
})

module.exports = router