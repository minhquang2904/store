import { Schema, models, model } from "mongoose";

const adminSchema = new Schema({
  username: { type: String, default: "" },
  password: { type: String, default: "" },
  role: { type: String, default: "" },
  loginAt: { type: Date, default: Date.now },
  logoutAt: { type: Date, default: Date.now },
  action: { type: String, default: "System" },
});

const Admin = models.Admin || model("Admin", adminSchema);
export default Admin;
