import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

// const popularTopics = Array.from({ length: 10 }).map(
//   (_, i, a) => `v1.2.0-beta.${a.length - i}`
// );

export function PopularTopicsList() {
  //get popular topics from backend as this is serverside
  let popularTopics = [
    { id: 1, title: "Title 1" },
    { id: 2, title: "Title 2" },
  ];

  return (
    <ScrollArea className="h-screen rounded-md">
      <div className="p-4">
        <h4 className="mb-4 text-base font-medium leading-none">
          Popular Topics
        </h4>
        <div className="flex flex-col py-3 space-y-6">
          {popularTopics.map((topic) => (
            <Link
              href={`/topics/${topic.id}`}
              key={topic.id}
              className="text-sm"
            >
              {topic.title}
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
