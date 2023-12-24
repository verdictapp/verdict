"use client";

import { ConfirmationDialog } from "@/app/_components/modals/ConfirmationDialog";
import AddTagModal from "@/app/_components/modals/add-tag-modal";
import UpdateTagModal from "@/app/_components/modals/update-tag-modal";
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
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
export const dynamic = "force-dynamic";

const Tags = () => {
  const [tags, setTags] = useState([
    { id: 1, name: "tag 1", priority: 10 },
    { id: 2, name: "tag 2", priority: 10 },
  ]);
  const [filteredTags, setFilteredTags] = useState(tags);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [isUpdateTagOpen, setIsUpdateTagOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState({
    id: 0,
    name: "",
    priority: 0,
  });

  const handleFilterTags = (value) => {
    setFilteredTags(() => tags.filter((tag) => tag.name.includes(value)));
  };

  const getTags = async () => {
    let result = await api.get("/public/tags");
    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    let tags = result.data.result.map((tag) => {
      let tagInfo = tag.tagInfo[tag.tagInfo.length - 1];
      return {
        id: tag.id,
        name: tagInfo.name,
        priority: tag.priority,
      };
    });
    setTags(tags);
    setFilteredTags(tags);
  };

  const handleDeleteTag = async (tag) => {
    let result = await api.delete(`/admin/tags/${tag}/delete`);
    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    getTags();
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <div className="bg-primary-foreground px-4 py-2 rounded-md">
        <div className="flex justify-between items-center py-3">
          <Input
            placeholder="Filter tags..."
            onChange={(event) => handleFilterTags(event.target.value)}
            className="max-w-sm"
          />
          <Button onClick={() => setIsAddTagOpen(true)}>Create</Button>
        </div>
        <Table>
          <TableCaption>A list of tags.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell className="font-medium">{tag.id}</TableCell>
                <TableCell>{tag.name}</TableCell>
                <TableCell>{tag.priority}</TableCell>
                <TableCell className="flex justify-end gap-5">
                  <Edit
                    className="cursor-pointer"
                    onClick={() => {
                      setIsUpdateTagOpen(true);
                      setSelectedTag({
                        id: tag.id,
                        name: tag.name,
                        priority: tag.priority,
                      });
                    }}
                  />
                  <ConfirmationDialog
                    Trigger={<Trash />}
                    description={
                      "This action cannot be undone. This will permanently delete the tag."
                    }
                    onConfirm={() => handleDeleteTag(tag.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Number Of Tags</TableCell>
              <TableCell className="text-right">
                {filteredTags.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <AddTagModal
        isOpen={isAddTagOpen}
        setIsOpen={setIsAddTagOpen}
        loadNewTags={getTags}
      />
      {isUpdateTagOpen && (
        <UpdateTagModal
          isOpen={isUpdateTagOpen}
          setIsOpen={setIsUpdateTagOpen}
          loadNewTags={getTags}
          selectedTag={selectedTag}
        />
      )}
    </>
  );
};

export default Tags;
