"use client";

import React, { useState } from "react";
import OptionProgress from "./OptionProgress";
import { AuthModal } from "./modals/auth-modal";

const TopicInfo = ({
  id,
  photo,
  title,
  description,
  createdAt,
  options,
  votedOn,
}) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleVote = (vid) => {
    //check if the user is authenticated and either submit the vote or setIsAuthOpen to true
  };

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
              key={option.id}
              id={option.id}
              title={option.title}
              percentage={option.percentage}
              isVoted={option.isVotedOn}
              onVote={handleVote}
            />
          ))}
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} setIsOpen={setIsAuthOpen} />
    </div>
  );
};

export default TopicInfo;
