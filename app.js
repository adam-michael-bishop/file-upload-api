const express = require('express');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
