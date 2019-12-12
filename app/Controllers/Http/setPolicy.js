var bucketParams = {Bucket: 'mediaAdmin'};
  var readOnlyAnonUserPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "AddPerm",
        Effect: "Allow",
        Principal: "*",
        Action: [
          "s3:GetObject"
        ],
        Resource: [
          ""
        ]
      }
    ]
  };
  var bucketResource = "arn:aws:s3:::" + 'mediaAdmin' + "/*";
readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;
var bucketPolicyParams = {Bucket: 'mediaAdmin', Policy: JSON.stringify(readOnlyAnonUserPolicy)};

s3.putBucketPolicy(bucketPolicyParams, function(err, data) {
  if (err) {
    // display error message
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});