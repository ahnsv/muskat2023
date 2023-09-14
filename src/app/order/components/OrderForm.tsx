"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import DaumPostCode from "react-daum-postcode";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Database } from "~/lib/database.types";
import { OrderPageSection } from "./OrderPageSelection";

import {
  ANONYMOUS,
  PaymentWidgetInstance,
  loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";
import { useAsync } from "react-use";
import { createClient } from "@supabase/supabase-js";

const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENT_CLIENT_KEY;

type Product = Database["public"]["Tables"]["products"];
type ProductRow = Product["Row"];

type OrderFormProps = {
  products: ProductRow[];
};

type OrderFormInput = {
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  deliveryAddressDetail: string;
};

function makeid(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const OrderForm: React.FC<OrderFormProps> = ({ products }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderFormInput>();
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        auth: {
            persistSession: false
        }
    }
  );
  const insertNewOrder = async (amount: number) => {
    return await supabase
      .from("orders")
      .insert({ user_id: 1, amount })
      .select();
  };
  const onSubmit: SubmitHandler<OrderFormInput> = async (data) => {
    const newOrder = await insertNewOrder(calculateTotalPrice());
    console.log(newOrder.data);
    console.error(newOrder.error);

    const paymentWidget = paymentWidgetRef.current;

    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
      // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
      await paymentWidget?.requestPayment({
        orderId: makeid(14),
        orderName: "샤인머스켓",
        customerName: data.name,
        customerEmail: data.email,
        successUrl: `${location.origin}/order/success`,
        failUrl: `${location.origin}/order/fail`,
      });
    } catch (error) {
      // 에러 처리하기
      console.error(error);
    }
  };
  const watchValues = watch(["price1", "price2", "price3", "price4"]);
  const productsWithKey = products.map((product, idx) => ({
    ...product,
    key: `price${idx + 1}` as "price1" | "price2" | "price3" | "price4",
  }));
  const calculateTotalPrice = useCallback(() => {
    return watchValues.reduce((total, product, index) => {
      return total + product * products[index].price;
    }, 0);
  }, [products, watchValues]);

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

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  //   const [price, setPrice] = useState(50000);
  useAsync(async () => {
    // ------  결제위젯 초기화 ------
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    // const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
    const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제

    // ------  결제위젯 렌더링 ------
    // 결제수단 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
    // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: calculateTotalPrice() },
      { variantKey: "DEFAULT" } // 렌더링하고 싶은 결제 UI의 variantKey
    );

    // ------  이용약관 렌더링 ------
    // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
    paymentWidget.renderAgreement("#agreement");

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // 새로운 결제 금액을 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(
      calculateTotalPrice(),
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [calculateTotalPrice]);
  return (
    <form className="mt-12 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 bg-gray-100 lg:bg-white mb-8">
        <OrderPageSection title="상품 선택">
          <div className="options space-y-4 py-4">
            {productsWithKey?.map((item, key: 0 | 1 | 2 | 3) => (
              <div
                className="product-item grid grid-cols-4 items-center"
                key={key}
              >
                <div className="product-name">{item.name}</div>
                <div className="product-description">{item.description}</div>
                <div className="product-price">
                  {item.price.toLocaleString()}
                </div>
                <Controller
                  name={item.key}
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="number"
                        min="0"
                        id={`price${key + 1}`}
                        className="border rounded-md p-2 w-full"
                      />
                    </>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="w-full text-right mt-4">
            <p className="font-bold text-2xl">총합</p>
            <p className="font-bold text-3xl">
              {calculateTotalPrice()?.toLocaleString()}원
            </p>
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
                {...register("name")}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">이메일</span>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="john@example.com"
                {...register("email")}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">핸드폰</span>
              <input
                type="phone"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="010-0000-0000"
                {...register("phone")}
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
                {...register("deliveryAddress")}
              />
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="상세 주소"
                {...register("deliveryAddressDetail")}
              />
            </label>
            {/* <input type="submit" /> */}
          </div>
        </OrderPageSection>
        <div id="payment-widget" style={{ width: "100%" }} />
        <div id="agreement" style={{ width: "100%" }} />
        <input
          type="submit"
          className="w-full bg-blue-400 py-2 h-12 rounded"
          title="결제하기"
        />
      </div>
    </form>
  );
};
