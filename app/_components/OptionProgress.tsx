import React from "react";

const OptionProgress = ({ id, title, percentage, isVoted, onVote }) => {
  return (
    <div
      className="w-full bg-gray-100/10 rounded-sm dark:bg-zinc-700 h-10 relative mt-3 cursor-pointer"
      onClick={() => onVote(id)}
    >
      <span className="absolute left-0 top-2 ml-3">{title}</span>
      <div
        className={`text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-sm h-full ${
          isVoted ? "bg-[#8884d8]" : "bg-zinc-800"
        }`}
        style={{ width: percentage }}
      ></div>
      <span className="absolute right-0 top-2 mr-3">{percentage}</span>
    </div>
  );
};

export default OptionProgress;
