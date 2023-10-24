import Comments from "../model/commentModel";
import Posts from "../model/postModel";
import Users from "../model/userModel";

export const addComment = async (req, res) => {
  try {
    const {postId} = req.params;
    const user = req.loggedInUser._id;
    const {userComment} = req.body;
   
    const checkPost = await Posts.findById(postId);
    if(!checkPost){
      return res.status(404).json({
        status: "404",
        message: "Post not found",
      });
    }
    const comment = await Comments.create({
      postId,
      postCommentor: user, 
      userComment,
    });

    // Add the comment to the post's Comments array
    const updatePost = await Posts.findByIdAndUpdate(
      postId,
      { $push: { comments: comment._id } }, 
      { new: true }
    );

    return res.status(201).json({
      status: "201",
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to add a comment",
      error: error.message,
    });
  }
};





export const getAllComments = async (req, res) => {
    try {
      const commentView = await Comments.find()
        .populate("postId", "postTitle postContent postImage").populate("postCommentor", "firstName lastName profile")
      return res.status(200).json({
        status: "200",
        message: "Comments retrieved successfully",
        data: commentView,
      });
    } catch (error) {
      return res.status(500).json({
        status: "500",
        message: "Failed to retrieve comments",
        error: error.message,
      });
    }
  };
  
  // Get comments on a post by Post ID
export const getCommentsByPostId = async (req, res) => {
    try {
      const comments = await Comments.find({ postId: req.params.id })
        .populate("postCommentor", "firstName lastName email profilr")
        .populate("postId", "Post_Title postContent postImage");
  
      return res.status(200).json({
        status: "200",
        message: "Comments retrieved successfully",
        data: comments,
      });
    } catch (error) {
      return res.status(500).json({
        status: "500",
        message: "Failed to retrieve comments",
        error: error.message,
      });
    }
  };