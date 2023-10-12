import mongoose from "mongoose";

const blogschema = new mongoose.Schema({
  bogImage: {
    type: String,
    require: false,
  },
  blogTitle: {
    type: String,
    require: true,
  },
  blogContent: {
    type: String,
    require: true,
  },
  blogComment: {
    type: String,
    require: false,
  },
  author: {
    type: String,
    require: false,
  },
  authorP: {
    type: String,
    require: false,
  },
});

const blogmode = mongoose.model("Blogs", blogschema);

export default blogmode;