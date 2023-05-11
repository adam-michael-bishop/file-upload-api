import { s3Client } from "./libs/s3Client.js";
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
        fileName: file.originalname,
        fileSize: file.size
      });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

app.get('/', (req, res) => {
  res.send('Hello World!!!!');
});

app.post("/upload", upload.array('file'), (req, res) => {
  res.send({
    success: true,
    
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});