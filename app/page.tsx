import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Table from "@/app/_components/table";
import TablePlaceholder from "@/app/_components/table-placeholder";
import ExpandingArrow from "@/app/_components/expanding-arrow";
import { Button } from "@/components/ui/button";
import { MainTagsList } from "./_components/MainTagsList";
import { PopularTopicsList } from "./_components/PopularTopicsList";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-1/6 mt-20 sticky">
        <MainTagsList />
      </div>
      <div className="w-4/6"></div>
      <div className="w-1/6 mt-20 sticky">
        <PopularTopicsList />
      </div>
    </div>
  );
}
