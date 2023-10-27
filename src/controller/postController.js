import Posts from "../model/postModel";
import Users from "../model/userModel";
import Comments from "../model/commentModel";
import { uploadToCloud } from "../helper/cloud";


// Create a new post
export const createPost = async (req, res) => {
  try {
    const user = req.loggedInUser._id;
    const { postImage, postTitle, postContent } = req.body;
    if(!postTitle || !postContent){
      return res.status(400).json({
        status:"400",
        message:"All Fields Are Required",
      });
    }
    const checkPostTitle = await Posts.findOne({
      postTitle: req.body.postTitle,
    });
    if(checkPostTitle){
      return res.status(500).json({
        status: "500",
        message: "Post Title Exist in database",
      })
    }

    let savedPostImage;
      if(req.file) savedPostImage = await uploadToCloud(req.file, res);

    const post = await Posts.create({
      postImage: savedPostImage?.secure_url,
      postTitle,
      postContent,
      postedBy: user, 
    });

    // Add the created post to the user's Created_Posts field
    await Users.findByIdAndUpdate(
      req.loggedInUser._id,
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
    const addView = await Posts.findByIdAndUpdate(req.params.id,{
      $inc:{
        views:1,
      },
    })
    if (!post) {
      return res.status(404).json({
        status: "404",
        message: "Post not found",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Post retrieved successfully",
      data: addView,
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
  const user = req.loggedInUser._id;
  const { postImage, postTitle, postContent } = req.body;
  const getId = await Posts.findById(id);
  if (!getId)
    return res.status(404).json({
      status: "404",
      message: "Post ID not found",
      
    });
    const checkPostTitle = await Posts.findOne({
      postTitle: req.body.postTitle,
   });
   if(checkPostTitle){
     if(checkPostTitle._id != id){
      return res.status(500).json({
        status: "500",
        message: "Post title exist in database",
      })
     }
   }
    let updatedPastImage;
    if(req.file) updatedPastImage = await uploadToCloud(req.file, res);
    const postUpdate = await Posts.findByIdAndUpdate(id, {
      postImage:  updatedPastImage?.secure_url,
      postTitle,
      postContent, 
      postedBy: user,
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
 

// Like a post
export const likePost = async (req, res) => {
  const { id } = req.params;
  const user = req.loggedInUser._id;
  try {
    const findPostId = await Posts.findById(id);
    if (!findPostId) {
      return res.status(404).json({
        status: "404",
        message: "Post not found",
      });
    }
    // Check if the user has already disliked the post
    const alreadyDisliked = findPostId.unLikedBy.includes(user);

    if (alreadyDisliked) {
      // Remove the user from the unLikedBy array
      const findPostIdAndRemoveDislike = await Posts.findByIdAndUpdate(
        id,
        {
          $inc: { unLike: -1 },
          $pull: { unLikedBy: user }, // Remove the user from unLikedBy
        },
        { new: true }
      );
    }
    
    else {
      // Check if the user has already liked the post
      const alreadyLiked = findPostId.likedBy.includes(user);

      if (alreadyLiked) {
        return res.status(400).json({
          status: "400",
          message: "You have already liked this post",
        });
      }

      const findPostIdAndLike = await Posts.findByIdAndUpdate(
        id,
        {
          $inc: { likes: 1 },
          $addToSet: { likedBy: user },
        },
        { new: true }
      );

      if (findPostIdAndLike) {
        return res.status(200).json({
          message: "Your like to this added",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to add your like",
      error: error.message,
    });
  }
};

// Un-like a post
export const unLikePost = async (req, res) => {
  const { id } = req.params;
  const user = req.loggedInUser._id;
  try {
    const findPostId = await Posts.findById(id);
    if (!findPostId) {
      return res.status(404).json({
        status: "404",
        message: "Post not found",
      });
    }

    // Check if the user has already liked the post
    const alreadyLiked = findPostId.likedBy.includes(user);

    if (alreadyLiked) {
      return res.status(400).json({
        status: "400",
        message: "You have already liked this post. Cannot dislike it.",
      });
    }

    // Check if the user has already disliked the post
    const alreadyDisliked = findPostId.unLikedBy.includes(user);

    if (alreadyDisliked) {
      return res.status(400).json({
        status: "400",
        message: "You have already disliked this post",
      });
    }

    const findPostIdAndUnLike = await Posts.findByIdAndUpdate(
      id,
      {
        $inc: { unLike: 1 },
        $addToSet: { unLikedBy: user },
      },
      { new: true }
    );

    if (findPostIdAndUnLike) {
      return res.status(200).json({
        message: "You disliked this post",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to add your like",
      error: error.message,
    });
  }
};
