import { Inter } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: "900",
    subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Esse financiamento é para mim?",
    description: "Simule o resultado histórico de financiamentos e decida se faz sentido para você",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" className={roboto.className}>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
