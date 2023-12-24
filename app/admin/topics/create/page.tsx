"use client";

import ImageUpload from "@/app/_components/image-upload";
import AddTagModal from "@/app/_components/modals/add-tag-modal";
import { TopicInfoModal } from "@/app/_components/modals/topic-info-modal";
import TopicInfoItem from "@/app/_components/topic-info-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Circle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import api from "@/app/_lib/api";

export const dynamic = "force-dynamic";

const page = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [topicItems, setTopicItems] = useState([]);
  const [priority, setPriority] = useState(0);
  const [tIState, setTIState] = useState(0);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [tags, setTags] = useState([
    { id: 1, name: "tag 1" },
    { id: 2, name: "tag 2" },
    { id: 3, name: "tag 3" },
  ]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [languages, setLanguages] = useState([
    { id: 1, language: "English", code: "en" },
    { id: 2, language: "Arabic", code: "ar" },
    { id: 3, language: "German", code: "de" },
  ]);
  const { toast } = useToast();
  const router = useRouter();

  const getTags = async () => {
    //get list of tags from backend and assign to tags state and call in useEffect on first render
    let result = await api.get("/public/tags");
    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    setTags(
      result.data.result.map((tag) => {
        return {
          id: tag.id,
          name: tag.tagInfo[0].name,
        };
      })
    );
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
  };

  const handleSubmit = async () => {
    //submit topic to api and redirect to topics page
    let result = await api.post("/admin/topics/create/", {
      data: topicItems,
      priority: priority,
      image: thumbnail,
      state: tIState,
    });
    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    toast({
      title: "Success!",
      description: "Topic has been created successfully",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
    router.push("/admin/topics");
  };

  const saveTopicInfo = (langID, title, description, options) => {
    let exist = false;
    let ops = Object.assign({}, options);
    setTopicItems((old) =>
      old.map((o) => {
        if (o.languageId === langID) {
          exist = true;
          o.title = title;
          o.description = description;
          o.options = ops;
        }
        return o;
      })
    );

    if (!exist) {
      setTopicItems((old) => [
        ...old,
        {
          languageId: langID,
          title: title,
          description: description,
          options: ops,
        },
      ]);
    }

    console.log(topicItems);
  };

  const handleSelectTag = (id) => {
    let exist = false;
    for (let i = 0; i < selectedTags.length; i++) {
      if (selectedTags[i] === id) {
        exist = true;
      }
    }
    if (exist) {
      setSelectedTags((old) => old.filter((o) => o !== id));
    } else {
      setSelectedTags((old) => [...old, id]);
    }
  };

  const handleAddTag = () => {
    setIsAddTagOpen(true);
  };

  useEffect(() => {
    getTags();
    getLanguages();
  }, []);

  return (
    <>
      <div className="rounded-md w-full mb-7 overflow-hidden">
        <div className="flex justify-end gap-x-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => handleSubmit()}>Save</Button>
        </div>

        <div className="bg-primary-foreground my-10 pb-5 rounded-md">
          <div className="p-3 pt-5">
            <h2 className="text-lg font-semibold">Topic Details</h2>
            <div className="flex justify-between pt-5">
              <Input
                placeholder="Thumbnail"
                // className="max-w-sm"
                value={thumbnail}
                onChange={(e) => {
                  setThumbnail(e.target.value);
                }}
              />
            </div>
            <Input
              placeholder="Priority"
              className="mt-5"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              type="number"
            />
            {/* <div className="pt-5"></div> */}
          </div>
        </div>

        <div className="bg-primary-foreground my-10 pb-5 rounded-md">
          <div className="p-3 pt-5">
            <h2 className="text-lg font-semibold">Tags</h2>
            <div className="flex flex-wrap gap-x-3 mt-5">
              {tags.map((tag, i) => (
                <Button
                  onClick={() => handleSelectTag(tag.id)}
                  variant={
                    selectedTags.find((st) => st === tag.id) === tag.id
                      ? "default"
                      : "secondary"
                  }
                >
                  {selectedTags.find((st) => st === tag.id) ? (
                    <Check className="mr-2 h-4 w-4" />
                  ) : (
                    <Circle className="mr-2 h-4 w-4" />
                  )}{" "}
                  {tag.name}
                </Button>
              ))}
              <Button onClick={() => handleAddTag()}>
                <Plus className="mr-2 h-4 w-4" /> Add Tag
              </Button>
            </div>
            {/* <div className="pt-5"></div> */}
          </div>
        </div>

        {languages.map((lang) => (
          <TopicInfoItem
            languageId={lang.id}
            language={lang.language}
            updateTopicItems={saveTopicInfo}
          />
        ))}
      </div>

      {/* <TopicInfoModal
        isOpen={isLangOpen}
        setIsOpen={setIsLangOpen}
        langID={selectedTopicInfo.languageId}
        language={selectedTopicInfo.language}
        title={selectedTopicInfo.title}
        description={selectedTopicInfo.description}
        options={selectedTopicInfo.options}
        handleSave={handleSetTopicItems}
      /> */}
      <AddTagModal
        isOpen={isAddTagOpen}
        setIsOpen={setIsAddTagOpen}
        loadNewTags={getTags}
      />
    </>
  );
};

export default page;
