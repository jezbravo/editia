import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { cn } from "@/src/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import { NextIntlClientProvider, useMessages, useLocale } from "next-intl";

const RobotoFont = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Editia",
  description: "Powerful AI image editor",
  keywords: "ia, image, photo, picture, edition",
  creator: "JEB",

  openGraph: {
    title: "Editia",
    description: "Powerful AI image editor",
    url: "https://editia.vercel.app/",
    siteName: "Editia",
    images: [
      {
        url: "https://bit.ly/editia",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
  // params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: any };
}>) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "green" },
      }}
    >
      <html lang={locale}>
        <head>
          <link rel="icon" href="/" type="image/x-icon" />
        </head>
        <body
          className={cn("font-RobotoFont antialiased", RobotoFont.variable)}
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
