"use client";

import api from "@/app/_lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const UpdateTagModal = ({ isOpen, setIsOpen, selectedTag, loadNewTags }) => {
  const [name, setName] = useState(selectedTag.name);
  const [priority, setPriority] = useState(selectedTag.priority);
  const { toast } = useToast();

  const handleSave = async () => {
    // Submit Tag

    // update name of default language
    await api.put(`/admin/tag-info/${selectedTag.defaultTagInfoId}/update`, {
      name: name,
    });

    await api.put(`/admin/tags/${selectedTag.id}/update`, {
      priority: priority,
    });

    toast({
      title: "Success!",
      description: "Tag has been updated successfully",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });

    await loadNewTags();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Tag</DialogTitle>
          <DialogDescription>
            Update tag {selectedTag.name}. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder={`Enter tag name`}
              className="col-span-3"
              defaultValue={selectedTag.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Priority
            </Label>
            <Input
              id="priority"
              placeholder={`Enter tag priority`}
              className="col-span-3"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              type="number"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleSave()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTagModal;
