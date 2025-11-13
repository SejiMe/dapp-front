"use client";
import React from "react";
import AppHeader from "./AppHeader";
import AppSideBar from "./AppSideBar";
import { CalendarProvider } from "./CalendarContext";

export default function SigningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CalendarProvider>
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <AppHeader />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <AppSideBar />
          {/* Page Content */}
          <main className="text-base-content flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 p-3">
            {children}
          </main>
        </div>
      </div>
    </CalendarProvider>
  );
}
