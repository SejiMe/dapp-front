"use client";

import { Localities } from "@/libraries/api/DengueAPI";
import React, { useState } from "react";
import useSWR from "swr";

type Props = {};

const SignupPage = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { data: regionData, error: regionFetchError } = useSWR("Regions", () =>
    Localities.getAllRegions()
  );

  return (
    <form action="submit">
      <fieldset className="fieldset flex flex-col md:flex-row">
        <legend>User Account</legend>
        {/* Left Panel */}
        <div className="flex flex-col">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input w-full"
            placeholder="Email"
          />
          {/*  Passwords */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div>
              <label className="label">Password</label>
              <label
                htmlFor="confirmPassword"
                className="input flex items-center"
              >
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "password" : "text"}
                  placeholder="Password"
                />
              </label>
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <label
                htmlFor="confirmPassword"
                className="input flex items-center"
              >
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "password" : "text"}
                  placeholder="Password"
                />
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex text-gray-600 justify-center btn btn-ghost mt-0.5"
          >
            <span className="material-symbols-outlined text-[22px] select-none">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
            {showPassword ? "Show Password" : "Hide Password"}
          </button>

          <label htmlFor="FirstName" className="label">
            First Name
          </label>
          <input
            className="input w-full"
            type="text"
            name="FirstName"
            id="FirstName"
            required
            placeholder="Juan"
          />

          <label htmlFor="MiddleName" className="label">
            Middle Name
          </label>
          <input
            className="input w-full"
            type="text"
            name="MiddleName"
            id="MiddleName"
            placeholder="Garcia"
          />

          <div className="grid gap-2 grid-cols-1 lg:grid-cols-3">
            <div className="col-span-1 lg:col-span-2">
              <label htmlFor="LastName" className="label">
                Last Name
              </label>
              <input
                className="input"
                type="text"
                name="LastName"
                id="LastName"
                required
                placeholder="Dela Cruz"
              />
            </div>

            <div>
              <label htmlFor="SelectSuffix" className="label">
                Suffix
              </label>
              <select
                id="SelectSuffix"
                name="SelectSuffix"
                className="select"
                defaultValue="N/a"
              >
                <option>N/a</option>
                <option>Jr.</option>
                <option>Sr.</option>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
                <option>V</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divider divider-neutral lg:divider-horizontal"></div>
        {/* Regions */}
        <div className="flex flex-col gap-2">
          <div className="w-full">
            <label>Regions</label>
            <select id="Regions" name="Regions" className="select">
              <option key={1}>Select Region</option>
              {regionData?.map((i) => (
                <option key={i.psgcCode} value={i.psgcCode}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label>Province</label>
            <select id="Province" name="Province" className="select">
              <option key={1}>Select Province</option>
              {regionData?.map((i) => (
                <option key={i.psgcCode} value={i.psgcCode}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label>City / Municipality</label>
            <select
              id="City_Municipality"
              name="City / Municipality"
              className="select"
            >
              <option key={1}>Select City/Municipality</option>
              {regionData?.map((i) => (
                <option key={i.psgcCode} value={i.psgcCode}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label>Barangay</label>
            <select id="Barangay" name="Barangay" className="select">
              <option key={1}>Select Barangay</option>
              {regionData?.map((i) => (
                <option key={i.psgcCode} value={i.psgcCode}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>
      <div className="w-full flex justify-end">
        <button className="btn btn-accent w-2/5">Register</button>
      </div>
    </form>
  );
};

export default SignupPage;
