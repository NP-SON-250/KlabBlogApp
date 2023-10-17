import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;
const commentSchema= new mongoose.Schema({
Comment:{
  type:String,
  require:true,
},
User_ID:{
  type: ObjectId,
  ref:"Users_Table",
  require:true,

},
Author_Name: {
    type: String,
    ref: "Users_Table",
},
Blog_Id:{
    type:ObjectId,
    ref:"Blogs",
    require:true,
},
Comment_Dates:{
  type:Date,
  default: Date.now,
},
});
const comments = mongoose.model("comments", commentSchema);
export default comments;