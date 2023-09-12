"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import product1 from "~/public/assets/product/product-1.jpeg";
import product10 from "~/public/assets/product/product-10.jpeg";
import product2 from "~/public/assets/product/product-2.jpeg";
import product3 from "~/public/assets/product/product-3.jpeg";
import product4 from "~/public/assets/product/product-4.jpeg";
import product5 from "~/public/assets/product/product-5.jpeg";
import product6 from "~/public/assets/product/product-6.jpeg";
import product7 from "~/public/assets/product/product-7.jpeg";
import product8 from "~/public/assets/product/product-8.jpeg";
import product9 from "~/public/assets/product/product-9.jpeg";

const ImageCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const products = [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10,
  ];
  return (
    <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md">
      {/* Implement your image carousel logic here */}
      {/* You can use a library like react-slick or build a custom carousel */}
      <Slider {...settings}>
        {products.map((product, idx) => (
          <div
            className="slider-item w-48 h-full"
            key={`product${idx + 1}`}
            style={{
              backgroundImage: `url(${product.src})`,
            }}
          ></div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
