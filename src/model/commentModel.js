import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    
    commentDate: {type: Date, default: Date.now},
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'posts'},
    postCommentor: {type: mongoose.Schema.ObjectId, ref: 'users'},
    userComment: {type: String, require: true},

});
const Comments = mongoose.model('comments', commentSchema);
export default Comments;