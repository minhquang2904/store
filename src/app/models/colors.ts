import { Schema, models, model } from "mongoose";

const colorsSchema = new Schema({
  colors: { type: String, default: "" },
});

const Colors = models.Colors || model("Colors", colorsSchema);
export default Colors;
