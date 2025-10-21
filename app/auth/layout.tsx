import React from "react";

export default function SigningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-base-200 text-base-content flex justify-center items-center min-h-screen min-w-screen">
      <div className="h-full flex place-content-center ">
        {/* Left Side Panel */}
        <div className="bg-base-300 text-center p-2 w-2/5 lg:text-left hidden md:block">
          <h1 className="text-5xl font-bold">Account Registration</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        {/* Right Side Panel */}
        <div className="card grow bg-base-100 p-2 w-3/5 max-w-3xl  shrink-0 shadow-2xl">
          <div className="card-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
