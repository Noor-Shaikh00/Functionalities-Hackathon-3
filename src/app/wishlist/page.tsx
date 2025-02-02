"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "@/components/contextApi";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useCart();

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold text-[#3F509E] mb-8 text-center">
            Your Wishlist
          </h1>
          {wishlist.length === 0 ? (
            <div className="text-center text-2xl text-gray-600 mt-32 flex justify-center items-center">
              Your wishlist is empty.{" "}
              <Link
                href="/shoplist"
                className="text-[#FB2E86] hover:underline"
              >
                Start shopping!
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="transform transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[#3F509E] mb-2">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 text-lg font-semibold">
                      ${item.price}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <Link
                        href={`/product/${item.id}`}
                        className="text-[#3F509E] hover:underline"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => {
                          removeFromWishlist(item.id);
                          toast.success(`${item.name} removed from wishlist!`);
                        }}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}