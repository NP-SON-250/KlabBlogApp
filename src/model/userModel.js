import mongoose from "mongoose";
import { Schema } from "mongoose";


// creating Users' model

const userSchema = new Schema({
    First_Name: {
        type: String,
        require: true
    },
    Last_Name: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    },
    Profile: {
        type: String,
        require: false,
    },
    Role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    Registered_On: {type: Date, default: Date.now},
    Created_Posts: [{
        type: Schema.Types.ObjectId, ref: "posts"
    }]
});
const Users = mongoose.model('users',userSchema);
export default Users;

