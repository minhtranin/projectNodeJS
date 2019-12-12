var accessKeyId = '7TMDWY6MN5VNQHNZ9MNE';
var secretAccessKey = 'fRTzowitSpRzE0CvLMv9onUynQjkI51LZ8anrRDt';

var wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
var s3 = new AWS.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: 'us-east-1'
    
});
var filePath = './img/vd1.mp4'
var params = {
  Bucket: 'mediaAdmin',
  Key: path.basename(filePath),
  Body: fs.createReadStream(filePath),
  ContentType: 'video/mp4',   
  ACL:'public-read-write',
};

  var options = {
  partSize: 10 * 1024 * 1024, // 10 MB
  queueSize: 10
};

const status  = await s3.upload(params, function(err, resp) {
  if(err){
      console.log("error in s3 put object cb");
  } else { 
      console.log(resp);
      console.log("successfully added image to s3");
  }
}).promise()
console.log(status);

return response.send(status)
