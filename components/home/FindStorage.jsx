import React from "react";
import FindStorageCard from "./FindStorageCard";

const FindStorage = () => {
  return (
    <section className="bg-[#f9f9f9] w-full">
      <div className="max-w-[90%] lg:max-w-[85%] mx-auto pt-[4rem] md:pt-[6rem] ">
        <h2 className="text-center md:mb-[6rem] mb-[4rem]  font-semibold text-2xl text-[#222222]">Find Storage Near You</h2>

        <div className="flex  flex-wrap justify-center md:justify-between">
          <FindStorageCard />
          <FindStorageCard />
          <FindStorageCard />
          <FindStorageCard />
          <FindStorageCard />
          <FindStorageCard />
        </div>
      </div>
    </section>
  );
};

export default FindStorage;
