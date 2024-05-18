import mongoose from "mongoose";
import { GOODS_STATUS } from "../constants/goods.constant.js";

const goodsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(GOODS_STATUS),
      default: GOODS_STATUS.FOR_SALE,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

export default mongoose.model("goodsModel", goodsSchema);
