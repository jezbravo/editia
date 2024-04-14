import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  transaction_id: {
    type: Number,
    unique: true,
    required: true,
  },
  order_id: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    // required: true,
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
  // buyer: {
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
