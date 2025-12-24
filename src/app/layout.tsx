import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VariantProvider } from "@/context/VariantContext";
import Topbar from "@/components/Topbar/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cardiolife Adaptation Strips",
  description: "ECG Analysis Dashboard with Variant Testing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <VariantProvider>
          <Topbar />
          <main className="main-content">
            {children}
          </main>
        </VariantProvider>
      </body>
    </html>
  );
}

