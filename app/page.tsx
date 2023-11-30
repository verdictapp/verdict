import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Table from "@/app/_components/table";
import TablePlaceholder from "@/app/_components/table-placeholder";
import ExpandingArrow from "@/app/_components/expanding-arrow";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
