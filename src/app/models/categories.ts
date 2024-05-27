import { Schema, models, model } from "mongoose";

const categoriesSchema = new Schema({
  categories: { type: String, default: "" },
});

const Categories = models.Categories || model("Categories", categoriesSchema);
export default Categories;
