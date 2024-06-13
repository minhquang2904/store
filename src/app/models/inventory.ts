import { Schema, models, model } from "mongoose";

const inventorySchema = new Schema({
  inventoryId: String,
  totalQuantity: {
    type: Number,
    default: 0,
  },
});

const Inventory = models.Inventory || model("Inventory", inventorySchema);

export default Inventory;
