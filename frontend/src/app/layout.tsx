import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout"; // Este deve ser um componente do cliente

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConstruLink",
  description: "Aplicativo de Relatório de Obra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={rubik.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
