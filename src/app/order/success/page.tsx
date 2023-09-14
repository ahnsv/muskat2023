import { format } from "date-fns";
import { redirect } from "next/navigation";

async function getData(searchParams) {
  const { paymentKey, orderId, amount } = searchParams;

  const response = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_TOSS_PAYMENT_CLIENT_SECRET}:`
        ).toString("base64")}`,
        'Content-Type': "application/json"
      },
    }
  );

  const text = await response.text();
  console.log({ text });

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null
    // throw new Error(`[statusCode: ${response.status}] Failed to fetch data`);
  }

  return response.json();
}

export default async function SuccessPage({ searchParams }) {
  const payment = await getData(searchParams);
  console.log({searchParams});
  
  if (!payment) {
    redirect('/order/fail')
  }

  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>결제 성공</h1>
      <p>주문: {payment.orderName}</p>
      <p>결제 수단: {payment.method}</p>
      <p>결제 금액: {payment.totalAmount.toLocaleString()}원</p>
      <p>
        결제 일시: {format(new Date(payment.approvedAt), "yyyy/MM/dd HH:mm:ss")}
      </p>
      <p>
        <a href={payment.receipt.url}>영수증</a>
      </p>
    </main>
  );
}