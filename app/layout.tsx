import { Toaster } from "@/components/ui/toaster";
import Header from "./_components/Header";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  metadataBase: new URL("https://postgres-prisma.vercel.app"),
  title: "Vote on topics",
  description:
    "Verdict is the platform where you can give your opinion openly and freely",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} dark relative`}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
