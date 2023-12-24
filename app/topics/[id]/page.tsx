import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Table from "@/app/_components/table";
import TablePlaceholder from "@/app/_components/table-placeholder";
import ExpandingArrow from "@/app/_components/expanding-arrow";
import { Button } from "@/components/ui/button";
import TopicInfo from "@/app/_components/TopicInfo";
import TopicStats from "@/app/_components/TopicStats";
import { showTopicTimedStats } from "@/app/_controllers/topicsController";

export const dynamic = "force-dynamic";

export default async function Topic({ params, searchParams }) {
  let result = await showTopicTimedStats(Number(params.id));

  if (!result.success) {
    console.error(`errorCode(${result.errorCode})`);
  }

  let total = 0;
  let voteCountPerOption = Object.keys(result.returned.stats).map((option) => {
    let totalPerOption =
      result.returned.stats[option].verified +
      result.returned.stats[option].unverified;
    total += totalPerOption;
    return totalPerOption;
  });

  let topic = {
    id: result.returned.id,
    title: searchParams.title,
    description: searchParams.description,
    createdAt: searchParams.createdAt,
    photo: searchParams.photo,
    options: JSON.parse(searchParams.options).map((option, index) => {
      let percentage =
        Math.fround((voteCountPerOption[index] / (total || 1)) * 100).toFixed(
          2
        ) + "%";
      return {
        id: option.id,
        title: option.title,
        percentage: percentage,
        isVotedOn: option.isVotedOn,
      };
    }),
  };
  return (
    <div className="flex flex-col xl:flex-row pt-24 px-3 lg:px-10 2xl:px-72 w-full xl:space-x-10 2xl:space-x-16">
      <div className="">
        <TopicInfo
          id={topic.id}
          title={topic.title}
          description={topic.description}
          createdAt={topic.createdAt}
          options={topic.options}
          photo={topic.photo}
          votedOn={""}
          key={topic.id}
        />
      </div>
      <TopicStats />
    </div>
  );
}
