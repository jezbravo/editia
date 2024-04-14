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

  //   Objeto con info de la compra, para integrar a la DB
  const transaction = {
    transaction_id: payment.id,
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

  //   await supabase.from("donations").insert(transaction);

  return Response.json({ success: true });
}
