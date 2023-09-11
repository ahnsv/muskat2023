import Script from "next/script";
import "./globals.css";
import type { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthProvider from "./components/AuthProvider";

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

  const accessToken = session?.access_token || null;
  return (
    <html lang="en">
      <Script src="https://www.youtube.com/iframe_api" async />
      <body>
        <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
      </body>
    </html>
  );
}
