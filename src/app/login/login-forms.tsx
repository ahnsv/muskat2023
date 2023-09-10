"use client";
import { createClient } from "@supabase/supabase-js";

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
  return (
    <div className="flex">
      <div className="left-side h-screen w-full bg-black flex-1"></div>
      <div className="right-side flex-1 flex items-center justify-center flex-col">
        <div className="login-page-logo w-24 h-24">Logo</div>
        <div className="providers" onClick={signInWithKakao}>
          Providers
        </div>
      </div>
    </div>
  );
};
