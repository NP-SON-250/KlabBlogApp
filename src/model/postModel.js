import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    Posted_On: {type: Date, default: Date.now},
    Post_Image: {type: String, require: true},
    Post_Title:{type: String, require: true},
    Post_Content:{type: String, require: true},
    Posted_By: {type: mongoose.Schema.ObjectId, ref: 'users'},
    Comments: [{type: mongoose.Schema.ObjectId, ref: 'comments'}],
});

const Posts = mongoose.model('posts',postSchema);
export default Posts;