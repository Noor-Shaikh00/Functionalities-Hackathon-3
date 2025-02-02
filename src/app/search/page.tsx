"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import {
  FaSpinner,
  FaRegFrown,
  FaRegMeh,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "../../components/header";
import Footer from "../../components/footer";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  slug: {
    current: string;
  };
}

const SearchResultsPage = () => {
  const [productResults, setProductResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get the search query from the URL
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("q");
    if (query) {
      fetchSearchResults(query);
    }
  }, []);

  // Fetch search results from Sanity
  const fetchSearchResults = async (query: string) => {
    setIsLoading(true);
    try {
      // Fetch product results
      const productData: Product[] = await client.fetch(
        `*[_type == "product" && name match $searchQuery] {
          _id,
          name,
          "image": image.asset->url,
          price,
        }`,
        { searchQuery: `*${query}*` }
      );

      setProductResults(productData);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-[#FAFAFA] min-h-screen">
        <div className="container mx-auto p-6">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center h-64"
            >
              <FaSpinner className="animate-spin text-4xl text-[#FB2E86]" />
            </motion.div>
          ) : productResults.length > 0 ? (
            <div>
              {/* Display product Results */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {productResults.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/product/${product._id}`}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 block"
                      >
                        <div className="p-4">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-72 object-cover rounded-lg"
                          />
                          <h2 className="text-xl font-semibold mt-4 text-gray-800">
                            {product.name}
                          </h2>
                          <p className="text-lg font-medium text-[#FB2E86] mt-2">
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-gray-600 text-xl flex flex-col items-center justify-center gap-4 py-12"
            >
              <div className="icon-container flex gap-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaRegFrown className="text-4xl text-blue-500" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <FaRegMeh className="text-4xl text-yellow-500" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <FaRegQuestionCircle className="text-4xl text-red-500" />
                </motion.div>
              </div>
              <p>No products found.</p>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;