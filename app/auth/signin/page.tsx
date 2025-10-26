"use client";

import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {};

const LoginPage = (props: Props) => {
  const HandleTemp = () => {
    redirect("/app/");
  };

  return (
    <form action="submit">
      <fieldset className="fieldset">
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

        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input"
          placeholder="Password"
        />

        <div>
          <Link href="#" className="link link-hover">
            Forgot password?
          </Link>
        </div>
        <div>
          No Account? Sign up{" "}
          <Link href="/auth/signup" className="link link-accent">
            here
          </Link>
        </div>
        <button
          type="button"
          onClick={HandleTemp}
          className="btn btn-neutral mt-4"
        >
          Login
        </button>
      </fieldset>
    </form>
  );
};

export default LoginPage;
