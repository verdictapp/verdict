import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const tags = Array.from({ length: 5 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function MainTagsList() {
  return (
    <ScrollArea className="h-screen rounded-md">
      <div className="p-4">
        <h4 className="mb-4 text-base font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm py-3 font-semibold">
              {tag}
            </div>
            {/* <Separator className="my-2" /> */}
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
