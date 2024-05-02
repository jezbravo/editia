import { SignedIn, currentUser } from "@clerk/nextjs";
import Image from "next/image";

import Header from "@/src/components/shared/Header";
import { Button } from "@/src/components/ui/button";
import { Plans } from "@/src/constants-2";
import Checkout from "@/src/components/shared/Checkout";

import { getTranslations } from "next-intl/server";

const Credits = async () => {
  const user = await currentUser();
  const userId = user!.id;
  const userName = user!.username;
  const t = await getTranslations("CreditsPage");

  return (
    <>
      <Header title={t("title")} subtitle={t("subtitle")} />
      <section>
        <ul className="credits-list">
          {(await Plans()).map((plan) => (
            <li key={plan.name} className="credits-item">
              <div className="flex-center flex-col gap-3">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="p-20-semibold mt-2 text-green-500">{plan.name}</p>
                <p className="h1-semibold text-dark-700">${plan.price} ARS</p>
                <p className="p-16-regular">
                  {plan.credits} {t("credits")}
                </p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? "check.svg" : "cross.svg"
                      }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ||
              plan.name === "Gratis" ||
              plan.name === "Livre" ? (
                <Button variant="outline" className="credits-btn">
                  {t("free")}
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    id="purchase"
                    userId={userId!}
                    userName={userName!}
                    planName={plan.name}
                    planPrice={plan.price}
                    planCredits={plan.credits}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Credits;
