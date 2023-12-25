import { Toaster } from "@/components/ui/toaster";
import Header from "./_components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { useStore } from "./store";
import StoreInitializer from "./_components/StoreInitializer";

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
  useStore.setState({
    isLoggedIn: !!cookies().get("authToken"),
  });

  return (
    <html lang="en">
      <body className={`${inter.variable} dark relative`}>
        <StoreInitializer isLoggedIn={!!cookies().get("authToken")} />
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
