import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
//Import routes
import blogRoutes from "./routes/blogRoutes.js";
import userRoute from "./routes/userroutes.js";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DbConnection)
  .then(() => {
    console.log("Database Connection Successeed");
  })
  .catch((err) => console.log(err));

const app = express();
dotenv.config();

// Require app to use imported configurations

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes

app.use("/api/klab/blog", blogRoutes);
app.use("/api/klab/user", userRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Deal Done Friend",
    author: "Alexis",
    message: "Welcome To Alexis API",
  });
});

const PORT = process.env.PORT || 4300;

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port:http://localhost:${PORT}`);
});
