import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "~/lib/database.types";
import { PreBuiltLoginForm } from "./pre-built-forms";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  // const supabase = createServerComponentClient<Database>({ cookies });

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  return (
    // <LoginForm />
    <PreBuiltLoginForm />
  );
}
