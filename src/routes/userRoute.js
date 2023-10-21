import express from "express";
import {adminAuthorization, normalUserAuthentication} from "../middleware/Authentication";
import { 
    signUp,
    userLoginFunction,
    deleteUser,
    userUpdate,
    viewUsers,
    viewUserById,
 } from "../controller/userController";
import fileUpload from "../helper/multer";
// import NormaalAuthorise from "../middleware/NormalUserAuthentication";

const usersRoute = express.Router();
usersRoute.post("/signup",fileUpload.single("profile"),signUp);
usersRoute.post("/login",fileUpload.single("profile"), userLoginFunction);
usersRoute.put("/users/update/:id",fileUpload.single("profile"), userUpdate);
usersRoute.delete("/users/delete/:id",adminAuthorization,deleteUser);
usersRoute.get("/users/view/all",viewUsers);
usersRoute.get("/users/byId/:id",viewUserById);



export default usersRoute;