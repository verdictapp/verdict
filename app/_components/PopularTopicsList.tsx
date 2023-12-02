import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const popularTopics = Array.from({ length: 10 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function PopularTopicsList() {
  return (
    <ScrollArea className="h-screen rounded-md">
      <div className="p-4">
        <h4 className="mb-4 text-base font-medium leading-none">
          Popular Topics
        </h4>
        {popularTopics.map((topic) => (
          <>
            <div key={topic} className="text-sm py-3">
              {topic}
            </div>
            {/* <Separator className="my-2" /> */}
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
