'use client';

import React, { useState } from 'react';

 export const categories = [
  {
    href: '/store/Smartphones',
    src: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/9722720_1/w=1500,h=1500,fit=pad',
    alt: 'Smartphones',
    title: 'Smartphones',
  },
  {
    href: '/store/Laptops',
    src: 'https://www.apple.com/newsroom/images/product/mac/standard/MacBook-Air-family-10302018_inline.jpg.large.jpg',
    alt: 'Laptops',
    title: 'Laptops',
  },
  {
    href: '/store/Tablets',
    src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipadair11-digitalmat-gallery-1-202404?wid=728&hei=666&fmt=jpeg&qlt=90&.v=1713308648429',
    alt: 'Tablets',
    title: 'Tablets',
  },
  {
    href: '/store/Headphones',
    src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671363',
    alt: 'Headphones',
    title: 'Headphones',
  },
  {
    href: '/store/Cameras',
    src: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6373/6373129_sd.jpg;maxHeight=640;maxWidth=550;format=webp',
    alt: 'Cameras',
    title: 'Cameras',
  },
  {
    href: '/store/Printers',
    src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/HKUF2?wid=890&hei=890&fmt=jpeg&qlt=95&.v=1482277715284',
    alt: 'Printers',
    title: 'Printers',
  },
  {
    href: '/store/Monitors',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUdipeYpft23Zzt9tUJImVBcFeGlhnSs3Rgg&s',
    alt: 'Monitors',
    title: 'Monitors',
  },
  {
    href: '/store/Storage',
    src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/HPSU2?wid=890&hei=890&fmt=jpeg&qlt=95&.v=1636065276000',
    alt: 'Storage',
    title: 'Storage',
  },
  {
    href: '/store/Accessories',
    src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX2D3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1713841707336',
    alt: 'Accessories',
    title: 'Accessories',
  },
];

const Category = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const handleScrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, categories.length - itemsPerPage));
  };

  return (
    <div className="relative">
      <h2 className="flex justify-center font-medium m-6">Categories:</h2>
      <div className="flex items-center">
        <button
          onClick={handleScrollLeft}
          className="flex items-center justify-center w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full"
          aria-label="Scroll left"
        >
          <div className="border-l-4 border-t-4 border-transparent border-l-black border-t-transparent w-0 h-0 transform rotate-135" />
        </button>
        <div className="overflow-hidden w-full">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
            {categories.map((category, index) => (
              <div key={index} className="flex-none w-1/8 mx-1 flex flex-col items-center">
                <a href={category.href}>
                  <img className="h-24 max-w-full rounded-lg" src={category.src} alt={category.alt} />
                  <h5 className="flex justify-center mt-1 text-sm">{category.title}</h5>
                </a>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleScrollRight}
          className="flex items-center justify-center w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full"
          aria-label="Scroll right"
        >
          <div className="border-r-4 border-b-4 border-transparent border-r-black border-b-transparent w-0 h-0 transform rotate-45" />
        </button>
      </div>
    </div>
  );
};

export default Category;
