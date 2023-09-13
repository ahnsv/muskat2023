"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./override.css";
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
    // adaptiveHeight: true,
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
    <div className="w-full h-full bg-gray-200 rounded-lg">
      <Slider {...settings} className="h-full">
        {products.map((product, idx) => (
          <div key={`product${idx + 1}`}>
            <div
              className="slider-item w-full h-full bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${product.src})`,
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
