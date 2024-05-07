import Transaction from "@/src/lib/database/models/transaction.model";
import { connectToDataBase } from "@/src/lib/database/mongoose";
import { updateUserCredits } from "@/src/lib/actions/credit.actions";
import { MercadoPagoConfig, Payment } from "mercadopago";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function handlePayment(body: any) {
  //   Purchase information
  console.log("Inicio payment: ");
  const payment = await new Payment(mercadopago).get({ id: body.data.id });
  console.log("payment:", payment);

  //   Object with purchase information, to integrate into the DB
  const transaction = {
    payment_id: payment.id,
    order_id: payment.order!.id,
    user_id: payment.metadata!.user_id,
    user_name: payment.metadata!.user_name,
    credits: payment.metadata!.credits,
    transaction_amount: payment.transaction_amount,
    plan_name: payment.description,
    created_at: payment.date_created,
    updated_at: payment.date_last_updated,
    currency: payment.currency_id,
    user_email: payment.payer?.email,
    method: payment.payment_method_id,
    status: payment.status, //approved
    status_detail: payment.status_detail, //accredited
    installments: payment.installments,
    total_amount: payment.transaction_details?.total_paid_amount,
    net_amount: payment.transaction_details?.net_received_amount,
  };
  console.log("transaction:", transaction);

  // Update DB
  await connectToDataBase();

  const newTransaction = await Transaction.create({
    ...transaction,
  });
  const result = await JSON.parse(JSON.stringify(newTransaction));
  result;

  // Update credits
  if (transaction.status === "approved") {
    let plan_id = 2;
    if (transaction.credits !== 100) {
      plan_id = 3;
    }
    await updateUserCredits(
      transaction.user_id!,
      transaction.credits!,
      plan_id,
    );
  }
}
