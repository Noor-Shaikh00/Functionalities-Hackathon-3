'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { client } from '../sanity/lib/client'; 
import { Product } from '../../types'; 
import Link from 'next/link';

function TopCategories() {
  const [categories, setCategories] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "product" && category == "Chair"]{
        _id,
        name,
        "image": image.asset->url,
        price,
        description,
        discountPercentage,
        stockLevel,
        category
      }[9...13]`;
      const categories: Product[] = await client.fetch(query);
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-white py-10 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h2 className="text-center text-[#3F509E] text-2xl sm:text-3xl font-bold mb-8 md:mb-12">
        Top Categories
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 max-w-screen-xl mx-auto">
        {categories.map((category) => (
          <Link href={`/product/${category._id}`} key={category._id}>
            <div className="relative group flex flex-col items-center cursor-pointer">
              {/* Circle Image with Hover Effect */}
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] flex justify-center items-center bg-gray-200 rounded-full relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={80} 
                  height={80}
                  className="object-cover w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]"
                />

                {/* Hover Blue Circle Outline */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-[#3F509E] transition-all duration-300"></div>

                {/* Hover View Shop Button */}
                <button
                  className="absolute bottom-2 bg-[#08D15F] text-white px-2 py-1 text-xs sm:text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => e.preventDefault()} 
                >
                  View Shop
                </button>
              </div>

              {/* Category Name and Price */}
              <h3 className="text-[#3F509E] font-bold text-sm sm:text-base mt-4 text-center">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">{category.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pink Dots */}
      <div className="flex justify-center mt-4">
        <span className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-600 rounded-full mx-1"></span>
        <span className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-600 rounded-full mx-1"></span>
        <span className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-600 rounded-full mx-1"></span>
      </div>
    </div>
  );
}

export default TopCategories;