const express = require('express');
const multer = require('multer');
import fileUpload from '../helper/multer';
const contactController = require('../controller/contactController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/send/contact/info', upload.single('attachment'), contactController.sendContactMessage);

module.exports = router;
