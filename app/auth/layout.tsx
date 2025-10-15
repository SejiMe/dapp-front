
import React from "react";

export default function SigningLayout({ children }: {children: React.ReactNode}) {
    return (
        <div className="bg-base-200 text-base-content flex justify-center items-center min-h-screen min-w-screen">
            {children}                
        </div>
    )
}