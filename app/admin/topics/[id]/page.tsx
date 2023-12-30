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
import { useParams, useRouter } from "next/navigation";
import api from "@/app/_lib/api";

export const dynamic = "force-dynamic";

const page = () => {
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState("");
  const [topicItems, setTopicItems] = useState([]);
  const [priority, setPriority] = useState(0);
  const [tIState, setTIState] = useState(0);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [topicTags, setTopicTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [tagsToAdd, setTagsToAdd] = useState([]);
  const [tagsToDelete, setTagsToDelete] = useState([]);
  const [languages, setLanguages] = useState([
    { id: 1, language: "English", code: "en" },
    { id: 2, language: "Arabic", code: "ar" },
    { id: 3, language: "German", code: "de" },
  ]);
  const { toast } = useToast();
  const router = useRouter();

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

  const getTopic = async () => {
    // get topic by id
    let result = await api.get(`/admin/topics/${id}`);
    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    // assign topic image to thumbnail
    setThumbnail(result.data.result.image);
    // assign topic priority to priority
    setPriority(result.data.result.priority);
    //assign topic state to tIState
    setTIState(result.data.result.state);
    //assign topic infos to topicItems
    setTopicItems(result.data.result.topicInfo);
    //assign tagged to topicTags
    setTopicTags(result.data.result.tagged);

    console.log("infos", topicItems);
    console.log("topic tags", topicTags);
  };

  const getAvailableTags = async () => {
    //get available tags and assign to availableTags
    let result = await api.get(`/admin/topics/${id}/available-tags`);
    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    console.log("available tags", result.data.result);

    setAvailableTags(result.data.result);
  };

  const handleSaveTopic = async () => {
    //update topic details
    let result = await api.put(`/admin/topics/${id}/update`, {
      image: thumbnail,
      priority: priority,
      state: tIState,
    });
    if (!result.data.success) {
      console.error(`errorCode${result.data.errorCode}`);
      return;
    }
    toast({
      title: "Success!",
      description: "Topic has been created successfully",
    });
  };

  const handleSaveTopicInfo = async (langID, title, description, options) => {
    let ops = Object.assign({}, options);

    //submit the topic info
    let result = await api.post(`/admin/topics/${id}/add-topic-info`, {
      languageId: langID,
      title: title,
      description: description,
      options: ops,
    });

    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
  };

  const handleToAddTag = (tid) => {
    let exist = false;
    for (let i = 0; i < tagsToAdd.length; i++) {
      if (tagsToAdd[i] === tid) {
        exist = true;
      }
    }
    if (exist) {
      setTagsToAdd((old) => old.filter((o) => o !== tid));
    } else {
      setTagsToAdd((old) => [...old, tid]);
    }
  };

  const handleToDeleteTag = (tid) => {
    let exist = false;
    for (let i = 0; i < tagsToDelete.length; i++) {
      if (tagsToDelete[i] === tid) {
        exist = true;
      }
    }
    if (exist) {
      setTagsToDelete((old) => old.filter((o) => o !== tid));
    } else {
      setTagsToDelete((old) => [...old, tid]);
    }
  };

  const handleAddTag = () => {
    setIsAddTagOpen(true);
  };

  const handleSaveTags = async () => {
    let error = false;
    if (tagsToAdd) {
      // submit the tagsToAdd
      let addResult = await api.post(`/admin/topics/${id}/add-tags`, {
        tags: tagsToAdd,
      });
      if (!addResult.data.success) {
        console.error(`addResult => errorCode(${addResult.data.errorCode})`);
        error = true;
      }
    }

    if (tagsToDelete) {
      // submit the tagsToDelete
      let deleteResult = await api.post(`/admin/tagged/delete`, {
        taggedIds: tagsToDelete,
      });
      if (!deleteResult.data.success) {
        console.error(
          `deleteResult => errorCode(${deleteResult.data.errorCode})`
        );
        error = true;
      }
    }
    if (error) return;

    toast({
      title: "Success!",
      description: "Topic tags has been updated successfully",
    });
  };

  useEffect(() => {
    getLanguages();
    getTopic();
    getAvailableTags();
  }, []);

  return (
    <>
      <div className="rounded-md w-full mb-7 overflow-hidden">
        <div className="flex justify-end gap-x-3">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/topics")}
          >
            Back To Topics
          </Button>
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
            <div className="flex justify-end">
              <Button className="mt-5" onClick={() => handleSaveTopic()}>
                Save Topic
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-primary-foreground my-10 pb-5 rounded-md">
          <div className="p-3 pt-5">
            <h2 className="text-lg font-semibold">Topic Tags</h2>
            <div className="flex flex-wrap gap-x-3 mt-5">
              {topicTags?.map((tagged, i) => (
                <Button
                  onClick={() => handleToDeleteTag(tagged.id)}
                  variant={
                    tagsToDelete.find((st) => st === tagged.id) === tagged.id
                      ? "secondary"
                      : "default"
                  }
                >
                  {tagsToDelete.find((st) => st === tagged.id) ? (
                    <Circle className="mr-2 h-4 w-4" />
                  ) : (
                    <Check className="mr-2 h-4 w-4" />
                  )}{" "}
                  {tagged.tag.name}
                </Button>
              ))}
            </div>
            {/* <div className="pt-5"></div> */}
          </div>

          <div className="p-3 pt-5">
            <h2 className="text-lg font-semibold">Available Tags</h2>
            <div className="flex flex-wrap gap-x-3 mt-5">
              {availableTags?.map((tag, i) => (
                <Button
                  onClick={() => handleToAddTag(tag.id)}
                  variant={
                    tagsToAdd.find((st) => st === tag.id) === tag.id
                      ? "default"
                      : "secondary"
                  }
                >
                  {tagsToAdd.find((st) => st === tag.id) ? (
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
            <div className="flex justify-end">
              <Button className="mt-5" onClick={() => handleSaveTags()}>
                Save Tags
              </Button>
            </div>
          </div>
        </div>

        {languages.map((lang) => (
          <TopicInfoItem
            languageId={lang.id}
            language={lang.language}
            updateTopicItems={handleSaveTopicInfo}
            topicInfo={topicItems?.find((ti) => (ti.languageId = lang.id))}
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
        loadNewTags={getAvailableTags}
      />
    </>
  );
};

export default page;
