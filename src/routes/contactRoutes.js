import express from "express";
import { 
  createMessage,
  deleteMessage,
  readAllMessage,
  readSingleMessage,
} from "../controller/contactController";

const contactRouter = express.Router();

contactRouter.post("/send", createMessage);
contactRouter.get("/readAllMessages", readAllMessage);
contactRouter.get("/readSingleMessage/:id", readSingleMessage);
contactRouter.delete("/deleteSingle/:id", deleteMessage);

export default contactRouter;
