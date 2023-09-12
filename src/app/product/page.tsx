import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ProductDetail from "./components/ProductDetail";
import { Database } from "~/lib/database.types";
import { cookies } from "next/headers";

export default async function ProductPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: products } = await supabase.from("products").select();
  return <ProductDetail options={products}/>;
}
