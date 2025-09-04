import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medical AI ChatBot - Tıbbi AI Asistanı",
  description: "Profesyonel tıbbi AI asistanınız ile sağlık sorularınıza anında cevap alın. Güvenli, hızlı ve güvenilir tıbbi bilgi platformu.",
  keywords: ["tıbbi ai", "sağlık asistanı", "chatbot", "medical ai", "health assistant"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
