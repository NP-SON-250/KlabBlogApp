import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

//Import routes
import blogRoutes from "./routes/blogRoutes";
import userRoute from "./routes/userroutes";


//configurations

const app = express();
dotenv.config();

// Require app to use imported configurations

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Determination of routes

app.use("/api/klab/blog",blogRoutes);
app.use("/api/klab/user",userRoute);

app.get('/',(req,res) =>{
  res.status(200).json({
    status: "Deal Done Friend",
    author: "Alexis",
    message: "Welcome To Alexis API",
  });
});

export default app;