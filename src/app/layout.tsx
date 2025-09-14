import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/Providers"; // we'll make this client-only

export const metadata: Metadata = {
  title: "My POS",
  description: "Point of Sale System built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Toaster position="bottom-right" closeButton />
          {children}
        </Providers>
      </body>
    </html>
  );
}
