import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { LoginForm } from "./login-forms";
import { Database } from '~/lib/database.types';

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log({session})

  return (
    <LoginForm />
  );
}
