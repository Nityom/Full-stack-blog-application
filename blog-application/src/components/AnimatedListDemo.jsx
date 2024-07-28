"use client";

import { cn } from "../lib/utils";
import AnimatedList from "./magicui/AnimatedList";

let notifications = [
  {
    name: "New Tech Post",
    description: "Exploring the latest trends in AI",
    time: "15m ago",
    icon: "🤖",
    color: "#00C9A7",
  },
  {
    name: "Lifestyle Tips",
    description: "10 Ways to Improve Your Daily Routine",
    time: "10m ago",
    icon: "💡",
    color: "#FFB800",
  },
  {
    name: "Health Update",
    description: "The Benefits of a Balanced Diet",
    time: "5m ago",
    icon: "🍎",
    color: "#FF3D71",
  },
  {
    name: "Travel Diary",
    description: "Top 5 Destinations for 2024",
    time: "2m ago",
    icon: "✈️",
    color: "#1E86FF",
  },
  {
    name: "Finance Advice",
    description: "How to Save Money Efficiently",
    time: "1m ago",
    icon: "💰",
    color: "#8E44AD",
  },
  {
    name: "New Recipe",
    description: "Healthy Smoothie Ideas",
    time: "30s ago",
    icon: "🥤",
    color: "#E67E22",
  },
];

// Duplicate notifications for demonstration
notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        " [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({ className }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg  bg-background md:shadow-xl mt-10",
        className
      )}
    >
      <h1 className="text-5xl font-extrabold tracking-tight text-center mb-5 text-white sm:text-6xl lg:text-7xl flex gap-4 flex-col">
        Explore Different Cultures
      </h1>
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
