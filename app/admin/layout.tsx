import { Button } from "@/components/ui/button";
import AdminSideSheet from "../_components/admin-side-sheet";

export const metadata = {
  metadataBase: new URL("https://postgres-prisma.vercel.app"),
  title: "Vercel Postgres Demo with Prisma",
  description:
    "A simple Next.js app with Vercel Postgres as the database and Prisma as the ORM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="w-0 md:w-1/6 mt-20 sticky md:px-5"></div>
      <div className="w-full md:w-4/6 px-2 lg:px-20 xl:px-48 pt-24">
        <AdminSideSheet />
        {children}
      </div>
      <div className="w-0 md:w-1/6 mt-20 sticky md:px-5"></div>
    </div>
  );
}
