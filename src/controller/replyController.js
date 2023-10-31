import replyModel from "../model/replyModel";
import Users from "../model/userModel";
import Comments from "../model/commentModel";
import { uploadToCloud } from "../helper/cloud";


export const addReply = async (req, res) =>{
    try {
        const {commentId} = req.params;
        const user = req.loaggedInUser._id;
        const {userReply} = req.body;
        if(!userReply){
            return res.status(400).json({
                status: "400",
                message: "Please, add a reply",
            });
        };
        const findComentId = await Comments.findById(commentId);
        if(!findComentId){
            return res.status(404).json({
                status: "404",
                message: "Comment not found",
            });
        }
        const createReply = await replyModel.create({
            commentId,
            repliedBy: user,
            userReply,
        });

        // adding reply to the comment it blongs to

        const updateComment = await Comments.findByIdAndUpdate(
            commentId,
            {$push: {replies: replyModel._id}},
            {new: true},
            );
            return res.status(201).json({
                status: "201",
                message: "Reply added successfully",
                data: createReply,
              });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to add a reply",
            error: error.message,
        });
        
    }
};
// getting all replies