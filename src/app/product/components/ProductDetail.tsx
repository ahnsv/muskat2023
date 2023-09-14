"use client";
import React, { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { Database } from "~/lib/database.types";
import { useRouter } from "next/navigation";

type Product = Database["public"]["Tables"]["products"]["Row"];
type ProductDetailProps = {
  options: Product[];
};

const ProductDetail: React.FC<ProductDetailProps> = ({ options }) => {
  const [selectedPackage, setSelectedPackage] = useState<string>(
    options[0].name
  );
  const [price, setPrice] = useState<number>(options[0].price);
  const router = useRouter();

  const handlePackageChange = (newPackage: string, newPrice: number) => {
    setSelectedPackage(newPackage);
    setPrice(newPrice);
  };

  return (
    <div className="container mx-auto p-4 h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4 grid-rows-2">
        <div className="w-full h-full row-span-2">
          <ImageCarousel />
        </div>
        <div className="px-4 row-span-2 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold mb-4">험프리네 샤인머스켓 </h1>
          <p className="text-gray-600 mb-4">
            <i>
              “2023 추석 후회 없는 선택”<br></br>
            </i>
            경북 김천에서 나고 자란 험프리가 추천하는 험프리네 샤인머스캣🍇
          </p>
          <div className="flex items-center mb-4">
            <span className="text-xl font-bold text-gray-800 mr-2">
              ₩{price.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm">({selectedPackage})</span>
          </div>
          <div className="mb-4">
            <select
              className="border rounded-md py-2 px-3 w-full"
              onChange={(e) => {
                const selectedOption = e.target.value;
                for (const option of options) {
                  if (selectedOption == option.name) {
                    handlePackageChange(option.name, option.price);
                  }
                }
              }}
            >
              {options.map((option, key) => (
                <option key={key}>{option.name}</option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none w-full"
            onClick={() => router.push("/order")}
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
