import blogmode from "../modules/blogmodules";
import { uploadToCloud } from "../helper/cloud";

//Creating Blog

export const createBlog = async (req, res) =>{
  try {
    const {bogImage, blogTitle, blogContent, blogComment} = req.body;
    const checblogtitle = await blogmode.findOne({
      blogTitle: req.body.blogTitle,
    });
    if(checblogtitle){
      return res.status(500).json({
        status: "500",
        message: "Blog Title Exist in database",
      })
    }
    let result;
    if(req.file) result = await uploadToCloud(req.file, res);
    const Blog = await blogmode.create({
    bogImage:  result?.secure_url || "https://res.cloudinary.com/da12yf0am/image/upload/v1696850499/pbxwlozt1po8vtbwyabc.jpg",
    blogTitle,
    blogContent,
    blogComment: [{
      user: String,  // Assuming you want to store the username of the commenter
      comment: String
    }],
    author: req.userModel.First_Name,
    authorP: req.userModel.Profile,
  },
  {timestamps: true});
  return res.status(200).json({
    message: "Your Blog Has Saved",
    data: Blog,
  })
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Failied To Create Blog",
      error: error.message,
    });
  }
};

//getting all data

export const allBlogs = async (req,res) =>{
  try {
    const gettaallinfo = await blogmode.find();
    return res.status(200).json({
      statusbar: "You Made It",
      message: "All Blogs Are here:",
      data: gettaallinfo,
    })
  } catch (error) {
    return res.status(500).json({
      statusbar: "Sorry Something Went Wrong",
      message: "failed To Display Blog Information",
      error: error.message,

    });
    
  }
};

// Getting Blog By Blog id

export const blogById = async (req,res) =>{
  try {
    const {id} = req.params;
    const blogid = await blogmode.findById(id);
    if(!blogid){
      return res.status(404).json({
        message: "Blog Id Not Found",
      });

    }
    return res.status(200).json({
      statusbar: "Blog Id Found",
      message: "Congratrations",
      data: blogid,
    })
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Id Not Found 🤦‍♀️🤦‍♀️",
      error: error.message,
    });
    
  }
};
// Deleting Blog By Blog Id

export const deleteBlogById = async (req, res) =>{
  try {
    const {id} = req.params;
    const findid = await blogmode.findById(id);
    if(!findid)
    return res.status(404).json({
      statusbar: "404",
      message: "Blog Id Not Found",
});
const deletefoundid = await blogmode.findByIdAndDelete(id);
return res.status(200).json({
  statusbar: "200",
  message: "Blog Deleted Successfully",
  data: deletefoundid,
});
  } catch (error) {
    return res.status(500).json({
      statusbar: "500",
      message: "Error Occured",
      error: error.message,
  
    });
    
  }
};

 //Updating Blog By Id
 
 export const updateBlog = async (req, res) =>{
   const { id } = req.params;
   try {
   const {bogImage, blogTitle, blogContent} = req.body;
   const getId = await blogmode.findById(id);
   if (!getId)
     return res.status(404).json({
       message: "Id not Found",
       
     });
     const checblogtitle = await blogmode.findOne({
      blogTitle: req.body.blogTitle,
    });
    if(checblogtitle){
      return res.status(500).json({
        status: "500",
        message: "Blog Title Exist in database",
      })
    }
     let result;
     if(req.file) result = await uploadToCloud(req.file, res);
     const blogUpdate = await blogmode.findByIdAndUpdate(id, {
      bogImage:  result?.secure_url || "https://res.cloudinary.com/da12yf0am/image/upload/v1696850499/pbxwlozt1po8vtbwyabc.jpg",
      blogTitle,
      blogContent, 
      author: req.userModel.First_Name,
      authorP: req.userModel.Profile,
     },
     {timestamps: true});

     return res.status(200).json({
      statusbar: "200",
      message: "Blog Update success",

    });
  
 } catch (error) {
  return res.status(500).json({
    statusbar: "500",
    message: "Failded to Update",
    error: error.message
  })
  
 }
};