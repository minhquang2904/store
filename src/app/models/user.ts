import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  role: { type: String, default: "" },
  loginAt: { type: Date, default: Date.now },
  logoutAt: { type: Date, default: Date.now },
  action: { type: String, default: "System" },
});

const User = models.User || model("User", userSchema);
export default User;
