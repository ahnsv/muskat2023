"use client";

import { createClient } from "@supabase/supabase-js";

async function signInWithKakao() {
  const supabase = createClient(
    "https://lpvmomdvmazjofbicqnt.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
  });
}

export default function LoginPage() {
  return (
    <div className="flex">
      <div className="left-side h-screen w-full bg-black flex-1"></div>
      <div className="right-side flex-1 flex items-center justify-center flex-col">
        <div className="login-page-logo w-24 h-24">Logo</div>
        <div className="providers" onClick={signInWithKakao}>Providers</div>
      </div>
    </div>
  );
}
