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
      className={`hero h-full flex flex-col items-center justify-center`}
      ref={containerRef}
    >
      <div className="banner bg-red-400 rounded absolute top-0 px-4 py-2 text-white font-black my-4 mx-4 transition relative animate-bounce">
        <span>
          ℹ️ 수량 부족으로 인해 완판되었습니다. 빠른 시일 내에 다시 찾아뵙겠습니다. (2023-09-19)
        </span>
      </div>
      <SoundButton youtubeVideoID={`M0U9iaH19wo`} />
      <div
        className={`hero-title text-5xl lg:text-7xl text-gray-700 ${BlackHanSans.className} text-center italic my-8`}
      >
        험프리네 <br></br>
        샤인 머스캣🍇
      </div>
      <div className="hero-menus flex items-center justify-center">
        <div className="hero-menu flex-1 mt-16">
          <Link
            href={`/`}
            className="flex flex-col items-center"
            onClick={() =>
              alert(
                "수량 부족으로 인해 완판되었습니다. 빠른 시일 내에 다시 찾아뵙겠습니다."
              )
            }
          >
            <Image
              src={shipping.src}
              alt="shipping"
              width={300}
              height={250}
              className="cursor-pointer"
            />
            <div className="menu-title text-2xl font-bold text-center">
              {/* 패키지 */}
            </div>
          </Link>
        </div>
        <div className="hero-menu flex-1 text-center">
          <Link
            href={`https://www.humphreyahn.dev/muskat2023`}
            className="flex flex-col items-center"
          >
            <Image
              src={order.src} // TODO: replace with product detail icon
              alt="order"
              width={300}
              height={250}
              className="cursor-poi지ter"
            />
            <div className="menu-title text-2xl font-bold text-center">
              {/* 상품 상세 */}
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
            onClick={() => alert("준비중인 기능입니다.")}
          />
          <div className="menu-title text-2xl font-bold text-center">
            {/* 이미지 */}
          </div>
        </div>
      </div>
    </div>
  );
};
