import express from "express";
import {
     createBlog,
     allBlogs,
     blogById, 
     searchBlog,
     deleteBlogById,
    updateBlog,
    createComment,
    makeComment,
    allcomment,
    } from "../controller/blogcontroller";
import fileUpload from "../helper/multer";
import Authorization from "../middleware/Authentication";
import CommentPermit from "../middleware/Authenticationcomment";

const blogRoutes = express.Router();
blogRoutes.post("/createBlog", Authorization, fileUpload.single("bogImage"), createBlog);
blogRoutes.get("/readAllBlogs", allBlogs);
blogRoutes.get("/readById/:id",blogById);
blogRoutes.get("/searchBlog", searchBlog);
blogRoutes.delete("/deleteBlog/:id", Authorization, deleteBlogById);
blogRoutes.put("/updateBlog/:id", Authorization, fileUpload.single("bogImage"), updateBlog);
blogRoutes.post("/:id/comment", CommentPermit,fileUpload.single("bogImage"), createComment);
blogRoutes.post("/mycoment/:id", CommentPermit,fileUpload.single("bogImage"), makeComment);
blogRoutes.get("/allcomments", allcomment);

export default blogRoutes;