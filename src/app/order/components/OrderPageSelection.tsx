import { ReactNode } from "react";

type OrderPageSectionProps = {
  title: string;
  children: ReactNode;
};
export const OrderPageSection: React.FC<OrderPageSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="cart bg-white px-4 py-2">
      <p className="title text-2xl font-bold">{title}</p>
      {/* <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" /> */}
      {children}
    </div>
  );
};
