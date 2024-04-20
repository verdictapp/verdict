"use client";

import React, { useState } from "react";
import TopicCard from "./TopicCard";
import { AuthModal } from "./modals/auth-modal";

const MainTopicsList = ({ topics }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  return (
    <>
      {topics.map((topic) => (
        <TopicCard
          id={topic.id}
          title={topic.title}
          description={topic.description}
          createdAt={topic.createdAt}
          options={topic.options}
          photo={topic.photo}
          votedOn={""}
          key={topic.id}
          isAuthOpen={isAuthOpen}
          setIsAuthOpen={setIsAuthOpen}
        />
      ))}
      <AuthModal isOpen={isAuthOpen} setIsOpen={setIsAuthOpen} />
    </>
  );
};

export default MainTopicsList;
