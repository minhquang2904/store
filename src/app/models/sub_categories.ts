import { Schema, models, model } from "mongoose";

const subCategoriesSchema = new Schema({
  sub_categories: { type: [String], default: [] },
  categories: { type: String, default: "" },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
});

const SubCategories =
  models.Sub_Categories || model("Sub_Categories", subCategoriesSchema);
export default SubCategories;
