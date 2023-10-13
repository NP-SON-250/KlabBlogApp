import userModel from "../modules/users";
import { uploadToCloud } from "../helper/cloud";
import Jwt  from "jsonwebtoken";
import bcrypt, {genSalt, hash} from "bcrypt";

//Registering User

export const userSignUp = async (req, res) =>{
    try {
        const {First_Name,Last_Name, email, Password, Profile} = req.body;
        const userEmail = await userModel.findOne({
          email: req.body.email,
        });
        if(userEmail){
          return res.status(500).json({
            status: "500",
            message: "Email Exist in database",
          })
        }
        let userReg;
        if(req.file) userReg = await uploadToCloud(req.file, res);
        const encryptpass = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(Password,encryptpass);
        const userRegister = await userModel.create({
            First_Name,
            Last_Name,
            email,
            Password: hashedpass,
            Profile: userReg?.secure_url,
        });
        return res.status(201).json({
            status: "201",
            message: "User Registration Success",
            data: userRegister,
        });
        
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "User registration failed",
            error: error.message,
        });
        
    }
};

//Login Page

export const userLoginFunction = async (req, res) => {
  try {
    const userLogin =await userModel.findOne({
      email: req.body.email,
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
}

// Read Registered User

export const viewAllUsers = async (req,res) =>{
    try {
      const getAllUsersInfo = await userModel.find();
      return res.status(200).json({
        status: "200",
        message: "Data about all users are here:",
        data: getAllUsersInfo,
      })
    } catch (error) {
      return res.status(500).json({
        statusbar: "500",
        message: "failed To Display Users Information",
        error: error.message,
  
      });
      
    }
  };

  // Updating Users' Information

  export const userUpdate = async (req, res) =>{
    const { id } = req.params;
    try {
    const {First_Name, Last_Name, email, Password, Profile,role} = req.body;
    const getId = await userModel.findById(id);
    if (!getId)
      return res.status(404).json({
        satus:"404",
        message: "User Id Not Found",
        
      });

      const userEmail = await userModel.findOne({
        email: req.body.email,
      });
      if(userEmail){
        return res.status(500).json({
          status: "500",
          message: "Email Exist in database",
        })
      }
      let result;
        const encryptpass = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(Password,encryptpass);
      if(req.file) result = await uploadToCloud(req.file, res);
      const userUpdate = await userModel.findByIdAndUpdate(id, {
        First_Name,
        Last_Name, 
        email,
        Password: hashedpass,
        Profile:  result?.secure_url || "https://res.cloudinary.com/da12yf0am/image/upload/v1696850499/pbxwlozt1po8vtbwyabc.jpg",
        role,
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

 export const deleteUserById = async (req, res) =>{
  try {
    const {id} = req.params;
    const findid = await userModel.findById(id);
    if(!findid)
    return res.status(404).json({
      statusbar: "404",
      message: "User Id Not Found",
});
const deletefoundid = await userModel.findByIdAndDelete(id);
return res.status(200).json({
  statusbar: "200",
  message: "User Deleted Successfully",
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
