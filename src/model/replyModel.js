import mongoose from "mongoose";
const replySchema = new mongoose.Schema({
    commentId: {type: mongoose.Types.ObjectId, ref: "comments"},
    repliedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    userReply: {type: String, require: true},
}, {timestamps: true});
const replyModel = mongoose.model("replies",replySchema);
export default replyModel;