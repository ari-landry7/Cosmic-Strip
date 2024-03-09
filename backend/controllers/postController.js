'use strict'
let Models = require('../models')

const getPosts = (res) => {
    // finds all posts
    Models.Post.find({})
        .then(data => res.status(200).send({result: 200, data: data}))
        .catch(err => {
            console.log(err)
            res.status(500).send({result: 500, error: err.message})
        })
}

const getPost = (req, res) => {
    // finds post with matching ID param
    Models.Post.find({_id: req.params._id})
        .then(data => res.status(200).send({result: 200, data: data}))
        .catch(err => {
            console.log(err)
            res.status(500).send({result: 500, error: err.message})
        })
}

const createPost = (data, res) => {
    // creates a new post using JSON data POSTed in req.body
    console.log('createPost: ', data)
    new Models.Post(data).save()
        .then(data => res.status(200).send({result: 200, data: data}))
        .catch(err => {
            console.log(err)
            res.status(500).send({result: 500, error: err.message})
        })
}

const updatePost = (req, res) => {
    // updates the post matching the ID from the param using JSON data POSTed in req.body
    console.log('updatePost: ', req.body)
    Models.Post.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.status(200).send({result: 200, data: data}))
        .catch(err => {
            console.log(err)
            res.status(500).send({result: 500, error: err.message})
        })
}

const deletePost = (req, res) => {
    // deletes the post matching the ID from the param
    Models.Post.findByIdAndDelete(req.params.id)
        .then(data => res.status(200).send({result: 200, data: data}))
        .catch(err => {
            console.log(err)
            res.status(500).send({result: 500, error: err.message})
        })
}

module.exports = {
    getPosts, createPost, updatePost, deletePost, getPost
}