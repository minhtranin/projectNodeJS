'use strict'
const Helpers = use('Helpers')
var EventEmitter = require('events')

/**
 * @version 2.0.0
 * @author Minhran
 */
var ee = new EventEmitter()
ee.on('message', function (text) {
  console.log(text)
})

class FileuploadController {
 /**
      * @swagger
      * /api/admin/upload:
      *   post:
      *     tags:
      *       - Admin Auth
      *     summary: verifyEmail Account
       *     consumes:
       *       - multipart/form-data
       *     description: Update Customer Admin
       *     produces:
       *       - application/json
       *     parameters:
       *       - in: formData
       *         name: image
       *         type: file
      *     responses:
      *       200:
      *         description: Server is OK!
      *       500:
      *         description: Error Server Internal!
      */    

      /**this is a description of the foo function
       * @returns {string}
       */
    async Upload ({request,response}){
      ee.emit('message', 'hello world')
        const profilePics = request.file('image', {
            types: ['image'],
            size: '2mb'
          })
          await profilePics.move('./img')
        
          
        
          if (!profilePics.moved()) {
            return profilePics.error()
          }
          return 'File moved'
        
    }
}

module.exports = FileuploadController
