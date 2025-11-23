"use client";
import React, { useCallback, useState } from "react";
import WeeklyPerBarangay from "./WeeklyPerBarangay";
import { ProbabilitySampleData } from "@/data/DengueProbability";
import useSWR from "swr";
import { Localities } from "@/libraries/api/AdministrativeAreaAPI";
import ChartsTab from "./ChartsTab";
import InformationTab from "./InformationTab";
import {
  BarangaySelectionProvider,
  useBarangaySelection,
} from "./BarangaySelectionContext";

type Props = {};

const DashboardPage = (props: Props) => {
  const {
    data: brgyFetchData,
    error: brgyFetchError,
    isLoading: brgyFetchIsLoading,
  } = useSWR("admin-areas", () =>
    Localities.getAllBarangaysByPsgccode("0931700000")
  );

  const { ClearSelection, SelectBarangay, SelectedBarangay } =
    useBarangaySelection();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue == "") return;

    const [psgccode, name] = selectedValue.split("::");
    SelectBarangay(name, psgccode);
  };

  return (
    <div className="p-2 rounded-xl bg-white ">
      {/* name of each tab group should be unique */}

      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col">
          <label htmlFor="select_barangay" className="label">
            <span className="label-text">Barangay</span>
          </label>
          <select
            id="select_barangay"
            className="select select-primary w-52"
            defaultValue=""
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Barangay
            </option>
            {brgyFetchIsLoading == false &&
              brgyFetchData?.map((e) => {
                return (
                  <option key={e.psgcCode} value={`${e.psgcCode}::${e.name}`}>
                    {e.name}
                  </option>
                );
              })}
          </select>
        </div>

        {/* For Debugging only */}
        {/* <button className="hidden btn btn-primary text-warning-content place-self-center">
          Generate Data
        </button> */}
      </div>

      <div className="tabs tabs-border flex">
        <input
          type="radio"
          name="my_tabs_1"
          className="tab"
          aria-label="Information"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          <InformationTab />
        </div>
        <input
          type="radio"
          name="my_tabs_1"
          className="tab"
          aria-label="Charts"
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          <ChartsTab />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
