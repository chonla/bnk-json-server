'use strict'

const jwt = require('jsonwebtoken')
const sha256 = require('sha256')
//  const User = require('../models/user.model')
const db = require('../db')()

const createToken = (login, id) => {
    console.log(login, id)
    const token = jwt.sign({
        data: {
            name: login,
            id: id
        }
    }, 'secret', {
        expiresIn: 3600,
        algorithm: 'HS256'
    })
    return token
}

exports.login = (req, res, next) => {
    const user = db.get('users')
        .defaults({
            users: []
        })
        .find({
            login: req.body.login
        })
        .value()

    if (user && (sha256(req.body.password) === user.password)) {
        const token = createToken(req.body.login, user._id)
        res.json({
            token: token
        })
    } else {
        next({
            code: 401,
            data: new Error("authorization failed")
        })
    }
}