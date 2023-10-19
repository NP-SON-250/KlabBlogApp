import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    
    Comment_Date: {type: Date, default: Date.now},
    Post_Id: {type: mongoose.Schema.Types.ObjectId, ref: 'posts'},
    Post_Commentor: {type: mongoose.Schema.ObjectId, ref: 'users'},
    User_Comment: {type: String, require: true},

});
const Comments = mongoose.model('comments', commentSchema);
export default Comments;