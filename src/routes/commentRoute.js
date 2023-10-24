import express from "express";
import {normalUserAuthentication} from "../middleware/Authentication";
import {
    
     addComment,
     getAllComments,
     getCommentsByPostId,
    } from "../controller/commentController";
import fileUpload from "../helper/multer";

const commentRoute = express.Router();

commentRoute.post("/comments/add/:postId", normalUserAuthentication,fileUpload.single("postImage"), addComment);
commentRoute.get("/all/Comments", getAllComments);
commentRoute.get("/all/comments/byPost/ID/:id", getCommentsByPostId);

export default commentRoute;
