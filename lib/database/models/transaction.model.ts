import { Schema, model, models } from "mongoose";
import { nanoid } from "nanoid";

const TransactionSchema = new Schema({
  // transaction_id: {
  //   type: String,
  //   unique: true,
  //   default: () => nanoid(),
  //   required: true,
  // },
  order_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
  },
  user_name: {
    type: String,
  },
  transaction_amount: {
    type: Number,
    required: true,
  },
  plan_name: {
    type: String,
  },
  credits: {
    type: Number,
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
  currency: {
    type: String,
  },
  user_email: {
    type: String,
  },
  method: {
    type: String,
  },
  status: {
    type: String,
  },
  status_detail: {
    type: String,
  },
  installments: {
    type: Number,
  },
  total_amount: {
    type: Number,
  },
  net_amount: {
    type: Number,
  },
});

const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
