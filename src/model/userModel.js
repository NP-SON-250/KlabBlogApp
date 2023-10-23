import mongoose from "mongoose";
import { Schema } from "mongoose";


// creating Users' model

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    profile: {
        type: String,
        require: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    registeredOn: {type: Date, default: Date.now},
    createdPosts: [{
        type: Schema.Types.ObjectId, ref: "posts"
    }]
});
const Users = mongoose.model('users',userSchema);
export default Users;

