import React from "react";
import WeeklyPerBarangay from "./WeeklyPerBarangay";
import { ProbabilitySampleData } from "@/data/DengueProbability";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="p-2 rounded-xl bg-white ">
      {/* name of each tab group should be unique */}
      <form className="flex flex-1 justify-between">
        <div className="flex flex-col">
          <label htmlFor="select_timeline" className="label">
            <span className="label-text">Timeline</span>
          </label>
          <select
            id="select_timeline"
            className="select select-primary w-full"
            defaultValue="2025"
          >
            <option value="2025">Current Year</option>
            <option value="2024">Last Year</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="select_barangay" className="label">
            <span className="label-text">Barangay</span>
          </label>
          <select
            id="select_barangay"
            className="select select-primary w-full"
            defaultValue="N/a"
            disabled
          >
            <option value="N/a" disabled>
              Select Barangay
            </option>
            <option value="123">Arena Blanco</option>
          </select>
        </div>
      </form>

      <div className="tabs tabs-border">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Information"
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Downloads</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">New Users</div>
              <div className="stat-value">4,200</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">New Registers</div>
              <div className="stat-value">1,200</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Charts"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          <WeeklyPerBarangay data={ProbabilitySampleData} />
        </div>

        {/* <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Tab 3"
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          Tab content 3
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
