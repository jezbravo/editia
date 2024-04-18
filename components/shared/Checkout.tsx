import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

interface CheckoutProps {
  planName: string;
  planPrice: number;
  planCredits: number;
  id: string;
  userId: string;
  userName: string;
}

const Checkout: React.FC<CheckoutProps> = async ({
  planName,
  planPrice,
  planCredits,
  id,
  userId,
  userName,
}) => {
  const handlePurchase = async () => {
    "use server";
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: id,
            title: planName,
            description: String(planCredits),
            quantity: 1,
            unit_price: planPrice,
            currency_id: "ARS",
          },
        ],
        metadata: {
          credits: planCredits,
          user_name: userName,
          user_id: userId,
        },
        back_urls: {
          success: process.env.BACK_URL_SUCCESS!,
          failure: process.env.BACK_URL_FAILURE!,
          pending: process.env.BACK_URL_PENDING!,
        },

        notification_url: process.env.NOTIFICATION_URL,

        statement_descriptor: "Editia",

        auto_return: "approved",
      },
    });

    // Redirige al usuario a la URL proporcionada por Mercado Pago
    redirect(preference.init_point!);
  };

  return (
    <form action={handlePurchase}>
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-gradient bg-cover"
        >
          Buy Credits
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
