"use client";

import { client } from "../../../sanity/lib/client";
import { Product } from "../../../../types";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "../../../components/contextApi";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, addToWishlist } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && _id == $id][0]{
          _id,
          name,
          "image": image.asset->url,
          price,
          description,
          discountPercentage,
          category
        }`;
        const product: Product = await client.fetch(query, { id });
        if (product) {
          setProduct(product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err); // Log the error
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id,
        name: product.name,
        description: product.description || "",
        price: parseFloat(product.price),
        quantity: 1,
        imageUrl: product.image,
      });
      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Handle Add to Wishlist
  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist({
        id: product._id,
        name: product.name,
        description: product.description || "",
        price: parseFloat(product.price),
        quantity: 1,
        imageUrl: product.image,
      });
      toast.success(`${product.name} added to wishlist!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-2xl text-red-600 py-20">{error}</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-2xl text-red-600 py-20">
        Product not found
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto p-6">
          {/* Product Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="relative bg-gray-100 rounded-lg p-6 flex justify-center items-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-contain w-full h-auto transform transition-transform duration-300 hover:scale-105"
                />
                {/* Discount Badge */}
                {product.discountPercentage && (
                  <div className="absolute top-4 right-4 bg-[#3F509E] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {product.discountPercentage}% OFF
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-[#3F509E]">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-[#3F509E]">
                    ${product.price}
                  </p>
                  {product.discountPercentage && (
                    <p className="text-gray-500 line-through text-xl">
                      $
                      {(
                        parseFloat(product.price) /
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Category */}
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Category:</span>{" "}
                  {product.category}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#08D15F] hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg"
                >
                  Add to Cart
                </button>

                {/* Add to Wishlist Button */}
                <button
                  onClick={handleAddToWishlist}
                  className="w-full bg-gray-200 text-[#3F509E] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors shadow-lg"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}