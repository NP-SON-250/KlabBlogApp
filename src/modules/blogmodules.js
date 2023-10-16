import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  UserComment: {
    type: String,
    require: true,
  },
  User_ID: { type: ObjectId, ref: "User_Table" },
  CommentDate: { type: Date, default: Date.now },
  User_Name: {type: String, ref: "User_Table"},
  User_Email: {type: String, ref: "User_Table"},
});

const blogschema = new mongoose.Schema({
  bogImage: {
    type: String,
    require: true,   },
  blogTitle: {
    type: String,
    require: true,   },
  blogContent: {
    type: String,
    require: true,   },
  PostedOn: { type: Date, default: Date.now },
  author: {
    type: String,
    require: false,
  },
  authorP: {
    type: String,
    require: false,
  },
  comments: [commentSchema] // Added comments array using the commentSchema
});

const blogmode = mongoose.model("Blogs", blogschema);

export default blogmode;
