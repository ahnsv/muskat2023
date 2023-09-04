"use client";

import { FC, useRef } from "react";
import { Black_Han_Sans } from "next/font/google";
import Image from "next/image";
import photos from "../../../../public/assets/btn-photos.png"

const BlackHanSans = Black_Han_Sans({ subsets: ["latin"], weight: "400" });

export const HeroSection: FC = () => {
  const containerRef = useRef<HTMLDivElement>();
  return (
    <div className={`hero h-full flex flex-col align-center justify-center`}  ref={containerRef}>
      <div
        className={`hero-title text-8xl ${BlackHanSans.className} text-center`}
      >
        험프리의 샤인 머스캣🍇
      </div>
      <div className="hero-menus flex align-center justify-center">
        <div className="hero-menu flex-1">
            Order Now
        </div>
        <div className="hero-menu flex-1">
            Delivery
        </div>
        <div className="hero-menu flex-1">
            Product Detail
        </div>
        <div className="hero-menu flex-1">
            <Image src={photos.src} alt="photos" width={300} height={250} className="cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};
