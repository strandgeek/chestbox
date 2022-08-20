import * as AWS from "aws-sdk";
import { randomUUID } from "crypto";

const BUCKET_NAME = process.env.AWS_S3_BUCKET!;
const AWS_KEY_ID = process.env.AWS_KEY_ID!;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY!;

const s3bucket = new AWS.S3({
  accessKeyId: AWS_KEY_ID,
  secretAccessKey: AWS_ACCESS_KEY
});

export const uploadToS3 = async (base64: string): Promise<AWS.S3.ManagedUpload.SendData> => {
  const readStream = Buffer.from(base64, 'base64')
  const params: AWS.S3.PutObjectRequest = {
    Bucket: BUCKET_NAME,
    Key: `images/${randomUUID()}`,
    Body: readStream,
    ACL: 'public-read',
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, function(err: any, data: AWS.S3.ManagedUpload.SendData) {
      if (err) {
        return reject(err);
      }
      
      return resolve(data);
    });
  });
}
