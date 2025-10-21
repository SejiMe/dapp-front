import React from "react";

type Props = {};

const AppSideBar = (props: Props) => {
  return (
    <aside className="w-56 bg-white border-r border-gray-200">
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <span className="text-xl">🎯</span>
        <span className="font-semibold">D-APP</span>
      </div>

      <nav className="p-2">
        <a
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <span>🏠</span>
          <span>Home</span>
        </a>

        <a
          href="/prediction"
          className="flex items-center gap-3 px-4 py-3 bg-gray-200 text-gray-900 rounded-md font-medium"
        >
          <span>📊</span>
          <span>Prediction</span>
        </a>
      </nav>
    </aside>
  );
};

export default AppSideBar;
