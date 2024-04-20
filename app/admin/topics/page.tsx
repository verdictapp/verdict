"use client";

import api from "@/app/_lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
export const dynamic = "force-dynamic";

export default function AdminTopics() {
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const router = useRouter();

  const handleFilterTopics = (value) => {
    setFilteredTopics(() =>
      topics.filter(
        (topic) =>
          topic.title.includes(value) || topic.description.includes(value)
      )
    );
  };
  const fetchTopics = async () => {
    let result = await api.get("/public/topics");
    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    const resultTopics = result.data.result.map((topic) => {
      let topicInfo = topic.topicInfo[topic.topicInfo.length - 1];
      return {
        id: topic.id,
        title: topicInfo?.title || "",
        description: topicInfo?.description || "",
        createdAt: moment(topic.createdAt).format("DD/MM/YYYY"),
      };
    });
    setTopics(resultTopics);
    setFilteredTopics(resultTopics);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <>
      <div className="bg-primary-foreground px-4 py-2 rounded-md">
        <div className="flex justify-between items-center py-3">
          <Input
            placeholder="Filter topics..."
            onChange={(event) => handleFilterTopics(event.target.value)}
            className="max-w-sm"
          />
          <Button onClick={() => router.push("/admin/topics/create")}>
            Create
          </Button>
        </div>
        <Table>
          <TableCaption>A list of topics.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTopics.map((topic) => (
              <TableRow
                key={topic.id}
                onClick={() => router.push(`/admin/topics/${topic.id}`)}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">{topic.id}</TableCell>
                <TableCell>{topic.title}</TableCell>
                <TableCell>{topic.description}</TableCell>
                <TableCell className="text-right">{topic.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Number Of Topics</TableCell>
              <TableCell className="text-right">
                {filteredTopics.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
