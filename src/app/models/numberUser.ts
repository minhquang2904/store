import { Schema, models, model } from "mongoose";

const numberUserSchema = new Schema({
  numberUserId: String,
  totalUser: {
    type: Number,
    default: 0,
  },
});

const TotalUser =
  models.Total_number || model("Total_number", numberUserSchema);

export default TotalUser;
