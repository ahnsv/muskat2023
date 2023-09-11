import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "~/lib/database.types";
import { PreBuiltLoginForm } from "./pre-built-forms";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect('/');
  }

  return (
    // <LoginForm />
    <PreBuiltLoginForm />
  );
}
