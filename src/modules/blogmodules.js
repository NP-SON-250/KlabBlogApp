import mongoose from "mongoose";

const blogschema = new mongoose.Schema({
  bogImage: {
    type: String,
    require: true,
  },
  blogTitle: {
    type: String,
    require: true,
  },
  blogContent: {
    type: String,
    require: true,
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users_Table'
    },
    comment: String
  }],
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