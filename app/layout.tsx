import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const RobotoFont = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Editia",
  description: "AI-powered image generator and editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "green" },
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" href="/" type="image/x-icon" />
        </head>
        <body
          className={cn("font-RobotoFont antialiased", RobotoFont.variable)}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
