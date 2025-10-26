"use client";
import { ClassValue } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@library-ui/CnExtension";
interface AppLinkProps {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
  activeClassName?: ClassValue;
  className?: ClassValue;
}
const AppLink = ({
  children,
  href,
  exact,
  activeClassName = "btn-info text-xl",
  className = "btn-ghost text-base-content hover:btn-soft hover:btn-accent text-lg ",
}: AppLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        "btn lg:h-16",
        "transition-all duration-500 ease-[cubic-bezier(0.260, 0.590, 0.880, 0.255)]",
        "transform",
        isActive ? activeClassName : className
      )}
    >
      {children}
    </Link>
  );
};

export default AppLink;
