import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Subject: {
      type: String,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    Reply: {
      type: String,
      default: "",
    }
  });

const ContactTable = mongoose.model("Contact_Us", contactSchema);
export default ContactTable;
