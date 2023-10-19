import express from "express";
import commentsAuthorization from "../middleware/commentAuthontication";
import {
    
     addComment,
     getAllComments,
     getCommentsByUserId,
     getCommentsByPostId,
    } from "../controller/commentController";
import fileUpload from "../helper/multer";

const commentRoute = express.Router();



commentRoute.post("/comments/:Post_Id", commentsAuthorization,fileUpload.single("Post_Image"), addComment);
commentRoute.get("/allComments", getAllComments);
commentRoute.get("/comments/user/:id", getCommentsByUserId);
commentRoute.get("/comments/post/:id", getCommentsByPostId);

export default commentRoute;
