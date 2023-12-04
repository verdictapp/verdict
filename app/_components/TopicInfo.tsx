import React from "react";
import OptionProgress from "./OptionProgress";

const TopicInfo = ({
  id,
  photo,
  title,
  description,
  createdAt,
  options,
  votedOn,
}) => {
  return (
    <div className="bg-primary-foreground rounded-md w-full mb-7 overflow-hidden">
      <img src={photo} alt={""} className="w-full overflow-hidden mr-3" />
      <div className="p-3">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <span className="opacity-50">{createdAt}</span>
        </div>
        <p className="pt-6">{description}</p>
        <div className="pt-5">
          {options.map((option) => (
            <OptionProgress
              id={option.id}
              title={option.title}
              percentage={option.percentage}
              isVoted={option.isVotedOn}
              key={option.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicInfo;
