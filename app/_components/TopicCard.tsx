import React from "react";
import OptionProgress from "./OptionProgress";

const TopicCard = ({
  id,
  photo,
  title,
  description,
  createdAt,
  options,
  votedOn,
}) => {
  return (
    <div className="bg-primary-foreground rounded-md w-full p-3 mb-7">
      <div className="flex">
        <img
          src={photo}
          alt={""}
          className="w-14 rounded overflow-hidden mr-3"
        />
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <span className="opacity-50">{createdAt}</span>
        </div>
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
  );
};

export default TopicCard;
