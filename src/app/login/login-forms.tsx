"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Provider, createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Database } from "~/lib/database.types";
import kakao from "~/public/assets/kakao.png";
import google from "~/public/assets/google.png";
import logo from "~/public/assets/logo.png";

import Image from "next/image";

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

async function signInWithKakao() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: getURL(),
    },
  });
}

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const signInWithProvider = (provider: Provider) => async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${getURL()}/auth/callback`,
      },
    });
    router.refresh();
  };
  return (
    <div className="flex">
      <div
        className="left-side h-screen w-full flex-1"
        style={{ backgroundColor: "#b3b70b" }}
      ></div>
      <div className="right-side flex-1 flex items-center justify-center flex-col">
        <div className="login-page-logo w-24 h-24 text-center flex items-center justify-center flex-col my-8">
              <Image src={logo.src} width={50} height={50} alt="Kakao" />
              <div className="title font-black">
                SHINE MUSKAT
              </div>
        </div>
        <div className="providers flex flex-col w-64">
          <div className="providers-block flex lg:w-full items-center justify-center">
            <div
              className="provider-kakao p-2 mx-4 hover:bg-gray-200 rounded transition cursor-pointer"
              onClick={signInWithProvider("kakao")}
            >
              <Image src={kakao.src} width={25} height={25} alt="Kakao" />
            </div>
            <div
              className="provider-google p-2 mx-4 hover:bg-gray-200 rounded transition cursor-pointer"
              onClick={signInWithProvider("google")}
            >
              <Image src={google.src} width={25} height={25} alt="google" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
