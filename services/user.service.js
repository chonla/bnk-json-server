'use strict'

const sha256 = require('sha256')
const db = require('../db')()

exports.createUser = (req, res, next) => {
    const u = {
        login: req.body.login,
        display: req.body.display,
        email: req.body.email,
        password: sha256(req.body.password)
    }

    const user = db.get('users')
        .defaults({
            users: []
        })
        .find({
            login: u.login
        })
        .value()

    if (user) {
        next({
            code: 409,
            data: new Error("login has been already taken.")
        })
    } else {
        const lastUser = db.get('users')
            .last()
            .value()
        let nextId = 1;

        if (lastUser) {
            nextId = parseInt(lastUser._id, 10) + 1
        }

        u._id = "" + nextId;

        db.get('users')
            .defaults({
                users: []
            })
            .push(u)
            .write()

        res.status(201)
        res.json({
            message: "user has been created."
        })
    }
}

exports.getMe = (req, res, next) => {
    const user = db.get('users')
        .defaults({
            users: []
        })
        .find({
            _id: req.user.data.id
        })
        .value()

    if (user) {
        res.json({
            display: user.display
        })
    } else {
        next({
            code: 404,
            data: new Error('user is not found.')
        })
    }
}

exports.updateMe = (req, res, next) => {
    const user = db.get('users')
        .defaults({
            users: []
        })
        .find({
            _id: req.user.data.id
        })
        .value()

    if (req.body.email) {
        user.email = req.body.email;
    }
    if (req.body.display) {
        user.display = req.body.display;
    }

    db.get('users')
        .defaults({
            users: []
        })
        .find({
            _id: req.user.data.id
        })
        .assign(user)
        .write()
    res.json({
        message: "user profile has been updated."
    })
}

exports.updateUser = (req, res, next) => {
    const user = db.get('users')
        .defaults({
            users: []
        })
        .find({
            _id: req.params.id
        })
        .value()

    console.log(req.params.id, user)

    if (req.body.email) {
        user.email = req.body.email;
    }
    if (req.body.display) {
        user.display = req.body.display;
    }

    db.get('users')
        .defaults({
            users: []
        })
        .find({
            _id: req.params.id
        })
        .assign(user)
        .write()
    res.json({
        message: "user profile has been updated."
    })
}