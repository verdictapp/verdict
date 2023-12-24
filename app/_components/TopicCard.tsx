"use client";

import React from "react";
import OptionProgress from "./OptionProgress";
import Link from "next/link";
import Image from "next/image";
import { AuthModal } from "./modals/auth-modal";

const TopicCard = ({
  id,
  photo,
  title,
  description,
  createdAt,
  options,
  votedOn,
  isAuthOpen,
  setIsAuthOpen,
}) => {
  const handleVote = (vid) => {
    //check if the user is authenticated and either submit the vote or setIsAuthOpen to true
  };

  return (
    <div className="bg-primary-foreground rounded-md w-full p-3 mb-7">
      <Link
        href={`/topics/${id}?title=${title}&description=${description}&createdAt=${createdAt}&options=${JSON.stringify(
          options
        )}`}
      >
        <div className="flex">
          <img
            src={photo}
            alt={""}
            className="w-14 h-14 rounded overflow-hidden mr-3 object-cover"
            width={56}
            height={56}
          />
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <span className="opacity-50">{createdAt}</span>
          </div>
        </div>
      </Link>
      <p className="pt-6">{description}</p>
      <div className="pt-5">
        {options.map((option) => (
          <OptionProgress
            id={option.id}
            title={option.title}
            percentage={option.percentage}
            isVoted={option.isVotedOn}
            key={option.id}
            onVote={handleVote}
          />
        ))}
      </div>
      <AuthModal isOpen={isAuthOpen} setIsOpen={setIsAuthOpen} />
    </div>
  );
};

export default TopicCard;
