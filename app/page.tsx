'use client';
import Image from "next/image";
import Landing  from "@/app/landing";
import AboutUs from "./about-us";
import { useEffect, useState } from "react";
import { useSmoothScroll } from "@/libraries/SmoothScroll";
export default function Home() {
  
  useSmoothScroll();

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) 

  return (
    <div className="flex flex-col bg-base-100 text-primary-content">
      <header className={`
          sticky top-0 z-30 flex h-16 w-full justify-between items-center
          px-6 transition-all duration-500 bg-white
          
        `}>
        <div className="w-1/5 flex items-center gap-0 h-full">
          <img src={'/logo/mosquito.svg'} className="w-2/4 h-2/4" alt="Logo Dengue"></img>
          <h2>Dengue App</h2>
        </div>
        <nav className="h-full flex text-2xl justify-end items-center gap-10">
          <a href="#landing">Home</a>
          <a href="#about-us">About Us</a>
        </nav>
      </header>
      <Landing />
      <AboutUs />
      <footer className="footer bg-base-200">
        <div>

        </div>
      </footer>
    </div>
  );
}

