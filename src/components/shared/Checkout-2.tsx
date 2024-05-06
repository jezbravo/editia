import { redirect } from "next/navigation";
import { Button } from "../ui/button";
// import { MercadoPagoConfig, Preference } from "mercadopago";

import { getTranslations } from "next-intl/server";

// Add credentials
// const client = new MercadoPagoConfig({
//   accessToken: process.env.MP_ACCESS_TOKEN!,
// });

// Create the purchasing interface
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

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN!}`,
    };

    const preference = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
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
          notification_url: process.env.NOTIFICATION_URL!,
          statement_descriptor: "Editia",
          auto_return: "approved",
        }),
      },
    ).then((response) => response.json());

    // Redirects the user to the URL provided by Mercado Pago
    redirect(preference.init_point!);
  };

  const t = await getTranslations("Checkout");

  return (
    <form action={handlePurchase}>
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-green-gradient bg-cover"
        >
          {t("buy")}
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
