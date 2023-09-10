import { Database } from "~/lib/database.types";
import { OrderPageSection } from "./OrderPageSelection";
import { OrderProduct } from "./OrderProduct";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Product = Database["public"]["Tables"]["products"];
type ProductRow = Product["Row"];

type OrderFormProps = {
  products: ProductRow[];
};
export const OrderForm: React.FC<OrderFormProps> = async ({ products }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from("order").insert({});
  
  return (
    <form className="mt-12 flex flex-col">
      <div className="space-y-2 bg-gray-100 lg:bg-white">
        <OrderPageSection title="상품 선택">
          <div className="options space-y-4 py-4">
            {products &&
              products.map((item, key) => <OrderProduct key={key} {...item} />)}
          </div>
        </OrderPageSection>
        <OrderPageSection title="배송 정보">
          <div className="inputs space-y-4 py-4">
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
        </OrderPageSection>
        <OrderPageSection title="결제">
          <div className="content">hello</div>
        </OrderPageSection>
      </div>
      <button className="submit-btn bg-blue-400 rounded p-4 w-48 self-end">제출</button>
    </form>
  );
};