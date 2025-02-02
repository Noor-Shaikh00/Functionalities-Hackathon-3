'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/header';
import Footer from '../../components/footer';

function OrderCompleted() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8 space-y-6 text-center">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1D3178]">Order Completed</h1>

          {/* Tick Mark Image */}
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#EDEFFB] rounded-full flex justify-center items-center">
              <Image
                src="/images/icon5.png"
                alt="Order Completed Icon"
                width={48} // Smaller size for mobile
                height={48} // Smaller size for mobile
                className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
              />
            </div>
          </div>

          {/* Order Complete Text */}
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D3178]">Your order is completed!</h2>

          {/* Description */}
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">
            Thank you for your order! Your order is being processed and will be completed within 3-6 hours.
            You will receive an email confirmation when your order is completed.
          </p>

          {/* Continue Shopping Button */}
          <Link href="/shoplist">
            <button className="bg-[#FB2E86] text-white px-4 py-2 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base md:text-lg font-medium mt-4">
              Continue Shopping
            </button>
          </Link>

            {/* Continue Shopping Button */}
            <Link href="/generate-tracking">
            <button className="bg-[#FB2E86] text-white px-4 py-2 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base md:text-lg font-medium mt-4">
              Generate Tracking Number
            </button>
          </Link>

          {/* Clock Icon */}
          <div className="flex justify-center items-center mt-4">
            <Image
              src="/images/icon6.png" // Path to your clock image
              alt="Clock Icon"
              width={60} // Smaller size for mobile
              height={60} // Smaller size for mobile
              className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderCompleted;