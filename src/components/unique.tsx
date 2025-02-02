"use client";
import Link from "next/link";
import Image from "next/image";

function Unique() {
  return (
    <div className="w-full bg-gray-100 py-10 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Side */}
        <div className="relative flex justify-center items-center">
          {/* Pink Background */}
          <div className="absolute inset-0 flex justify-center items-center">
            <Image
              src={"/pink.png"}
              alt="Background"
              layout="fill"
              className="object-cover"
            />
          </div>

          {/* Sofa Image */}
          <Image
            src="/images/sofa2.png"
            alt="Sofa"
            width={300} // Smaller size for mobile
            height={300} // Smaller size for mobile
            className="relative z-10 object-contain w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]"
          />
        </div>

        {/* Right Side */}
        <div className="px-4 md:px-0 text-center md:text-left">
          {/* Heading */}
          <h2 className="text-[#3F509E] text-2xl sm:text-3xl font-bold mb-4 md:mb-6">
            Unique Features Of Latest & Trending Products
          </h2>

          {/* Points */}
          <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            {/* Point 1 */}
            <li className="flex items-start">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex-shrink-0 mt-1 mr-3 sm:mr-4"></div>
              <p className="text-gray-600 text-sm sm:text-base">
                All frames constructed with hardwood solids and laminates.
              </p>
            </li>

            {/* Point 2 */}
            <li className="flex items-start">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#3F509E] flex-shrink-0 mt-1 mr-3 sm:mr-4"></div>
              <p className="text-gray-600 text-sm sm:text-base">
                Reinforced with double wood dowels, glue, screw-nails, corner
                blocks, and machine nails.
              </p>
            </li>

            {/* Point 3 */}
            <li className="flex items-start">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 flex-shrink-0 mt-1 mr-3 sm:mr-4"></div>
              <p className="text-gray-600 text-sm sm:text-base">
                Arms, backs, and seats are structurally reinforced.
              </p>
            </li>
          </ul>

          {/* Add to Cart Button and Price */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            {/* Add to Cart Button */}
            <Link href="/cart">
              <button className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors text-sm sm:text-base">
                Add To Cart
              </button>
            </Link>

            {/* Additional Text */}
            <div>
              <p className="text-[#3F509E] font-semibold text-sm sm:text-base">
                B&B Italian Sofa
              </p>
              <p className="text-[#3F509E] font-bold text-sm sm:text-base">
                $32.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unique;
