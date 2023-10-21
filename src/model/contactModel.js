const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  attachment: String, // File path or URL for the uploaded file
});

module.exports = mongoose.model('Contact', contactSchema);
