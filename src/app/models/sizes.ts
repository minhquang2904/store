import { Schema, models, model } from "mongoose";

const sizeSchema = new Schema({
  sizes: { type: String, default: "" },
});

const Size = models.Size || model("Size", sizeSchema);
export default Size;
