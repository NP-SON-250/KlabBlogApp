import express from "express";
import Authorization from "../middleware/Authentication";
import fileUpload from "../helper/multer";

import { 
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
 } from "../controller/postController";

const postRoute = express.Router();

postRoute.post("/create",Authorization,fileUpload.single("Post_Image"),createPost);
postRoute.get("/post/get/all",getAllPosts);
postRoute.get("/post/ge/:id",getPostById)
postRoute.put("/post/update/:id", Authorization,fileUpload.single("Post_Image"), updatePost);
postRoute.delete("/post/delete/:id", Authorization,deletePost);
export default postRoute;