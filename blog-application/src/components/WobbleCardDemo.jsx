"use client";
import React from "react";
import WobbleCard from "./acertinityui/WobbleCard";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full h-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-white text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]">
            Welcome to Thoughts
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Discover a variety of articles on different topics, from technology to lifestyle.
          </p>
        </div>
        <img
          src="/blog.jpeg"
          width={500}
          height={500}
          alt="Blog demo image"
          className="absolute -right-4 lg:-right-[30%]  -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80 text-left text-white text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]">
          Recent Posts
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Stay updated with the latest posts on various subjects. We cover everything from tech news to personal development.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="text-left text-white text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Get the latest updates and articles delivered straight to your inbox. Join our community of readers today!
          </p>
        </div>
        <img
          src=""
          width={500}
          height={500}
          alt="Blog demo image"
          className="absolute -right-10 sm:-right-[60%] md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
