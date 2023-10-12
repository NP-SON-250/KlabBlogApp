import express from "express";
import {
     createBlog,
     allBlogs,
     blogById, 
     deleteBlogById,
    updateBlog,
    } from "../controller/blogcontroller";
import fileUpload from "../helper/multer";
import Authorization from "../middleware/Authentication";

const blogRoutes = express.Router();
blogRoutes.post("/create", Authorization, fileUpload.single("bogImage"), createBlog);
blogRoutes.get("/read", allBlogs);
blogRoutes.get("/read/:id",blogById);
blogRoutes.delete("/delete/:id", Authorization, deleteBlogById);
blogRoutes.put("/update/:id", Authorization, fileUpload.single("bogImage"), updateBlog);


export default blogRoutes;