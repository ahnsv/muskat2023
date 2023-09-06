export default function OrderPage() {
  return (
    <div className="order-page container mx-auto py-12">
      <h1 className="font-bold leading-7 text-gray-900 text-7xl">
        주문하기
      </h1>
      <form className="mt-12">
        <div className="space-y-12">
          <div className="cart">
            <p className="title text-xl text-gray-500">상품 담기</p>
            <div className="product-item flex flex-row space-x-8 mt-1 align-center">
              <div className="product-name">샤인머스켓 2kg</div>
              <div className="product-price">30,000</div>
              <input
                type="number"
                name="counter"
                id="counter"
                placeholder="0"
                className="rounded"
              />
            </div>
            <div className="product-item flex flex-row space-x-8 mt-1">
              <div className="product-name">샤인머스켓 4kg</div>
              <div className="product-price">50,000</div>
              <input
                type="number"
                name="counter"
                id="counter"
                placeholder="0"
                className="rounded"
              />
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
