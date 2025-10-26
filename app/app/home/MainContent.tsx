import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const MainContent = (props: Props) => {
  return (
    <div className="h-full">
      <div className="flex flex-col lg:justify-between lg:items-center lg:flex-row-reverse">
        <Image
          width={500}
          height={500}
          src="/images/Dengue_Water.webp"
          alt="mosquitos in water"
          className="h-full  shadow-2xl"
        />
        <div className="w-2/5 h-full px-2 flex flex-col justify-between">
          <h1 className="lg:text-3xl font-bold">
            Battle Against Dengue: Join Forces to Stop the Mosquito Menace!
          </h1>
          <p className="font-medium text-lg">
            Predict and prevent dengue outbreaks
          </p>
          <p className="py-6">
            D-APP is a web app that uses real-time data and time series analysis
            to predict future dengue outbreaks. By analyzing weather patterns,
            historical case data, and geographic trends, the app provides early
            warnings, risk level maps, and health tips empowering users and
            health officials to take preventive action before outbreaks occur.
          </p>
          <Link href={"/app/dashboard"} className="btn btn-primary">
            Predict Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
