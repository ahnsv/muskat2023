"use client";

import { useEffect } from "react";
import bg from "../../public/assets/bg-main.png";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import {createClient} from "@supabase/supabase-js"

export default function Home() {
  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };
  // useEffect(() => {
  //   (async () => {
  //     const supabase = createClient('https://lpvmomdvmazjofbicqnt.supabase.co', 'anon')
  //     const { data, error } = await supabase.auth.signInWithOAuth({
  //       provider: "kakao",
  //       options: {
  //         redirectTo: getURL(),
  //       },
  //     });
      
  //   })();
  // });

  return (
    <div className="container">
      <div
        className={`w-screen h-screen py-16 bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      >
        <HeroSection />
      </div>
    </div>
  );
}
