import Image from "next/image";
import Link from "next/link";

function Discount() {
  return (
    <div className="w-full py-10 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-xl mx-auto">
        {/* Heading */}
        <h2 className="text-[#3F509E] text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
          Discount Item
        </h2>

        {/* Tag Buttons */}
        <div className="flex justify-center space-x-4 sm:space-x-8 mb-8 md:mb-12 overflow-x-auto">
          {["Wood Chair", "Plastic Chair", "Sofa Chair"].map((tag) => (
            <button
              key={tag}
              className="relative text-sm sm:text-base md:text-lg font-medium text-gray-700 hover:text-pink-600 whitespace-nowrap"
            >
              {tag}
              <span className="block h-[2px] w-0 bg-pink-600 absolute bottom-0 left-0 transition-all duration-300 hover:w-full"></span>
              <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-pink-600 rounded-full opacity-0 hover:opacity-100"></span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Text Section */}
          <div className="text-center md:text-left">
            <h3 className="text-[#3F509E] text-xl sm:text-2xl md:text-3xl font-bold mb-4">
              20% Discount Of All Products
            </h3>
            <h4 className="text-pink-600 text-lg sm:text-xl font-semibold mb-4 md:mb-6">
              Eames Sofa Compact
            </h4>
            <p className="text-gray-600 text-sm sm:text-base mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="text-gray-600 text-sm sm:text-base mb-4 md:mb-6">
              Eu eget feugiat habitasse nec, bibendum condimentum.
            </p>
            {/* Tick Marks with Features */}
            <ul className="space-y-2 md:space-y-4">
              {[
                "Material expose like metals.",
                "Clear lines and geometric figures.",
                "Simple neutral colours.",
                "Material expose like metals.",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-2 md:space-x-4">
                  {/* Tick Mark */}
                  <span className="w-4 h-4 md:w-5 md:h-5 flex justify-center items-center border border-gray-600 rounded-full text-gray-600 text-xs md:text-sm">
                    ✓
                  </span>
                  {/* Feature Text */}
                  <span className="text-gray-600 text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>
            {/* Shop Now Button */}
            <Link href="/shoplist">
              <button className="px-4 py-2 sm:px-6 sm:py-2 bg-[#FB2E86] text-white text-sm sm:text-base font-medium rounded-md shadow-md hover:bg-pink-600 mt-6">
                Shop Now
              </button>
            </Link>
          </div>

          {/* Right Side - Image Section */}
          <div className="relative flex justify-center mt-8 md:mt-0">
            <div
              className="absolute inset-0 bg-pink-100 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] -z-10 rounded-full"
              style={{ margin: "auto" }}
            ></div>
            <Image
              src="/images/sofa3.png"
              alt="Discount Sofa"
              width={300} // Smaller size for mobile
              height={300} // Smaller size for mobile
              className="object-contain w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discount;