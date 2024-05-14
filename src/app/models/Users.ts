import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    msg: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Users = models.accounts || model("accounts", userSchema);

export default Users;
