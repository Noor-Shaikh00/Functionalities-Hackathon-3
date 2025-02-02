'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { client } from '../sanity/lib/client'; 
import { Product } from '../../types'; 
import Link from 'next/link';

function TrendingProducts() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [exclusiveProducts, setExclusiveProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch trending products
      const trendingQuery = `*[_type == "product" && isTrending == true]{
        _id,
        name,
        "image": image.asset->url,
        price,
        description,
        discountPercentage,
        stockLevel,
        category
      }[0...3]`;
      const trendingProducts: Product[] = await client.fetch(trendingQuery);
      setTrendingProducts(trendingProducts);

      // Fetch exclusive products
      const exclusiveQuery = `*[_type == "product" && category == "Chair"]{
        _id,
        name,
        "image": image.asset->url,
        price,
        description,
        discountPercentage,
        stockLevel,
        category
      }[0...3]`;
      const exclusiveProducts: Product[] = await client.fetch(exclusiveQuery);
      setExclusiveProducts(exclusiveProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white py-10 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <h2 className="text-[#3F509E] text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-16">
        Trending Products
      </h2>

      {/* Product Grid */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-12 md:mb-20">
        {trendingProducts.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id}>
            <div className="group relative cursor-pointer">
              {/* Image with Gray Background */}
              <div className="bg-gray-200 flex justify-center items-center p-4 sm:p-6 h-[200px] sm:h-[280px] relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150} // Smaller size for mobile
                  height={150} // Smaller size for mobile
                  className="object-contain w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] transition-all duration-300 group-hover:opacity-90"
                />
              </div>

              {/* Product Details */}
              <div className="mt-4 text-center">
                <h3 className="text-[#3F509E] font-semibold text-base sm:text-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-[#3F509E] font-bold inline-block">${product.price}</p>
                {product.discountPercentage && (
                  <span className="text-gray-500 line-through ml-2">
                    ${(parseFloat(product.price) / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Vouchers and Product List Section */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Voucher 1 */}
        <div className="bg-pink-100 p-6 sm:p-8 flex flex-col justify-between relative h-[150px] sm:h-[200px]">
          <h3 className="text-[#3F509E] text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
            23% Off in all products
          </h3>
          <button className="text-pink-600 underline text-base sm:text-lg font-medium">
            Shop Now
          </button>
          <Image
            src="/images/voucher1.png"
            alt="Voucher Image"
            width={150} // Smaller size for mobile
            height={150} // Smaller size for mobile
            className="absolute bottom-2 right-0 object-contain w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]"
          />
        </div>

        {/* Voucher 2 */}
        <div className="bg-pink-100 p-6 sm:p-8 flex flex-col justify-between relative h-[150px] sm:h-[200px]">
          <h3 className="text-[#3F509E] text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
            23% Off in all products
          </h3>
          <button className="text-pink-600 underline text-base sm:text-lg font-medium">
            View Collection
          </button>
          <Image
            src="/images/voucher2.png"
            alt="Voucher Image"
            width={150} // Smaller size for mobile
            height={150} // Smaller size for mobile
            className="absolute bottom-2 right-2 object-contain w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]"
          />
        </div>

        {/* Exclusive Product List */}
        <div className="flex flex-col space-y-4">
          {exclusiveProducts.map((product) => (
            <Link href={`/product/${product._id}`} key={product._id}>
              <div className="bg-gray-200 flex items-center p-3 sm:p-4 h-[80px] sm:h-[100px] rounded shadow cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={60} // Smaller size for mobile
                  height={60} // Smaller size for mobile
                  className="object-contain w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] mr-3 sm:mr-4"
                />
                <div>
                  <h3 className="text-[#3F509E] font-semibold text-sm sm:text-base mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[#3F509E] font-bold inline-block text-sm sm:text-base">
                    ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingProducts;