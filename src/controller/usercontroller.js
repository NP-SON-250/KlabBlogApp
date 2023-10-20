import Users from "../model/userModel";
import Posts from "../model/postModel";
import Comments from "../model/commentModel";
import { uploadToCloud } from "../helper/cloud";
import Jwt from "jsonwebtoken";
import bcrypt, {genSalt, hash} from "bcrypt";

//user registration

export const SignUp = async (req,res) =>{
    try {
        const {First_Name, Last_Name,Email,Password,Profile} = req.body;

        const verifyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!verifyEmail.test(Email)) {
          return res.status(400).json({
              status: "400",
              message: "Invalid Email format",
          });
      }
      const checkEmail = await Users.findOne({Email});
      if(checkEmail) {
        return res.status(400).json({
            status: "400",
            message: "Email Used In Our Database",
        });
      }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(Password)) {
          return res.status(400).json({
              status: "400",
              message: "Password should be at least 8 characters long and contain a mix of numbers and characters",
          });
      }

      let updateProfile;
      if(req.file) updateProfile = await uploadToCloud(req.file, res);
      const encryptpass = await bcrypt.genSalt(10);
      const hashedpass = await bcrypt.hash(Password, encryptpass);
      const registerUser = await Users.create({
          First_Name,
          Last_Name,
          Email,
          Password: hashedpass,
          Profile: updateProfile?.secure_url || "https://res.cloudinary.com/da12yf0am/image/upload/v1696850499/pbxwlozt1po8vtbwyabc.jpg",
      });
      return res.status(201).json({
        status: "201",
        message: "User Registered",
        data: registerUser,
      });

    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to proceed registration",
            error:error.message,
        });
    }
};

//Login Page

export const userLoginFunction = async (req, res) => {
    try {
      const userLogin = await Users.findOne({
        Email: req.body.Email,
      });
      if(!userLogin){
        return res.status(404).json({
          status: "404",
          message: "User Not Found",
        });
      }
      const isMatch = await bcrypt.compare(req.body.Password, userLogin.Password);
      if(!isMatch){
        return res.status(404).json({
          status: "404",
          message: "Password Incorrect",
        });
      }
      const token = await Jwt.sign(
        { id: userLogin._id},
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIREDTIME}
      );
      return res.status(200).json({
        status: "200",
        message: "User Login Succees",
        users: userLogin,
        token: token,
      })
    } catch (error) {
      return res.status(500).json({
        status: "500",
        message: "Login Failed",
        error: error.message,
      });
    }
  };


  export const ViewUsers = async (req, res) => {
    try {
      const users = await Users.find()
        .populate('Created_Posts', 'Post_Title Post_Content Post_Image');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  // Get a specific post by ID
  export const viewUserById = async (req, res) => {
    try {
      const post = await Users.findById(req.params.id).populate('Created_Posts', 'Post_Title Post_Content Post_Image');
  
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

//update user
export const userUpdate = async (req, res) =>{
  const { id } = req.params;
  try {
  const {First_Name, Last_Name, Email, Password, Profile,Role} = req.body;
      const checkEmail = await Users.findOne({Email});
      if(checkEmail) {
        return res.status(400).json({
            status: "400",
            message: "Email Used In Our Database",
        });
      }
    let updateProfile;
    if(req.file) updateProfile = await uploadToCloud(req.file, res);
    const userUpdate = await Users.findByIdAndUpdate(id, {
      First_Name,
      Last_Name,
      Email,
      Password,
      Profile: updateProfile?.secure_url || "https://res.cloudinary.com/da12yf0am/image/upload/v1696850499/pbxwlozt1po8vtbwyabc.jpg",
      Role,
    })

    return res.status(200).json({
     statusbar: "200",
     message: "User Update succeed",

   });
 
} catch (error) {
 return res.status(500).json({
   statusbar: "500",
   message: "Failded to Update User Data",
   error: error.message
 })
 
}
};
// delete user


export const deleteUser = async (req, res) =>{
  try {
    const {id} = req.params;

    // Find the post by ID
    const findUser = await Users.findById(id);
    if (!Users) {
      return res.status(404).json({
        statusbar: "404",
        message: "Blog Id Not Found",
      });
    };
    const deletedPost = await Users.findByIdAndDelete(id);

    return res.status(200).json({
      statusbar: "200",
      message: "User Deleted Successfully",
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
