import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    postedOn: {type: Date, default: Date.now},
    postImage: {type: String, require: true},
    postTitle:{type: String, require: true},
    postContent:{type: String, require: true},
    postedBy: {type: mongoose.Schema.ObjectId, ref: 'users'},
    comments: [{type: mongoose.Schema.ObjectId, ref: 'comments'}],
});

const Posts = mongoose.model('posts',postSchema);
export default Posts;