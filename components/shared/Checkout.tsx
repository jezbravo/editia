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
  buyerId: string;
}

const Checkout: React.FC<CheckoutProps> = ({ planName, planPrice }) => {
  const handlePurchase = async () => {
    "use server";
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: planName,
            title: planName,
            quantity: 1,
            unit_price: planPrice,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: process.env.BACK_URL_SUCCESS!,
          failure: process.env.BACK_URL_FAILURE!,
          pending: process.env.BACK_URL_PENDING!,
        },
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
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
