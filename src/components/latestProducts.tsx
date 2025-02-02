'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { HeartIcon, ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { client } from '../sanity/lib/client';
import { Product } from '../../types'; 
import Link from 'next/link';

function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{
        _id,
        name,
        "image": image.asset->url,
        price,
        description,
        discountPercentage,
        stockLevel,
        category,
        isOnSale
      }[4...7]`;
      const products: Product[] = await client.fetch(query);
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white py-10 md:py-20">
      {/* Heading */}
      <h2 className="text-[#3F509E] text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-6 md:mb-8">
        Latest Products
      </h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 sm:space-x-8 mb-8 md:mb-16 overflow-x-auto px-4">
        {['New Arrival', 'Best Seller', 'Featured', 'Special Offers'].map((tab) => (
          <button
            key={tab}
            className="text-[#3F509E] text-sm sm:text-lg font-medium relative group hover:text-red-600 whitespace-nowrap"
          >
            {tab}
            {/* Underline */}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="w-full max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {products.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id}>
            <div className="relative group cursor-pointer">
              {/* Product Image */}
              <div className="w-full bg-gray-200 flex justify-center items-center relative overflow-hidden h-[200px] sm:h-[250px] md:h-[300px] transition-all duration-300 group-hover:bg-white">
                {/* Sale Tag */}
                {product.isOnSale && (
                  <span className="absolute top-2 left-2 bg-[#3F509E] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded">
                    Sale
                  </span>
                )}
                <Image
                  src={product.image}
                  width={200}
                  height={200}
                  alt={product.name}
                  className="object-contain w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
                />

                {/* Icons */}
                <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-white p-1 sm:p-2 rounded-full shadow"
                    onClick={(e) => e.preventDefault()} 
                  >
                    <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#3F509E]" />
                  </button>
                  <button
                    className="bg-white p-1 sm:p-2 rounded-full shadow"
                    onClick={(e) => e.preventDefault()} 
                  >
                    <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#3F509E]" />
                  </button>
                  <button
                    className="bg-white p-1 sm:p-2 rounded-full shadow"
                    onClick={(e) => e.preventDefault()} 
                  >
                    <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#3F509E]" />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold text-[#3F509E]">{product.name}</h3>
                <div className="mt-2 text-gray-600 flex justify-center items-center gap-2">
                  {product.discountPercentage && (
                    <span className="text-red-600 font-medium line-through">
                      ${(parseFloat(product.price) / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                  )}
                  <span className="text-gray-800">${product.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LatestProducts;