"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const TopicInfoItem = ({ languageId, language, updateTopicItems }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);

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
        <Button
          className="w-full mt-5"
          onClick={() =>
            updateTopicItems(languageId, title, description, options)
          }
        >
          Save {language}
        </Button>
      </div>
    </div>
  );
};

export default TopicInfoItem;
