import express from "express";
import {adminAuthorization} from "../middleware/Authentication";
import {
    signUp,
    userLoginFunction,
    userUpdate,
    deleteUser,
    viewUsers,
    viewUserById,
} from "../controller/userController";
import fileUpload from "../helper/multer";

//define route
const usersRoute = express.Router();
usersRoute.post("/signup",fileUpload.single("profile"),signUp);
usersRoute.post("/login",fileUpload.single("profile"), userLoginFunction);
usersRoute.put("/users/update/:id",fileUpload.single("profile"), userUpdate);
usersRoute.delete("/users/delete/:id",adminAuthorization,deleteUser);
usersRoute.get("/users/view/all",viewUsers);
usersRoute.get("/users/byId/:id",viewUserById);



export default usersRoute;