'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { HeartIcon, ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { client } from '../sanity/lib/client'; 
import { Product } from '../../types'; 
import Link from 'next/link';

function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product" && isFeaturedProduct == true]{
        _id,
        name,
        "image": image.asset->url,
        price,
        description,
        discountPercentage,
        stockLevel,
        category,
        code
      }[0...4]`;
      const products: Product[] = await client.fetch(query);
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white py-10 md:py-20">
      {/* Heading */}
      <h2 className="text-black text-2xl sm:text-3xl md:text-4xl text-center mb-8 md:mb-16 font-bold">
        Featured Products
      </h2>

      {/* Product Grid */}
      <div className="w-full max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id}>
            <div className="relative group cursor-pointer">
              {/* Product Image with Icons */}
              <div className="w-full bg-gray-200 flex justify-center items-center relative overflow-hidden h-[250px] sm:h-[300px] md:h-[400px]">
                {/* Product Image */}
                <Image
                  src={product.image}
                  width={200}
                  height={250}
                  alt={product.name}
                  className="object-cover w-[150px] h-[200px] sm:w-[200px] sm:h-[250px] transition-all duration-300 group-hover:scale-105"
                />

                {/* Icons */}
                <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Wishlist Icon */}
                  <button
                    className="bg-white p-1 sm:p-2 rounded-full"
                    onClick={(e) => e.preventDefault()} 
                  >
                    <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                  </button>
                  {/* Magnifying Glass Icon */}
                  <button
                    className="bg-white p-1 sm:p-2 rounded-full"
                    onClick={(e) => e.preventDefault()} 
                  >
                    <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                  </button>
                  {/* Cart Icon */}
                  <button
                    className="bg-white p-1 sm:p-2 rounded-full"
                    onClick={(e) => e.preventDefault()} 
                  >
                    <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <div className="absolute bottom-0 w-full text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="w-full py-2 text-sm bg-[#08D15F] rounded-none hover:bg-green-700 transition-colors"
                    onClick={(e) => e.preventDefault()} 
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold text-red-500">{product.name}</h3>
                <div className="flex justify-center items-center gap-1 mt-1">
                  <span className="text-[#05E6B7] text-4xl">-</span>
                  <span className="text-[#F701A8] text-4xl">-</span>
                  <span className="text-[#00009D] text-4xl">-</span>
                </div>
                <p className="mt-1 text-dark-blue-900">{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;