"use client";

import { FC, useRef } from "react";
import { Black_Han_Sans } from "next/font/google";
import Image from "next/image";
import order from "../../../../public/assets/btn-order.png";
import photos from "../../../../public/assets/btn-albums.png";
import shipping from "../../../../public/assets/btn-ship.png";
import Link from "next/link";
import SoundButton from "@/app/components/SoundButton";

const BlackHanSans = Black_Han_Sans({ subsets: ["latin"], weight: "400" });

export const HeroSection: FC = () => {
  const containerRef = useRef<HTMLDivElement>();
  return (
    <div
      className={`hero h-full flex flex-col align-center justify-center`}
      ref={containerRef}
    >
      <SoundButton youtubeVideoID={`M0U9iaH19wo`} />
      <div
        className={`hero-title text-5xl lg:text-7xl text-gray-700 ${BlackHanSans.className} text-center italic my-8`}
      >
        험프리네 <br></br>
        샤인 머스캣🍇
      </div>
      <div className="hero-menus flex items-center justify-center">
        <div className="hero-menu flex-1 mt-16">
          <Link href={`/product`} className="flex flex-col align-center">
            <Image
              src={shipping.src}
              alt="shipping"
              width={300}
              height={250}
              className="cursor-pointer"
            />
            <div className="menu-title text-2xl font-bold text-center">
              패키지
            </div>
          </Link>
        </div>
        <div className="hero-menu flex-1 text-center">
          <Link
            href={`https://www.humphreyahn.dev/muskat2023`}
            className="flex flex-col align-center"
          >
            <Image
              src={order.src} // TODO: replace with product detail icon
              alt="order"
              width={300}
              height={250}
              className="cursor-poi지ter"
            />
            <div className="menu-title text-2xl font-bold text-center">
              상품 상세
            </div>
          </Link>
        </div>
        <div className="hero-menu flex-1 mt-32">
          <Image
            src={photos.src}
            alt="photos"
            width={300}
            height={250}
            className="cursor-pointer"
            onClick={() => alert('준비중인 기능입니다.')}
          />
          <div className="menu-title text-2xl font-bold text-center">
            이미지
          </div>
        </div>
      </div>
    </div>
  );
};
