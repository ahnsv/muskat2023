"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { useState } from "react";

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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const radii = ["5px", "10px", "20px"] as const;
const colors = [
  "rgb(202, 37, 37)",
  "rgb(65, 163, 35)",
  "rgb(8, 107, 177)",
  "rgb(235, 115, 29)",
] as const;
const views: { id: ViewType; title: string }[] = [
    { id: 'sign_in', title: 'Sign In' },
    { id: 'sign_up', title: 'Sign Up' },
    { id: 'magic_link', title: 'Magic Link' },
    { id: 'forgotten_password', title: 'Forgotten Password' },
    { id: 'update_password', title: 'Update Password' },
    { id: 'verify_otp', title: 'Verify Otp' },
  ]

export const PreBuiltLoginForm: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [borderRadius, setBorderRadius] = useState(radii[0] as string);
  const [brandColor, setBrandColor] = useState(colors[2] as string);
  const [view, setView] = useState(views[0])

  return (
    <div className="flex">
      <div className="left-side h-screen w-0 lg:w-full bg-black lg:flex-1"></div>
      <div className="right-side flex-1 flex items-center justify-center flex-col lg:flex-1">
        {/* <div className="login-page-logo w-24 h-24">Logo</div> */}
        <div className="providers w-full px-8 lg:px-32">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  borderRadius: borderRadius,
                  borderColor: "rgba(0,0,0,0)",
                },
              },
              variables: {
                default: {
                  colors: {
                    brand: brandColor,
                    brandAccent: `gray`,
                  },
                },
              },
            }}
            providers={["google", "kakao"]}
            theme={theme}
            redirectTo={getURL()}
            dark
            view={view.id}
            socialLayout="horizontal"
            localization={{
              variables: {
                sign_in: {
                  email_label: "이메일",
                  email_input_placeholder: "이메일을 입력해주세요",
                  password_label: "비밀번호",
                  password_input_placeholder: "비밀번호를 입력해주세요",
                  button_label: "로그인",
                  social_provider_text: "",
                },
                sign_up: {
                  email_label: "이메일",
                  email_input_placeholder: "이메일을 입력해주세요",
                  password_label: "비밀번호",
                  password_input_placeholder: "비밀번호를 입력해주세요",
                  button_label: "가입하기",
                },
                forgotten_password: {
                  button_label: "비밀번호 찾기",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
