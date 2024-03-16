"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import timedStatsConverter from "../_lib/timedStatsConverter";

const TopicStats = ({ options, timedStats }) => {
  let { data, monthlyData, recommendedTimeSlicing } =
    timedStatsConverter(timedStats);
  let colors = ["#8884d8", "#82ca9d", "#61c0f7", "#dcf15f", "#f1a15f"];
  const [timeSlicing, setTimeSlicing] = useState(recommendedTimeSlicing);

  return (
    <div className="bg-primary-foreground rounded-md mb-7 w-full max-h-min ">
      <div className="w-full flex justify-between">
        <h1 className="text-base font-semibold py-3 px-5">Statistics</h1>
        <div className="flex py-3 px-5 gap-2 ">
          <button
            className={`border-b  ${
              timeSlicing === "daily"
                ? "border-b-popover-foreground"
                : "border-b-transparent"
            }`}
            onClick={() => setTimeSlicing("daily")}
          >
            Daily
          </button>
          <button
            className={`border-b ${
              timeSlicing === "monthly"
                ? " border-b-popover-foreground"
                : "border-b-transparent"
            }`}
            onClick={() => setTimeSlicing("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="w-full overflow-hidden h-[26rem]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={timeSlicing === "daily" ? data : monthlyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip label={"name"} labelClassName="text-popover" />
            <Legend />
            {options.map((option, index) => (
              <Line
                key={index}
                type={"monotone"}
                dataKey={index}
                stroke={colors[index]}
                activeDot={{ r: 8 }}
                name={option.title}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopicStats;
