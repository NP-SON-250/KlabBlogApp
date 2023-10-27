import Users from "../model/userModel";
import Posts from "../model/postModel";
import Comments from "../model/commentModel";
import { uploadToCloud } from "../helper/cloud";
import Jwt from "jsonwebtoken";
import bcrypt, {genSalt, hash} from "bcrypt";

//user registration side

export const signUp = async (req,res) =>{
    try {
        const {firstName, lastName,email,password,profile} = req.body;
        if(!firstName || !lastName || !email || !password){
          return res.status(400).json({
            status:"400",
            message:"All Fields Are Required",
          });
        }
        const verifyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!verifyEmail.test(email)) {
          return res.status(400).json({
              status: "400",
              message: "Invalid Email format",
          });
      }
      const checkEmail = await Users.findOne({email});
      if(checkEmail) {
        return res.status(400).json({
            status: "400",
            message: "Email Used In Our Database",
        });
      }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
          return res.status(400).json({
              status: "400",
              message: "Password should be at least 8 characters long and contain a mix of numbers and characters",
          });
      }

      let savedProfile;
      if(req.file) savedProfile = await uploadToCloud(req.file, res);
      const encryptPass = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, encryptPass);
      const registerUser = await Users.create({
          firstName,
          lastName,
          email,
          password: hashedPass,
          profile: savedProfile?.secure_url || "https://res.cloudinary.com/da12yf0am/image/upload/v1696850499/pbxwlozt1po8vtbwyabc.jpg",
      });
      return res.status(200).json({
        status: "200",
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
        email: req.body.email,
      });
      if(!userLogin){
        return res.status(404).json({
          status: "404",
          message: "User Not Found",
        });
      }
      const isMatch = await bcrypt.compare(req.body.password, userLogin.password);
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


  export const viewUsers = async (req, res) => {
    try {
      const users = await Users.find()
        .populate('createdPosts', 'postTitle postContent postImage');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  // Get a specific user by ID
  export const viewUserById = async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).populate('createdPosts', 'postTitle postContent postImage');
      res.json(user);
      if (!user) {
        return res.status(404).json({
          status: "404",
          message: "User not found",
        });
      }
  
      return res.status(200).json({
        status: "200",
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: "500",
        message: "Failed to retrieve a User",
        error: error.message,
      });
    }
  };

//update user
export const userUpdate = async (req, res) =>{
  const { id } = req.params;
  try {
  const {firstName, lastName, email, password, profile,role} = req.body;
  const checkEmail = await Users.findOne({email});
      if(checkEmail) {
        if(checkEmail._id != id){
          return res.status(400).json({
            status: "400",
            message: "Email Used In Our Database",
        })
        }
      }
      let updatedProfile;
      if(password){
        const encryptPass = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password,encryptPass);
    if(req.file) updatedProfile = await uploadToCloud(req.file, res);
    const userUpdate = await Users.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      password: hashedPass,
      profile: updatedProfile?.secure_url,
      role,
    });
    return res.status(200).json({
      status: "200",
      message: "User Update succeed",
 
    });
      }
      else{
        if(req.file) updatedProfile = await uploadToCloud(req.file, res);
    const userUpdate = await Users.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      profile: updatedProfile?.secure_url || "https://res.cloudinary.com/da12yf0am/image/upload/v1696850499/pbxwlozt1po8vtbwyabc.jpg",
      role,
    });
    return res.status(200).json({
      status: "200",
      message: "User Update succeed",
 
    });
      }
 
} catch (error) {
 return res.status(500).json({
   status: "500",
   message: "Failded to Update User Data",
   error: error.message
 })
 
}
};
// delete user


export const deleteUser = async (req, res) =>{
  try {
    const {id} = req.params;

    // Find the user by ID
    const findUser = await Users.findById(id);
    if (!findUser) {
      return res.status(404).json({
        status: "404",
        message: "User not found",
      });
    };
    const deletedUser = await Users.findByIdAndDelete(id);

    return res.status(200).json({
      status: "200",
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Error occurred",
      error: error.message,
    });
  }
};
