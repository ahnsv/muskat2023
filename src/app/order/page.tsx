import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "~/lib/database.types";
import { OrderForm } from "./components/OrderForm";
import { redirect, usePathname } from "next/navigation";

type Product = Database["public"]["Tables"]["products"];

export const dynamic = "force-dynamic";

export default async function OrderPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: products } = await supabase.from("products").select();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="order-page lg:container lg:mx-auto py-12 lg:px-24">
      <h1 className="lg:ml-2 font-bold leading-7 text-gray-900 text-4xl pl-4">
        주문하기
      </h1>
      <OrderForm products={products} />
    </div>
  );
}
