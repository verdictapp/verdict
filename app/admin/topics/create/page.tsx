"use client";

import ImageUpload from "@/app/_components/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const dynamic = "force-dynamic";

const page = () => {
  const [thumbnail, setThumbnail] = useState();
  return (
    <div className="flex">
      <div className="w-0 md:w-1/6 mt-20 sticky md:px-5"></div>
      <div className="w-full md:w-4/6 px-2 lg:px-20 xl:px-48">
        <div className="bg-primary-foreground rounded-md w-full mb-7 overflow-hidden mt-24">
          <ImageUpload
            thumbnail={thumbnail && URL.createObjectURL(thumbnail)}
            setThumbnail={setThumbnail}
          />
          <div className="p-3">
            <div className="flex justify-between pt-5">
              <Input placeholder="Title" className="max-w-sm" />
            </div>
            <Textarea placeholder="Description" className="mt-5" />
            <div className="pt-5"></div>
          </div>
        </div>
      </div>
      <div className="w-0 md:w-1/6 mt-20 sticky md:px-5"></div>
    </div>
  );
};

export default page;
