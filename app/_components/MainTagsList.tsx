"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createQueryString } from "../_lib/searchParamsHelper";
import api from "../_lib/api";

export function MainTagsList() {
  const searchParams = useSearchParams();
  const [tags, setTags] = useState([
    { id: 1, name: "tag 1" },
    { id: 2, name: "tag 2" },
    { id: 3, name: "tag 3" },
  ]);

  const getTags = async () => {
    let result = await api.get(`/public/tags`);
    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    setTags(
      result.data.result.map((tag) => {
        return {
          id: tag.id,
          name: tag.tagInfo[tag.tagInfo.length - 1].language,
        };
      })
    );
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <ScrollArea className="h-screen rounded-md">
      <div className="p-4">
        <h4 className="mb-4 text-base font-medium leading-none">Tags</h4>
        <div className="flex flex-col py-3 space-y-6">
          {tags.map((tag) => (
            <Link
              href={`/?${createQueryString("tag", tag.name, searchParams)}`}
              key={tag.id}
              className={`${
                searchParams.get("tag") === tag?.name
                  ? "text-base font-bold"
                  : "text-sm font-semibold"
              }`}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
