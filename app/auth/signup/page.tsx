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
    <div className="h-full flex place-content-center  ">
      <div className="bg-base-300 text-center p-2 w-2/5 lg:text-left">
        <h1 className="text-5xl font-bold">Account Registration</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div className="card grow bg-base-100 p-2 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form action="submit">
            <fieldset className="fieldset flex">
              <legend>User Account</legend>
              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />

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
                  className="flex text-gray-600 justify-center btn btn-ghost"
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
                  className="input"
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
                  className="input"
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
              <div>
                <label>Regions</label>
                <select id="Regions" name="Regions" className="select">
                  <option key={1}>Select Region</option>
                  {regionData?.map((i) => (
                    <option key={i.psgcCode} value={i.psgcCode}>
                      {i.name}
                    </option>
                  ))}
                </select>

                <button className="btn btn-accent">Register</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
