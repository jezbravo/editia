import { updateCredits } from "@/lib/actions/lib/actions/user.actions";
import Transaction from "@/lib/database/models/transaction.model";
import { connectToDataBase } from "@/lib/database/mongoose";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest } from "next/server";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

// Función para escuchar la notificación webhook
export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } });
  // console.log(body);

  if (!body || !body.data || !body.data.id) {
    console.error("No se encontró el ID en el cuerpo de la solicitud");
    return Response.json(
      { success: false, error: "ID not found in request body" },
      { status: 400 },
    );
  }

  // Validación (producción)
  //   const secret = request.headers.get("x-signature-id");
  //   if (secret === process.env.SECRET) return Response.json({ success: false });

  //   Datos de la compra
  const payment = await new Payment(mercadopago).get({ id: body.data.id });
  // console.log("payment:", payment);

  // TODO

  // console.log("user_name:", user!.username);
  // console.log("user_id:", user!.id);

  //   Objeto con info de la compra, para integrar a la DB
  const transaction = {
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

  // Actualizar DB y créditos
  await connectToDataBase();

  const newTransaction = await Transaction.create({
    ...transaction,
  });
  const result = await JSON.parse(JSON.stringify(newTransaction));
  result;

  // Actualizar los créditos
  // if (transaction.status === "approved") {
  //   if (transaction.plan_name === "Pro Package") {
  //     let credits = 120;
  //     await updateCredits(transaction.user!, credits);
  //   } else {
  //     let credits = 2000;
  //     await updateCredits(transaction.user!, credits);
  //   }
  // }
  return Response.json({ success: true });
}
