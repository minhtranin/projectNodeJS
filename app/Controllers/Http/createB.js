s3.createBucket({ Bucket: bucketName, ACL : 'public-read' }, function (err, data) {
    if (!err) {
        console.log(data);  // successfull response
        return response.send(data)
        // data: {
        //      Location: "http://examplebucket.s3.amazonaws.com/"
        // }
    } else {
        console.log(err) // an error occurred
        return response.send(err)
    }
});