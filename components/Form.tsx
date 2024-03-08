"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { SiMercadopago } from "react-icons/si";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn, updateLocalStorage } from "@/lib/utils";
import { payment } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import { Item, ItemData } from "@/types";
import { useCartStore } from "@/app/store/cartStore";

export default function Form({ item, role, params }: any) {
  const paymentWithId = payment.bind(null, item);
  const supabase = createClient();
  const [size, setsize] = useState("");
  const addToCart = useCartStore((state: any) => state.addToCart); // Access Zustand store

  function handleSize(e: any) {
    e.preventDefault();
    const size = e.target.value;
    setsize(size);
  }
  function handleCart(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    // Parsear la cadena JSON para obtener un array (o un array vacío si es nulo)
    const newItem: any = {
      id: item.id,
      title: item.title,
      size: size,
      quantity: 1,
      price: item.price,
      images: item.images,
    };
    addToCart(newItem); // Add item to Zustand store
  }


  return (
    <form action={paymentWithId} className="max-w-3xl mx-auto ml-4">
      <div className="flex items-center justify-center gap-1">
        <Image
          src={item?.images}
          width={400}
          height={400}
          quality={80}
          alt={item?.title}
          className="rounded-lg shadow-md object-fit  mx-auto mb-4"
        />
      </div>
      <p className="text-xl font-semibold mb-2">{item?.title}</p>
      <p className="text-xl font-semibold mb-2">${item?.price}</p>

      <p className=" text-sm mb-2 font-bold text-sky-600 uppercase">
        {item?.type} - {item?.gender}
      </p>
      <p className=" text-sm mb-4">{item?.description}</p>
      <div className="flex flex-col gap-2">
        <select
          name="size"
          className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
          onChange={handleSize}
        >
          <option value="">Selecciona un talle</option>
          {item?.sizes ? (
            item?.sizes.split(",").map((size: string, index: number) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No hay tallas disponibles
            </option>
          )}
        </select>
        <Button
          onClick={handleCart}
          type="button"
          // siguiente hacer que el action de este button guarde la informacion al carrito en ls
          className="hover:underline"
          disabled={role !== "authenticated"}
        >
          {role !== "authenticated"
            ? "Tienes que estar logeado"
            : "Agregar al carrito"}
        </Button>
        <Button
          type="submit"
          className="hover:underline bg-sky-400 flex gap-1 font-bold"
          disabled={role !== "authenticated"}
        >
          <div className="flex items-center justify-center gap-2">
            <AiOutlineLoading3Quarters className={cn("animate-spin")} />
            Comprar Con Mercado pago Ahora{" "}
          </div>

          <SiMercadopago className="mr-4  font-bold" size={30} />
        </Button>
      </div>
    </form>
  );
}
