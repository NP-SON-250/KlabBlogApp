import express from "express";
import { 
    userSignUp,
    viewAllUsers,
    userUpdate,
    deleteUserById,
    userLoginFunction,
 } from "../controller/usercontroller";
 import fileUpload from "../helper/multer";
 const userRoute = express.Router();
    userRoute.post("/createuser", fileUpload.single("Profile"), userSignUp);
    userRoute.get("/read", viewAllUsers);
    userRoute.put("/update/:id", fileUpload.single("Profile"), userUpdate);
    userRoute.post("/login",fileUpload.single("Profile"), userLoginFunction);
    userRoute.delete("/DeleteUser/:id",deleteUserById);
 export default userRoute;
