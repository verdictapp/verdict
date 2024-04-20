"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, StopCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import useDidUpdateEffect from "../hooks/useDidUpdateEffect";

const TopicInfoItem = ({
  languageId,
  language,
  updateTopicItems,
  topicInfo = { title: "", description: "", options: {} as Object },
}) => {
  const [title, setTitle] = useState(topicInfo.title);
  const [description, setDescription] = useState(topicInfo.description);
  const [options, setOptions] = useState(Object.values(topicInfo.options));
  const [areChangedSaved, setAreChangedSaved] = useState(true);

  const updateTopicInfoLocal = (i) => {
    setOptions((old) => {
      old = old.filter((op, j) => {
        console.log(i, j);

        return i !== j;
      });
      return old;
    });
  };

  const justLogTheValues = () => {
    console.log("title", title);
    console.log("description", description);
    console.log("options", options);
  };

  useDidUpdateEffect(() => {
    if (areChangedSaved) {
      setAreChangedSaved(false);
    }
  }, [title, description, options]);

  return (
    <div className="bg-primary-foreground my-10 pb-5 rounded-md">
      <div className="p-3 pt-5">
        <h2 className="text-lg font-semibold">{language}</h2>
        <div className="flex justify-between pt-5">
          <Input
            placeholder="Title"
            // className="max-w-sm"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <Textarea
          placeholder="Description"
          className="mt-5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <div className="pt-5"></div> */}
      </div>
      <div className="p-3">
        <h1 className="text-base font-semibold">Options</h1>
        {options.map((option, i) => (
          <div className="w-full bg-gray-100/10 rounded-sm dark:bg-zinc-700 relative mt-3 cursor-pointer flex space-x-3">
            <Input
              placeholder="Option..."
              value={option}
              onChange={(event) =>
                setOptions((old) => {
                  old = old.map((o, j) => {
                    if (j === i) {
                      //   console.log(event.target.value);

                      o = event.target.value;
                    }
                    return o;
                  });
                  return old;
                })
              }
            />
            <Button onClick={() => updateTopicInfoLocal(i)}>Delete</Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => {
            setOptions((old) => {
              old = [...options, ""];
              //   console.log(old);

              return old;
            });
          }}
          className="mt-3 w-full"
        >
          Add Option
        </Button>
        <div className="flex justify-end">
          <div
            className={`${
              areChangedSaved ? "text-green-500" : "text-red-500"
            } mt-6 font-semibold mx-5 flex space-x-2`}
          >
            {areChangedSaved ? (
              <>
                <CheckCircle />
                <span>Up to date</span>
              </>
            ) : (
              <>
                <XCircle />
                <span>Unsaved Changes</span>
              </>
            )}
          </div>
          <Button
            className="mt-5"
            onClick={() => {
              updateTopicItems(languageId, title, description, options);
              setAreChangedSaved(true);
            }}
          >
            Save {language}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicInfoItem;
