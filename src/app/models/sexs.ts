import { Schema, models, model } from "mongoose";

const sexSchema = new Schema({
  sexs: { type: String, default: "" },
});

const Sex = models.Sex || model("Sex", sexSchema);
export default Sex;
