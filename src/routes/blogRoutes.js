import express from "express";
import {
     createBlog,
     allBlogs,
     blogById, 
     deleteBlogById,
    updateBlog,
    createComment,
    } from "../controller/blogcontroller";
import fileUpload from "../helper/multer";
import Authorization from "../middleware/Authentication";

const blogRoutes = express.Router();
blogRoutes.post("/createBlog", Authorization, fileUpload.single("bogImage"), createBlog);
blogRoutes.get("/readAllBlogs", allBlogs);
blogRoutes.get("/readById/:id",blogById);
blogRoutes.delete("/deleteBlog/:id", Authorization, deleteBlogById);
blogRoutes.put("/updateBlog/:id", Authorization, fileUpload.single("bogImage"), updateBlog);
blogRoutes.post("/:id/comment", createComment);

export default blogRoutes;