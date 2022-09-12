var env = require(`../../config/env`);
const AWS = require(`aws-sdk`);
const sharp = require('sharp');
var s3 = new AWS.S3(env.S3);
var s3BucketKey = env.S3_BUCKET_NAME;

async function resizeImage() {
  var newFile = {
    Bucket: s3BucketKey,
    Key: "image.jpg",
    Body: 'C:/Users/shweta.k/Downloads/1080p.jpg',
  };
  try {
    await sharp(newFile.Body)
      .resize({ width: 1920, height: 1080 })
      .toBuffer()
      .then((buffer) => {
        newFile.Body = buffer;
      });
  } catch (error) {
    console.log(error);
  }
  return new Promise(function (resolve, reject) {
    s3.putObject(newFile, function (err, res) {
      if (err) {
        console.log(`Error saving file: ${err}`);
        return reject(err);
      }
      return resolve('Successfully saved doc to s3');
    });
  });
}

resizeImage();
