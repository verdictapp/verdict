"use client";

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
import { useEffect, useState } from "react";
import { TagLanguageSelect } from "../tag-language-select";
import api from "@/app/_lib/api";

const AddEditTagTranslationModal = ({
  isOpen,
  setIsOpen,
  tagId,
  loadNewTags,
}) => {
  const [name, setName] = useState("");
  const [languages, setLanguages] = useState([]);
  const [tagTranslations, setTagTranslations] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState({ id: 0, name: "" });
  const { toast } = useToast();

  const getTagTranslations = () => {
    // get tag translations bg tagId and assign to tagTranslations state
  };

  const getLanguages = async () => {
    // get list of languages and set to the languages state and call in useEffect on first render
    let result = await api.get("/public/languages");
    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    setLanguages(
      result.data.result.map((language) => {
        return {
          id: language.id,
          language: language.language,
          code: language.code,
        };
      })
    );
    console.log(result.data);
  };

  const handleSave = async () => {
    // Submit Tag

    //note: selectedLanguage contains the only the languageId

    toast({
      title: "Success!",
      description: "Tag has been created successfully",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });

    await loadNewTags();
    setIsOpen(false);
  };

  useEffect(() => {
    getLanguages();
    getTagTranslations();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add or Edit Tag Translation</DialogTitle>
          <DialogDescription>
            Add or Edit existing tag translations. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Language
            </Label>
            <TagLanguageSelect
              values={languages}
              setSelectedLanguage={setSelectedLanguage}
              OnAfterChange={(value) => {
                console.log("v", value);
                let currentTrans = tagTranslations.find(
                  (tt) => tt.languageId === value
                );

                setName(currentTrans ? currentTrans.name : "");
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder={`Enter tag name`}
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default AddEditTagTranslationModal;
