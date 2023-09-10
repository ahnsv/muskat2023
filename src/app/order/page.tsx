import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "~/lib/database.types";
import { OrderProduct } from "./components/OrderProduct";

type Product = Database["public"]["Tables"]["products"];

export const dynamic = "force-dynamic";

export default async function OrderPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from("products").select();

  return (
    <div className="order-page container mx-auto py-12 px-4 lg:px-2">
      <h1 className="font-bold leading-7 text-gray-900 text-7xl">주문하기</h1>
      {/* <hr className="h-px mt-16 bg-gray-200 border-0 dark:bg-gray-700" /> */}
      <form className="mt-12">
        <div className="space-y-12">
          <div className="cart">
            <p className="title text-3xl text-gray-500 font-bold">상품 담기</p>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="options space-y-4">
              {data &&
                data.map((item, key) => <OrderProduct key={key} {...item} />)}
            </div>
          </div>
          <div className="delivery space-y-4">
            <p className="title text-xl text-gray-500">배송 정보</p>
            <label className="block">
              <span className="text-gray-700">이름</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder=""
              />
            </label>
            <label className="block">
              <span className="text-gray-700">이메일</span>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="john@example.com"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">핸드폰</span>
              <input
                type="phone"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="010-0000-0000"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">주소</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="주소"
              />
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="상세 주소"
              />
            </label>
          </div>
          <div className="purchase text-xl text-gray-500">결제</div>
        </div>
      </form>
    </div>
  );
}
