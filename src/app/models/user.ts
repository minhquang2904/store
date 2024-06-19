import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  role: { type: String, default: "" },
  lastName: { type: String, default: "" },
  firstName: { type: String, default: "" },
  address: [
    {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      district: { type: String, default: "" },
      ward: { type: String, default: "" },
      addressFull: { type: String, default: "" },
    },
  ],
  delivery_list: [
    {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      district: { type: String, default: "" },
      ward: { type: String, default: "" },
      addressFull: { type: String, default: "" },
      phone: { type: String, default: "" },
      firstName: { type: String, default: "" },
      lastName: { type: String, default: "" },
    },
  ],
  phone: { type: String, default: "" },
  image: [
    {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
      created_at: { type: Date, default: "" },
      updated_at: { type: Date, default: "" },
    },
  ],
  status: { type: String, default: "active" },
  loginAt: { type: Date, default: Date.now },
  logoutAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  action: { type: String, default: "System" },
});

const User = models.User || model("User", userSchema);
export default User;
