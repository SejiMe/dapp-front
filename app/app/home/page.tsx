import React from "react";
import MainContent from "./MainContent";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="p-2 rounded-xl bg-white h-full">
      <MainContent />
    </div>
  );
};

export default HomePage;
