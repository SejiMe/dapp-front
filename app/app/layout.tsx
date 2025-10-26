import React from "react";
import AppHeader from "./AppHeader";
import AppSideBar from "./AppSideBar";

export default function SigningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-screen bg-gray-100">
      {/* Header */}
      <AppHeader />

      {/* Main Content Area */}
      <div className="flex flex-row flex-1 h-full overflow-hidden">
        {/* Sidebar */}
        <AppSideBar />
        {/* Page Content */}
        <main className="text-base-content flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 p-3 ">
          {children}
        </main>
      </div>
    </div>
  );
}
