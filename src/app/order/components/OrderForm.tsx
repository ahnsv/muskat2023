"use client";

import { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import { Database } from "~/lib/database.types";
import { OrderPageSection } from "./OrderPageSelection";
import { OrderProduct } from "./OrderProduct";
import PaymentBlock from "./PaymentBlock";
import { useForm, SubmitHandler } from "react-hook-form";

type Product = Database["public"]["Tables"]["products"];
type ProductRow = Product["Row"];

type OrderFormProps = {
  products: ProductRow[];
};

type OrderFormInput = {
  price: number;
};

export const OrderForm: React.FC<OrderFormProps> = ({ products }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderFormInput>();
  const onSubmit: SubmitHandler<OrderFormInput> = (data) => console.log(data);

  const [openPostCode, setOpenPostCode] = useState(false);
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostCode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `);
      setOpenPostCode(false);
    },
  };
  return (
    <form className="mt-12 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 bg-gray-100 lg:bg-white mb-8">
        <OrderPageSection title="상품 선택">
          <div className="options space-y-4 py-4">
            {products &&
              //   products.map((item, key) => <OrderProduct key={key} {...item} {...register('price')}/>)}
              products.map((item, key) => (
                <div
                  className="product-item grid grid-cols-4 text-center items-center"
                  key={key}
                >
                  <div className="product-name">{item.name}</div>
                  <div className="product-description">{item.description}</div>
                  <div className="product-price">
                    {item.price.toLocaleString()}
                  </div>
                  <input
                    type="number"
                    name="counter"
                    id={`${item.id}-counter`}
                    placeholder="0"
                    className="rounded"
                    {...register("price")}
                  />
                </div>
              ))}
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
            <label className="block" onClick={handle.clickButton}>
              {openPostCode && (
                <DaumPostCode
                  onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                  autoClose={true} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                />
              )}
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
      </div>
    </form>
  );
};
