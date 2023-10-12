import express from "express";
import commentController from "../controller/commentController";


const commentRoutes = express.Router();
commentRoutes.post('/addComment', commentController.addComment);

export default commentRoutes;