'use client';

import React, { useState } from "react";
import Image from "next/image";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useCart } from "../../components/contextApi";
import Link from "next/link";


const Cart = () => {
  const { cartItems, removeFromCart, clearCart, decreaseQuantity } = useCart();
  const [isLoading] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      decreaseQuantity(id);
    } else {
      removeFromCart(id);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <Header />
      <div className="p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-[#1D3178]">Your Cart</h2>
          {cartItems.length > 0 ? (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#1D3178]">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <p className="text-[#1D3178]">${item.price.toFixed(2)}</p>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="w-12 px-2 py-1 border rounded-md text-center"
                      min="1"
                    />
                    <p className="font-bold text-[#1D3178]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#1D3178] text-center mt-6">
              Your cart is empty. Add some products!
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-[#FB2E86] text-white rounded-md text-sm hover:bg-pink-600"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Cart Totals */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-[#1D3178]">Cart Totals</h2>
          <p className="flex justify-between text-[#1D3178]">
            <span>Subtotal:</span> <span>${calculateTotal().toFixed(2)}</span>
          </p>
          <p className="flex justify-between mb-4 text-[#1D3178]">
            <span>Shipping:</span> <span>$15.00</span>
          </p>
          <p className="flex justify-between font-bold text-lg text-[#1D3178]">
            <span>Total:</span>{" "}
            <span>${(calculateTotal() + 15).toFixed(2)}</span>
          </p>
          <Link href={"/checkout"}>
          <button
            disabled={isLoading || cartItems.length === 0}
            className="w-full py-3 bg-[#FB2E86] text-white rounded-md font-semibold hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Proceed To Checkout"}
          </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;