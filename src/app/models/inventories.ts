import { Schema, models, model } from "mongoose";

const inventorySchema = new Schema({
  totalQuantity: {
    type: Number,
    default: 0,
  },
});

const Inventories = models.Inventories || model("Inventories", inventorySchema);

export default Inventories;
