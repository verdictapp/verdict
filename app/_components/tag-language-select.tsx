import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TagLanguageSelect({ setSelectedLanguage, values }) {
  return (
    <Select onValueChange={(value) => setSelectedLanguage(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {values.map((value) => (
            <SelectItem value={value.id}>{value.language}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
