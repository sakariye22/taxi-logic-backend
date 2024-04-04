const express = require ('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require("../middleware/authenticate-token")
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' }); // Spara filer i 'uploads' mappen på servern
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Anger mappen där filerna ska sparas
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // Skapar ett unikt filnamn
    }
  });
  
  const upload = multer({ storage: storage });



const {protectedUser, workHours, earningsOverview,updateDriverProfile,getDriverProfile,uploadAvatar,sendContactEmail, handleMyDocuments} = require ('../driver-mapp/driverController.js');


router.get ('/protected-user', authenticateToken, protectedUser);

router.get('/workHours', workHours);

router.get('/earningsOverview', earningsOverview);

router.patch('/profile',authenticateToken, updateDriverProfile);

router.get('/driver/profile', authenticateToken, getDriverProfile);

router.post('/upload-avatar', authenticateToken, upload.single('avatar'), uploadAvatar);

router.post('/send-email', authenticateToken, sendContactEmail);

router.post('/uploadDocument', upload.single('file'), handleMyDocuments);

  
  
module.exports = router;
//aaaa