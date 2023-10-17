import mongoose from "mongoose";

const contactusSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true,
    },
    Email: {
        type: String,
        require: true,
        unique: true,
    },
    Message: {
        type: String,
        require: true,
    },
    Date: {type: Date, default: Date.now}
});
const ContactTable = mongoose.model("ContactUs",contactusSchema);
export default ContactTable;