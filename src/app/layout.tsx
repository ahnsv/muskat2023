import Script from "next/script";
import "./globals.css";
import type { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthProvider from "./components/AuthProvider";
import bg from "~/public/assets/bg-main.png"

export const metadata: Metadata = {
  title: "험프리의 샤인머스켓 2023",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const homeURL = "https://muskat2023.humphreyahn.dev"

  const accessToken = session?.access_token || null;
  return (
    <html lang="en">
      <meta property="og:title" content="험프리의 샤인 머스켓 | Shine Muskat 2023"></meta>
      <meta property="og:description" content="2023 후회없는 선택 - 험프리의 샤인 머스켓" />
      <meta property="og:url" content={homeURL}></meta>
      <meta property="og:image" content={`${homeURL}/${bg.src}`}></meta>
      <meta
        property="description"
        content="2023 후회없는 선택 - 험프리의 샤인 머스켓"
      />
      <Script src="https://www.youtube.com/iframe_api" async />
      <body>
        <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
        <div id="portal" />
      </body>
    </html>
  );
}
