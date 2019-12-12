var accessKeyId = '7TMDWY6MN5VNQHNZ9MNE';
        var secretAccessKey = 'fRTzowitSpRzE0CvLMv9onUynQjkI51LZ8anrRDt';
        var wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
        /*auth */
        var s3 = new AWS.S3({
            endpoint: wasabiEndpoint,
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        });
        var filePath = './img/crs3.jpg';
        var params = {
          Bucket: 'mediaAdmin',
          Key: filePath
      };
      
      s3.deleteObject(params, function (err, data) {
          if (!err) {
              console.log(data); // sucessfull response
              /*
              data = {}
              */
          } else {
              console.log(err); // an error ocurred
          }
      });