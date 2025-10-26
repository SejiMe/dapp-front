import React from "react";

type Props = {};

const AppHeader = (props: Props) => {
  return (
    <header className="bg-white justify-between flex border-b border-gray-200 px-6">
      <div className="flex items-center gap-2 border-gray-200">
        <img
          src={"/logo/mosquito.svg"}
          className="w-1/4 h-24"
          alt="Logo Dengue"
        ></img>
        <h2 className="text-base-content text-3xl">D-APP</h2>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button className="btn btn-ghost p-2 text-base-content hover:text-info-content hover:bg-accent rounded-md transition-colors">
          <span className="material-symbols-outlined">calendar_month</span>
        </button>

        <button className="btn btn-ghost p-2 text-base-content hover:text-info-content hover:bg-accent rounded-md transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <button className="btn btn-ghost p-2 text-base-content hover:text-info-content hover:bg-accent rounded-md transition-colors">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
