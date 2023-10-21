import express from "express";
import {normalUserAuthentication} from "../middleware/Authentication";
import {
    
     addComment,
     getAllComments,
     getCommentsByPostId,
    } from "../controller/commentController";
import fileUpload from "../helper/multer";

const commentRoute = express.Router();

// Get all comments with populated user and post information

commentRoute.post("/comments/add/:postId", normalUserAuthentication,fileUpload.single("Post_Image"), addComment);
commentRoute.get("/all/Comments", getAllComments);
commentRoute.get("/all/comments/byPost/ID/:id", getCommentsByPostId);

export default commentRoute;
