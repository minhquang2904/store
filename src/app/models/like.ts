import { Schema, models, model } from "mongoose";

const likeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  likes: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
});

const Like = models.Like || model("Like", likeSchema);
export default Like;
