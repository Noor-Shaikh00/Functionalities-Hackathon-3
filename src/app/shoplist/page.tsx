"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { client } from "../../sanity/lib/client";
import { Product } from "../../../types";

const ShopList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("bestMatch");
  const [ratingFilter] = useState<number>(0);

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
        oldPrice,
        rating,
        colors
      }[12...24]`;
      const products: Product[] = await client.fetch(query);
      setProducts(products);
      setFilteredProducts(products); // Initialize filtered products
    };

    fetchProducts();
  }, []);

  // Apply filters whenever sortBy, categoryFilter, or ratingFilter changes
  useEffect(() => {
    let filtered = [...products];

    // Filter by rating
    if (ratingFilter > 0) {
      filtered = filtered.filter(
        (product) => (product.rating || 0) >= ratingFilter
      );
    }

    // Sort by price
    if (sortBy === "priceLowHigh") {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "priceHighLow") {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setFilteredProducts(filtered);
  }, [sortBy, ratingFilter, products]); // Added ratingFilter to dependency array

  return (
    <>
      <Header />
      <div className="font-sans text-[#151875]">
        {/* Header Section */}
        <div className="py-20 px-8 bg-[#F6F5FF]">
          <h1 className="text-4xl font-bold mb-2">Shop List</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#FB2E86] transition-colors">
              Home
            </Link>
            <span>/</span>
            <p>Pages</p>
            <span>/</span>
            <p className="text-[#FB2E86]">Shopping List</p>
          </div>
        </div>

        {/* Filter and Sorting Section */}
        <div className="py-8 px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold font-[Josefin Sans] mb-2">
                Ecommerce Accessories & Fashion Items
              </h1>
              <p className="text-sm text-gray-500">
                About {filteredProducts.length} results (0.62 seconds)
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Per Page */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="perPage"
                  className="text-sm font-medium text-gray-700"
                >
                  Per Page:
                </label>
                <input
                  type="text"
                  id="perPage"
                  className="w-16 p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#FB2E86]"
                />
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sortBy"
                  className="text-sm font-medium text-gray-700"
                >
                  Sort By:
                </label>
                <select
                  id="sortBy"
                  className="p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#FB2E86]"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="bestMatch">Best Match</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="p-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link href={`/product/${product._id}`} key={product._id}>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  {/* Product Image */}
                  <div className="relative h-80 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>

                    {/* Price and Old Price */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-[#FB2E86]">
                        ${product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className={`${
                            index < (product.rating || 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          } text-lg`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <AiOutlineHeart size={20} className="text-gray-600" />
                      </button>
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <AiOutlineShoppingCart size={20} className="text-gray-600" />
                      </button>
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <AiOutlineEye size={20} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopList;