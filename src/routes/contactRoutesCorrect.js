import express from "express";

import {
     sendContactusMessage,
     readAllMessages,
     deleteMessage,
    } from "../controller/contactControllerCorrect";
import fileUpload from "../helper/multer";
import Authorization from "../middleware/Authentication";
const contactusRoute = express.Router();

contactusRoute.post("/send",fileUpload.single("Email"),sendContactusMessage);
contactusRoute.get("/viewMessages",Authorization,readAllMessages);
contactusRoute.delete("/deleteMessage/:id",Authorization ,deleteMessage);

export default contactusRoute;