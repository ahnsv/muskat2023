import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "~/lib/database.types";
import { OrderForm } from "./components/OrderForm";

type Product = Database["public"]["Tables"]["products"];
type ProductRow = Product["Row"];

export const dynamic = "force-dynamic";


export default async function OrderPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from("products").select();

  return (
    <div className="order-page lg:container lg:mx-auto py-12 lg:px-24">
      <h1 className="lg:ml-2 font-bold leading-7 text-gray-900 text-4xl">
        주문하기
      </h1>
      <OrderForm products={data} />
    </div>
  );
}
