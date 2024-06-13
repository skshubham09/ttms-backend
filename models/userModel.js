import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["admin", "supervisor", "user"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
