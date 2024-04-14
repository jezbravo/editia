import {
  getUserById,
  updateCredits,
} from "@/lib/actions/lib/actions/user.actions";
import Transaction from "@/lib/database/models/transaction.model";
import { connectToDataBase } from "@/lib/database/mongoose";
import { auth } from "@clerk/nextjs";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest } from "next/server";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SECRET!,
// );

// Función para escuchar la notificación webhook
export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } });
  console.log(body);

  // Validación (producción)
  //   const secret = request.headers.get("x-signature-id");
  //   if (secret === process.env.SECRET) return Response.json({ success: false });

  //   Datos de la compra
  const payment = await new Payment(mercadopago).get({ id: body.data.id });
  console.log("payment:", payment);

  const { userId } = auth();
  const user = await getUserById(userId!);
  console.log("User:", user);

  //   Objeto con info de la compra, para integrar a la DB
  const transaction = {
    transaction_id: payment.id,
    order_id: payment.order?.id,
    user: user,
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
  if (transaction.status === "approved") {
    await connectToDataBase();

    const newTransaction = await Transaction.create({
      ...transaction,
    });

    // Actualizar los créditos
    if (transaction.plan_name === "Pro Package") {
      let credits = 120;
      await updateCredits(user, credits);
    } else {
      let credits = 2000;
      await updateCredits(user, credits);
    }

    return JSON.parse(JSON.stringify(newTransaction));
  }
  return Response.json({ success: true });
}
