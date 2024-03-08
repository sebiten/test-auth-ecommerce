"use client";
import { Item } from "@/types";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "@/components/Spinner";
import Link from "next/link"; // Import Link from Next.js
import Image from "next/image";
import { Button } from "@/components/ui/button";
import emptyCart from "@/app/public/emptyCart.png";
import { cartpayment } from "../actions";

export default function Page() {
  const cartItems = useCartStore((state: any) => state.cartItems);
  const setCartItems = useCartStore((state: any) => state.setCartItems);
  const paymentcart = cartpayment.bind(null, cartItems);
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce(
    (accumulator: any, currentItem: any) => accumulator + currentItem.price,
    0
  );
  const handleDeleteItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart); // Update local storage
  };

  const updateLocalStorage = (updatedCart: Item[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  return (
    <div className="block lg:flex w-full">
      {cartItems.length > 0 ? (
        <div className="w-full lg:w-7/12 mt-4 mx-auto">
          {cartItems.map((item: Item, index: number) => (
            <div
              key={item.id}
              className="p-4 max-w-6xl mx-auto border flex items-center justify-between w-full rounded shadow-md mb-4"
            >
              <div className="flex items-center justify-between mb-4">
                <Image
                  width={400}
                  height={400}
                  className="w-24 h-24 object-cover mr-4"
                  src={item.images!}
                  alt={item.title}
                />
                <div className="flex justify-between flex-col">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <h2 className="text-xl font-bold">{item.size}</h2>
                </div>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="bg-red-500 text-white p-2 ml-2"
                >
                  Eliminar
                </button>
                <p className="font-bold text-xl">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 mx-auto text-center">
          <Image
            src={emptyCart}
            alt="no items in cart"
            height={300}
            width={300}
          />
          <p className="text-2xl font-bold">
            Ops, parece que no hay nada por aquí.
          </p>
        </div>
      )}
      <form className="lg:fixed top-30 w-full lg:w-1/5 right-0 mt-4 mx-auto p-8 border rounded">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <p className="text-lg">Items: {totalItems}</p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg">Subtotal:</p>
          <p className="font-bold text-xl">${totalPrice}</p>
        </div>
        <Button
          formAction={paymentcart}
          className="p-3 rounded hover:bg-gray-300 transition-all duration-300"
        >
          Pagar
        </Button>
      </form>
    </div>
  );
}
