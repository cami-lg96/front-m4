'use client';

import { useEffect, useState } from 'react';
import { IProduct } from '@/interface/productInterface';
import { getProductsByCategoryId } from '@/helpers/product.helper';
import { useRouter } from 'next/navigation';

interface SimilarProductsProps {
  categoryId: number;
  currentProductId: number;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ categoryId, currentProductId }) => {
  const [similarProducts, setSimilarProducts] = useState<IProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; 
  const router = useRouter();

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const products = await getProductsByCategoryId(categoryId); 
        const filteredProducts = products.filter(product => product.id !== currentProductId); 
        setSimilarProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching similar products:', error);
      }
    };
    fetchSimilarProducts();
  }, [categoryId, currentProductId]);

  const handleScrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, similarProducts.length - itemsPerPage));
  };

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="relative m-8">
      <h3 className="flex justify-center font-medium m-6 text-lg">Similar Products</h3>
      <div className="flex items-center">
        <button
          onClick={handleScrollLeft}
          className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full"
          aria-label="Scroll left"
        >
          <div className="border-l-4 border-t-4 border-transparent border-l-black w-0 h-0 transform rotate-135" />
        </button>
        <div className="overflow-hidden w-full">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
            {similarProducts.map((product) => (
              <div key={product.id} className="flex-none w-1/4 mx-2 flex flex-col items-center bg-slate-50 rounded-2xl p-2">
                <img
                  className="h-32 w-32 object-cover rounded-md cursor-pointer"
                  src={product.image}
                  alt={product.name}
                  onClick={() => handleProductClick(product.id)}
                />
                <h5 className="text-sm font-semibold mt-2">{product.name}</h5>
                <p className="text-gray-700">Price: ${product.price}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleScrollRight}
          className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full"
          aria-label="Scroll right"
        >
          <div className="border-r-4 border-b-4 border-transparent border-r-black w-0 h-0 transform rotate-45" />
        </button>
      </div>
    </div>
  );
};

export default SimilarProducts;
