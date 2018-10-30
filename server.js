'use strict'

const app = require('express')()

require('./middlewares')(app)
require('./routes')(app)

// reset database
const fs = require('fs-extra')
const path = require('path')

fs.copy(path.resolve(__dirname, './db/db.original.json'), path.resolve(__dirname, './db/db.json'), {
    overwrite: true,
}).then(() => {
    console.log('Database is restored.')
    
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
})
