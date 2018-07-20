'use strict'

module.exports = () => {
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('./db/db.json')
    const db = low(adapter)

    db._.mixin({
        last: function (array) {
            return array[array.length - 1]
        }
    })

    return db
}