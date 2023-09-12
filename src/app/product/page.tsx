"use client"
// pages/ProductDetail.tsx

import React, { useState } from 'react';
import ImageCarousel from './components/ImageCarousel';

const ProductDetail: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('Option A');
  const [price, setPrice] = useState<number>(99.99);

  const handlePackageChange = (newPackage: string, newPrice: number) => {
    setSelectedPackage(newPackage);
    setPrice(newPrice);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="max-w-lg mx-auto">
          <ImageCarousel />
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-4">Product Name</h1>
          <p className="text-gray-600 mb-4">Product Description Lorem ipsum dolor sit amet...</p>
          <div className="flex items-center mb-4">
            <span className="text-xl font-bold text-gray-800 mr-2">${price.toFixed(2)}</span>
            <span className="text-gray-500 text-sm">(${selectedPackage})</span>
          </div>
          <div className="mb-4">
            <select
              className="border rounded-md py-2 px-3"
              onChange={(e) => {
                const selectedOption = e.target.value;
                if (selectedOption === 'Option A') {
                  handlePackageChange('Option A', 99.99);
                } else if (selectedOption === 'Option B') {
                  handlePackageChange('Option B', 129.99);
                } else if (selectedOption === 'Option C') {
                  handlePackageChange('Option C', 149.99);
                }
              }}
            >
              <option value="Option A">Option A</option>
              <option value="Option B">Option B</option>
              <option value="Option C">Option C</option>
            </select>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
