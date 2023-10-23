import express from "express";
import {adminAuthorization} from "../middleware/Authentication";
import fileUpload from "../helper/multer";

import { 
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
 } from "../controller/postController";

const postRoute = express.Router();

postRoute.post("/post/create",adminAuthorization,fileUpload.single("postImage"),createPost);
postRoute.get("/post/get/all",getAllPosts);
postRoute.get("/post/get/:id",getPostById)
postRoute.put("/post/update/:id", adminAuthorization,fileUpload.single("postImage"), updatePost);
postRoute.delete("/post/delete/:id", adminAuthorization,deletePost);
export default postRoute;