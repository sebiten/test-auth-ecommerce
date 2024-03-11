"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { SiMercadopago } from "react-icons/si";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { onsubMitRating, payment } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import { useCartStore } from "@/app/store/cartStore";
import { IoMdMail } from "react-icons/io";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { heroUrl } from "@/app/constantes/constantes";
import { Item } from "@/types";

interface FormProps {
  data: Item[]; // Asegúrate de ajustar este tipo según la estructura real de tus datos
  role: string; // O el tipo de role que estás utilizando
  params: string | number; // Ajusta este tipo según la estructura real de tus parámetros
  email: string; // O el tipo que estás utilizando para el correo electrónico
}

export default function Form({ data, role, params, email }: FormProps) {
  const [size, setsize] = useState<string>("");
  const addToCart = useCartStore((state) => state.addToCart); // Access Zustand store
  const paymentWithId = payment.bind(null, data);
  const [item] = data;

  function handleSize(e: React.ChangeEvent<HTMLSelectElement>) {
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
      description: item.description,
      size: size,
      quantity: 1,
      price: item.price,
      images: item.images,
    };
    addToCart(newItem); // Add item to Zustand store
  }

  return (
    <section className="px-6">
      <form
        action={paymentWithId}
        className="w-full xl:max-w-7xl xl:flex gap-20  block mx-auto"
      >
        <div className="flex items-center w-full justify-center gap-1">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay()]}
            className=" w-full "
          >
            <CarouselContent className="w-full">
              {heroUrl.map((path, index) => (
                <CarouselItem key={index} className="focus:outline-none">
                  <Image
                    src={path}
                    width={1920}
                    height={1080}
                    alt={`Imagen ${index + 1}`}
                    className="mx-auto w-full h-[380px] lg:w-full lg:h-[30rem] rounded-3xl object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2" />
            <CarouselNext className="text-white absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2" />
          </Carousel>
        </div>
        {[item]?.map((item: Item) => (
          <div
            key={item.id}
            className="flex flex-col w-full mt-6  xl:w-1/2  gap-2 "
          >
            <p className="text-2xl font-semibold mb-1 ">{item.title}</p>
            <p className="text-xl font-semibold mb-1">${item.price}</p>

            <p className="text-lg mb-2 font-bold text-sky-600 uppercase">
              {item.type} - {item.gender}
            </p>
            <p className="mb-4 text-md">{item.description}</p>
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
          </div>
        ))}
      </form>
    </section>
  );
}
