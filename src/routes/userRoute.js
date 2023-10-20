import express from "express";
import Authorization from "../middleware/Authentication";
import { 
    SignUp,
    userLoginFunction,
    deleteUser,
    userUpdate,
    ViewUsers,
    viewUserById,
 } from "../controller/userController";
import fileUpload from "../helper/multer";
// import NormaalAuthorise from "../middleware/NormalUserAuthentication";

const usersRoute = express.Router();
usersRoute.post("/signup",fileUpload.single("Profile"),SignUp);
usersRoute.post("/login",fileUpload.single("Profile"), userLoginFunction);
usersRoute.put("/users/update/:id",fileUpload.single("Profile"), userUpdate);
usersRoute.delete("/users/delete/:id",Authorization,deleteUser);
usersRoute.get("/users/view/all", ViewUsers);
usersRoute.get("/users/byId/:id",viewUserById);



export default usersRoute;