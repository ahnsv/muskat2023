"use client";

type OrderProductProps = {
  name: string;
  price: number;
  description: string;
};
export const OrderProduct: React.FC<OrderProductProps> = ({
  name,
  price,
  description,
}) => {
  return (
    <div className="product-item grid grid-cols-4 text-center items-center">
      <div className="product-name">{name}</div>
      <div className="product-description">{description}</div>
      <div className="product-price">{price}</div>
      <input
        type="number"
        name="counter"
        id="counter"
        placeholder="0"
        className="rounded"
      />
    </div>
  );
};
