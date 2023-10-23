import Posts from "../model/postModel";
import Users from "../model/userModel";
import Comments from "../model/commentModel";
import { uploadToCloud } from "../helper/cloud";


// Create a new post
export const createPost = async (req, res) => {
  try {
    const user = req.Users;
    const { postImage, postTitle, postContent } = req.body;
    if(!postTitle || !postContent){
      return res.status(400).json({
        status:"400",
        message:"All Fields Are Required",
      });
    }
    const checkposttitle = await Posts.findOne({
      postTitle: req.body.postTitle,
    });
    if(checkposttitle){
      return res.status(500).json({
        status: "500",
        message: "Post Title Exist in database",
      })
    }

    let savePostImage;
      if(req.file) savePostImage = await uploadToCloud(req.file, res);

    const post = await Posts.create({
      postImage: savePostImage?.secure_url || "https://res.cloudinary.com/da12yf0am/image/upload/v1696850499/pbxwlozt1po8vtbwyabc.jpg",
      postTitle,
      postContent,
      postedBy: user._id, 
    });

    // Add the created post to the user's Created_Posts field
    await Users.findByIdAndUpdate(
      req.Users._id,
      { $push: { createdPosts: post._id } },
      { new: true }
    );

    return res.status(201).json({
      status: "201",
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to create post",
      error: error.message,
    });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({})
      .populate('postedBy', 'firstName lastName profile').populate({path:"comments",populate:{path: "postCommentor", select: "firstName lastName email profile"}});
      
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a specific post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id).populate("postedBy", "firstName lastName profile").populate({path:"comments",populate:{path: "postCommentor", select: "firstName lastName email profile"}});

    if (!post) {
      return res.status(404).json({
        status: "404",
        message: "Post not found",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve post",
      error: error.message,
    });
  }
};


// Update a post by the user who created it
export const updatePost = async (req, res) =>{
  const { id } = req.params;
  try {
  const user = req.Users;
  const { postImage, postTitle, postContent } = req.body;
  const getId = await Posts.findById(id);
  if (!getId)
    return res.status(404).json({
      status: "404",
      message: "Post ID not found",
      
    });
    const checposttitle = await Posts.findOne({
      postTitle: req.body.postTitle,
   });
   if(checposttitle){
     if(checposttitle._id != id){
      return res.status(500).json({
        status: "500",
        message: "Post title exist in database",
      })
     }
   }
    let updatePastImage;
    if(req.file) updatePastImage = await uploadToCloud(req.file, res);
    const postUpdate = await Posts.findByIdAndUpdate(id, {
      postImage:  updatePastImage?.secure_url || "https://res.cloudinary.com/da12yf0am/image/upload/v1696850499/pbxwlozt1po8vtbwyabc.jpg",
      postTitle,
      postContent, 
      postedBy: user._id,
    });

    return res.status(200).json({
     statusbar: "200",
     message: "Post updated successfully",

   });
 
} catch (error) {
 return res.status(500).json({
   statusbar: "500",
   message: "Failded to update post",
   error: error.message
 })
 
}
};


export const deletePost = async (req, res) =>{
  try {
    const {id} = req.params;

    // Find the post by ID
    const findPost = await Posts.findById(id);
    if (!findPost) {
      return res.status(404).json({
        statusbar: "404",
        message: "Post not found",
      });
    }

    // Delete comments associated with the post
    const findPostInCommentAndDelete = await Comments.deleteMany({ postId: id });

    // Delete the post itself
    const deletedPost = await Posts.findByIdAndDelete(id);

    return res.status(200).json({
      statusbar: "200",
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "500",
      message: "Failed to delete post",
      error: error.message,
    });
  }
};

