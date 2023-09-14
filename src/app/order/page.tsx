import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "~/lib/database.types";
import { OrderForm } from "./components/OrderForm";
import { redirect } from "next/navigation";


export const dynamic = "force-dynamic";

export default async function OrderPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: products } = await supabase.from("products").select().order("id");
  // 심사를 위해 임시 제거
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="order-page lg:container lg:mx-auto py-12 lg:px-24">
      <h1 className="lg:ml-2 font-bold leading-7 text-gray-900 text-4xl pl-4 lg:pl-0">
        주문하기
      </h1>
      <span className="block px-4 lg:px-2 mt-8">
        상품 갯수를 입력 후, 배송지와 쿠폰 그리고 결제 방법을 입력해주세요.
      </span>
      <OrderForm products={products} />
      {/* <PaymentBlock /> */}
    </div>
  );
}
