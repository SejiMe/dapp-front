import AppLink from "@/components/app/AppLink";
import Link from "next/link";
import React from "react";

type Props = {};

const AppSideBar = (props: Props) => {
  return (
    <aside className="hidden lg:block w-56 bg-white border-r border-gray-200 overflow-x-hidden shrink-0">
      <nav className="p-2 flex flex-1 flex-col gap-2">
        <AppLink href="/app/home">
          <span>🏠</span>
          <span>Home</span>
        </AppLink>

        <AppLink href="/app/prediction">
          <span>📊</span>
          <span>Prediction</span>
        </AppLink>
      </nav>
    </aside>
  );
};

export default AppSideBar;
