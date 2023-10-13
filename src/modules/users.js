import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  First_Name: {
    type: String,
    require: true,
  },
  Last_Name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  Password: {
    type: String,
    require: true,
  },
  Profile: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const userModel = mongoose.model("Users_Table", userSchema);

export default userModel;
