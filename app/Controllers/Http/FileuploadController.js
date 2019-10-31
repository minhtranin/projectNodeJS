'use strict'
const Helpers = use('Helpers')
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
     
       *   - in: formData
       *         name: image2
       *         type: file
  
    
      *     responses:
      *       200:
      *         description: Server is OK!
      *       500:
      *         description: Error Server Internal!
      */    
    async Upload ({request,response}){
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
