import Posts from "../model/postModel";
import Users from "../model/userModel";
import Comments from "../model/commentModel";
import { uploadToCloud } from "../helper/cloud";


// Create a new post
export const createPost = async (req, res) => {
  try {
    const user = req.Users;
    const { Post_Image, Post_Title, Post_Content } = req.body;
    if(!Post_Image || !Post_Title || !Post_Content){
      return res.status(400).json({
        status:"400",
        message:"All Fields Are Required",
      });
    }
    const checkposttitle = await Posts.findOne({
      Post_Title: req.body.Post_Title,
    });
    if(checkposttitle){
      return res.status(400).json({
        status: "400",
        message: "Post Title Exist in database",
      })
    }

    let userReg;
      if(req.file) userReg = await uploadToCloud(req.file, res);

    const post = await Posts.create({
      Post_Image: userReg?.secure_url || "https://res.cloudinary.com/da12yf0am/image/upload/v1696850499/pbxwlozt1po8vtbwyabc.jpg",
      Post_Title,
      Post_Content,
      Posted_By: user._id, 
    });

    // Add the created post to the user's Created_Posts field
    await Users.findByIdAndUpdate(
      req.Users._id,
      { $push: { Created_Posts: post._id } },
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
      .populate('Posted_By', 'First_Name Last_Name Profile').populate({path:"Comments",populate:{path: "Post_Commentor", select: "First_Name Last_Name Email Profile"}})
      
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a specific post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id).populate("Posted_By", "First_Name Last_Name").populate({path:"Comments",populate:{path: "Post_Commentor", select: "First_Name Last_Name Email Profile"}});

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


// Update a post

export const updatePost = async (req, res) =>{
  const { id } = req.params;
  try {
  const user = req.Users;
  const { Post_Image, Post_Title, Post_Content } = req.body;
  const getId = await Posts.findById(id);
  if (!getId)
    return res.status(404).json({
      status: "404",
      message: "Id not Found",
      
    });
    const checposttitle = await Posts.findOne({
      Post_Title: req.body.Post_Title,
   });
   if(checposttitle){
     return res.status(500).json({
       status: "500",
       message: "Post Title Exist in database",
     })
   }
    let result;
    if(req.file) result = await uploadToCloud(req.file, res);
    const postUpdate = await Posts.findByIdAndUpdate(id, {
      Post_Image:  result?.secure_url || "https://res.cloudinary.com/da12yf0am/image/upload/v1696850499/pbxwlozt1po8vtbwyabc.jpg",
      Post_Title,
      Post_Content, 
      Posted_By: user._id,
    },
    {timestamps: true});

    return res.status(201).json({
     statusbar: "201",
     message: "Post Update success",

   });
 
} catch (error) {
 return res.status(500).json({
   statusbar: "500",
   message: "Failded to Update Post",
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
        message: "Blog Id Not Found",
      });
    }

    // Delete comments associated with the post
    const findPostInComment = await Comments.deleteMany({ Post_Id: id });

    // Delete the post itself
    const deletedPost = await Posts.findByIdAndDelete(id);

    return res.status(200).json({
      statusbar: "200",
      message: "Blog Deleted Successfully",
      data: deletedPost,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "500",
      message: "Error Occurred",
      error: error.message,
    });
  }
};

