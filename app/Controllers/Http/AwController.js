'use strict'
const fs = require('fs')
const AWS = require('aws-sdk')
const path = require('path')
const AmazonS3  = use('AmazonS3')
// "scripts": {
//     ...
//     "deploy": "deploy-aws-s3-cloudfront --bucket my-bucket"
//   }

class AwController {

    /**
          * @swagger
          * /api/admin/video:
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
           *         name: x-file-id
           *         type: file
          *     responses:
          *       200:
          *         description: Server is OK!
          *       500:
          *         description: Error Server Internal!
          */
    async uploadVideo({ request, response }) {
        //   const profilePics = request.file('x-file-id', {
        //     types: ['mp4'],
        //     size: '100mb'
        //   })
        //   await profilePics.move('./img')

        var accessKeyId = '7TMDWY6MN5VNQHNZ9MNE';
        var secretAccessKey = 'fRTzowitSpRzE0CvLMv9onUynQjkI51LZ8anrRDt';

        var wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
        var s3 = new AWS.S3({
            endpoint: wasabiEndpoint,
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: 'ap-southeast-1'

        });
        var filePath = './img/vd3.mp4'
        var params = {
            Bucket: 'tuna',
            Key: 'lesson/a.mp4',
            Prefix: 'lesson',
            Body: fs.createReadStream(filePath),
            ContentType: 'video/mp4',
            ACL: 'public-read-write',
        };

        var options = {
            partSize: 10 * 1024 * 1024, // 10 MB
            queueSize: 10
        };

        const status = await s3.upload(params, function (err, resp) {
            if (err) {
                console.log("error in s3 put object cb");
            } else {
                console.log(resp);
                console.log("successfully added image to s3");
            }
        }).promise()
        console.log(status);

        return response.send(status)
    }
    /**
      * @swagger
      * /api/admin/deletevideo:
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
       *         name: x-file-id
       *         type: file
      *     responses:
      *       200:
      *         description: Server is OK!
      *       500:
      *         description: Error Server Internal!
      */
    async delete({ request, response }) {
        //     var accessKeyId = '7TMDWY6MN5VNQHNZ9MNE';
        //     var secretAccessKey = 'fRTzowitSpRzE0CvLMv9onUynQjkI51LZ8anrRDt';
        //     var wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
        //     /*auth */
        //     var s3 = new AWS.S3({
        //         endpoint: wasabiEndpoint,
        //         accessKeyId: accessKeyId,
        //         secretAccessKey: secretAccessKey
        //     });
        //     var filePath = 'vd5.mp4';
        //     var params = {
        //       Bucket: 'mediaAdmin',
        //       Key: filePath
        //   };

        //   s3.deleteObject(params, function (err, data) {
        //       if (!err) {
        //           console.log(data); // sucessfull response
        //           /*
        //           data = {}
        //           */
        //       } else {
        //           console.log(err); // an error ocurred
        //       }
        //   });
        //   response.send('ok')
        const amazon = new AmazonS3()
        const path = `Course_videos/75625427_2568519849935019_4265659427014574080_o.jpg`
        try {
            await amazon.delete(path)
            return response.send('delete sucessfull')
        } catch (err) {
            return response.status(404).send(err)
        }

        //response.status(404).send('loi roi nhe')


    }
    /**
      * @swagger
      * /api/admin/list:
      *   post:
      *     tags:
      *       - classAWS
      *     summary: verifyEmail Account
       *     consumes:
       *       - multipart/form-data
       *     description: Update Customer Admin
       *     produces:
       *       - application/json
       *     parameters:
       *       - in: formData
       *         name: x-file-id
       *         type: file
      *     responses:
      *       200:
      *         description: Server is OK!
      *       500:
      *         description: Error Server Internal!
      */
    async list({ response }) {
        
            //response.header('Content-disposition', 'attachment; filename=theDocument.jpg')
            const amazon = new AmazonS3()
            const data =  amazon.getUrl('Course_videos/cr7.jpg')
            
            return response.send(data)
        
        
            
        
    }
    /**
    * @swagger
    * /api/admin/createBucket:
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
     *         name: x-file-id
     *         type: file
    *     responses:
    *       200:
    *         description: Server is OK!
    *       500:
    *         description: Error Server Internal!
    */
    async createBucket({ response }) {
        var accessKeyId = '7TMDWY6MN5VNQHNZ9MNE';
        var secretAccessKey = 'fRTzowitSpRzE0CvLMv9onUynQjkI51LZ8anrRDt';
        var wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
        /*auth */
        var s3 = new AWS.S3({
            endpoint: wasabiEndpoint,
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        });
        var bucketName = 'video' + '/' + 'less';

        s3.createBucket({ Bucket: bucketName }, function (err, data) {
            if (!err) {
                console.log(data);  // successfull response
                // data: {
                //      Location: "http://examplebucket.s3.amazonaws.com/"
                // }
            } else {
                console.log(err) // an error occurred
            }
        });
        return response.send('cc')
        // }

    }
    /**
     * @swagger
     * /api/vip/create:
     *   post:
     *     tags:
     *       - classAWS
     *     summary: verifyEmail Account
      *     consumes:
      *       - multipart/form-data
      *     description: Update Customer Admin
      *     produces:
      *       - application/json
      *     parameters:
      *       - in: formData
      *         name: x-file-id
      *         type: file
     *     responses:
     *       200:
     *         description: Server is OK!
     *       500:
     *         description: Error Server Internal!
     */
    async tao({ request, response }) {
        request.multipart.file('x-file-id', {}, async (file) => {
            //file.ContentType = 'image/png'
            const amazon = new AmazonS3()
            try{
            const status = await amazon.upload(file)
            response.send(status)
        }
        catch(err){
            return response.status(404).send(err)
        }
            //return response.send('ok')
        })
        await request.multipart.process()

    }

}

module.exports = AwController
