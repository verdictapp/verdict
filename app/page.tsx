import moment from "moment";
import { MainTagsList } from "./_components/MainTagsList";
import { PopularTopicsList } from "./_components/PopularTopicsList";
import TopicCard from "./_components/TopicCard";
import { showTopics } from "./_controllers/topicsController";
import api from "./_lib/api";
import MainTopicsList from "./_components/main-topics-list";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {
  // fetch topics with the controller as this is serverside
  let result = await showTopics(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    Number(searchParams.userId)
  );
  if (!result.success) {
    console.error(`errorCode(${result.errorCode})`);
    return;
  }
  let topics = result.returned.map((topic) => {
    // selecting language
    let topicInfo = topic.topicInfo[topic.topicInfo.length - 1];
    // calculating totals for percentages
    let total = 0;
    let voteCountPerOption = Object.keys(topic.stats).map((option) => {
      let totalPerOption =
        topic.stats[option].verified + topic.stats[option].unverified;
      total += totalPerOption;
      return totalPerOption;
    });
    return {
      id: topic.id,
      title: topicInfo.title,
      description: topicInfo.description,
      photo: topic.image,
      createdAt: moment(topic.createdAt).format("DD/MM/YYYY"),
      options: Object.keys(topicInfo.options).map((option) => {
        let percentage =
          Math.fround(
            (voteCountPerOption[option] / (total || 1)) * 100
          ).toFixed(2) + "%";
        return {
          id: option,
          title: topicInfo.options[option],
          percentage: percentage,
          isVotedOn:
            topic.votes.length !== 0 ? topic.votes[0].vote === option : false,
        };
      }),
    };
  });
  // topics = [
  //   {
  //     id: 1,
  //     title: "Some Title",
  //     description:
  //       "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  //     createdAt: "02/05/2023",
  //     photo:
  //       "data:image/jpeg;base64,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",
  //     options: [
  //       { id: 1, title: "Option 1", percentage: "40%", isVotedOn: true },
  //       { id: 2, title: "Option 2", percentage: "40%", isVotedOn: false },
  //       { id: 3, title: "Option 3", percentage: "20%", isVotedOn: false },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "Some Title 2",
  //     description:
  //       "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  //     createdAt: "07/08/2023",
  //     photo:
  //       "data:image/jpeg;base64,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",
  //     options: [
  //       { id: 4, title: "Option 1", percentage: "30%", isVotedOn: true },
  //       { id: 5, title: "Option 2", percentage: "50%", isVotedOn: false },
  //       { id: 6, title: "Option 3", percentage: "20%", isVotedOn: false },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: "Some Title 3",
  //     description:
  //       "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  //     createdAt: "07/08/2023",
  //     photo:
  //       "data:image/jpeg;base64,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",
  //     options: [
  //       { id: 7, title: "Option 1", percentage: "30%", isVotedOn: true },
  //       { id: 8, title: "Option 2", percentage: "50%", isVotedOn: false },
  //       { id: 9, title: "Option 3", percentage: "20%", isVotedOn: false },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: "Some Title 4",
  //     description:
  //       "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  //     createdAt: "07/08/2023",
  //     photo:
  //       "data:image/jpeg;base64,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",
  //     options: [
  //       { id: 10, title: "Option 1", percentage: "30%", isVotedOn: true },
  //       { id: 11, title: "Option 2", percentage: "50%", isVotedOn: false },
  //       { id: 12, title: "Option 3", percentage: "20%", isVotedOn: false },
  //     ],
  //   },
  // ];
  return (
    <div className="flex">
      <div className="w-0 md:w-1/6 mt-20 sticky md:px-5">
        <MainTagsList />
      </div>
      <div className="w-full md:w-4/6 px-3 lg:px-24 xl:px-40 2xl:px-72 pt-24">
        <MainTopicsList topics={topics} />
      </div>
      <div className="w-0 md:w-1/6 mt-20 sticky md:px-5">
        <PopularTopicsList />
      </div>
    </div>
  );
}
