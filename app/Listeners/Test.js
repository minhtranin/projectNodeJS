'use strict'
var EventEmitter = require('events')

        var ee = new EventEmitter()
        ee.on('sendMail', function (text) {
            return(text)
        })
    

module.exports = ee