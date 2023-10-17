import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
//Import routes
import blogRoutes from "./routes/blogRoutes";
import userRoute from "./routes/userroutes";
// import contactRouter from "./routes/contactRoutes";
import contactusRoute from "./routes/contactRoutesCorrect";

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DbConnection)
  .then(() => {
    console.log("Database Connection Successeed");
  })
  .catch((err) => console.log(err));

const app = express();
dotenv.config();

//Documentation Side

const options ={
  definition: {
    openapi : '3.0.0',
    info : {
      title: 'Node JS And Mongo DB Klab Blog Api Project',
      version: '1.0.0'
    },
    servers:[
      {
        url: 'https://klab-blog-api.onrender.com/'
      }
    ],
    security: [
      {
        BearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    }
  },

  apis: ['./src/Docs/*.js'], //determination of path
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/Docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


// Require app to use imported configurations

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes

app.use("/api/klab/blog", blogRoutes);
app.use("/api/klab/user", userRoute);
// app.use("/api/klab/contact", contactRouter);

app.use("/api/klab/contactus", contactusRoute);
app.get("/", (req, res) => {
  res.status(200).json({
    status: "200",
    author: "Alexis",
    message: "Welcome To Blog API",
  });
});

const PORT = process.env.PORT || 4300;

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port:http://localhost:${PORT}`);
});
