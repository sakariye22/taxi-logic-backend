const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// Initialize GridFS Bucket
const conn = mongoose.createConnection(process.env.MONGODB_URL, {

});

let gfs;
conn.once('open', () => {
  // Initialize stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
});

const storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
        console.log('Multer is processing file:', file.originalname);
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });
/*console.log('Upload middleware in gridConfig:', upload);
function initGfs(mongoConnection) {
    return new mongoose.mongo.GridFSBucket(mongoConnection.db, { bucketName: 'uploads' });
  }*/
  
module.exports = upload ;



 //initGfs