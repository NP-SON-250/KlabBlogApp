import Comments from "../model/commentModel";
import Posts from "../model/postModel";
import Users from "../model/userModel";

export const addComment = async (req, res) => {
  try {
    const {Post_Id} = req.params;
    const user = req.Users;
    const checkBlog = await Posts.findById(Post_Id);
    if(!checkBlog){
      return res.status(404).json({
        status: "404",
        message: "Post ID Not Found",
      });
    }
    const {User_Comment} = req.body;
    const comment = await Comments.create({
      Post_Id,
      Post_Commentor: user._id, 
      User_Comment,
    });

    // Add the comment to the post's Comments array
    const updatePost = await Posts.findByIdAndUpdate(
      Post_Id,
      { $push: { Comments: comment._id } }, 
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
      message: "Failed to add comment",
      error: error.message,
    });
  }
};





export const getAllComments = async (req, res) => {
    try {
      const commentView = await Comments.find()
        // .populate("User_ID", "First_Name Last_Name Email Profile")
        .populate("Post_Id", "Post_Title Post_Content Profile").populate("Post_Commentor", "First_Name Last_Name Profile")
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

 
  
  // Get comments for a single user by ID
export const getCommentsByUserId = async (req, res) => {
    try {
      const comments = await Comments.find({ User_ID: req.params.id })
        .populate("User_ID", "First_Name Last_Name Email")
        .populate("Post_Id", "Post_Title");
  
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
  
  // Get comments on a post by Post ID
export const getCommentsByPostId = async (req, res) => {
    try {
      const comments = await Comments.find({ Post_Id: req.params.id })
        .populate("User_ID", "First_Name Last_Name Email")
        .populate("Post_Id", "Post_Title");
  
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