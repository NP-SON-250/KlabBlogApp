import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    
    postImage: {type: String, require: true},
    postTitle:{type: String, require: true},
    postContent:{type: String, require: true},
    postedBy: {type: mongoose.Schema.ObjectId, ref: 'users'},
    comments: [{type: mongoose.Schema.ObjectId, ref: 'comments'}],
    views:{
        type:Number,
        default: 0
    },
    likes:{type: Number, default: 0},
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    unLike: {type:Number, default: 0},
    unLikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
},{timestamps: true});

const Posts = mongoose.model('posts',postSchema);
export default Posts;