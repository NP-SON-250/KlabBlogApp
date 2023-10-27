import express from "express";
import {adminAuthorization,normalUserAuthentication} from "../middleware/Authentication";
import fileUpload from "../helper/multer";

import { 
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unLikePost,
 } from "../controller/postController";

const postRoute = express.Router();

postRoute.post("/post/create",adminAuthorization,fileUpload.single("postImage"),createPost);
postRoute.get("/post/get/all",getAllPosts);
postRoute.get("/post/get/:id",getPostById)
postRoute.put("/post/update/:id", adminAuthorization,fileUpload.single("postImage"), updatePost);
postRoute.delete("/post/delete/:id", adminAuthorization,deletePost);
postRoute.put("/post/addLike/:id", normalUserAuthentication,likePost);
postRoute.put("/post/unLike/:id",normalUserAuthentication,unLikePost);
export default postRoute;