"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Image from "next/image";
import { heroUrl } from "./constantes/constantes";

export default function Index() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <section
      id="hero"
      className="lg:grid flex flex-col lg:grid-cols-2 w-full min-h-screen items-center justify-center"
    >
      <div className="text-center flex flex-col p-4 max-w-3xl  mx-auto  my-10 ">
        <p className="text-7xl font-bold uppercase text-blue-500 mb-4">
          <span>Pilcheria OnLine</span>
        </p>
        <h1 className="text-3xl font-bold text-center uppercase leading-tight tracking-tight mb-6">
          Tu estilo a un precio excelente
        </h1>
        <p className="text-center text-gray-400 mb-8 w-full  mx-auto">
          En Pilcheria Online, nos dedicamos a ofrecerte lo último en moda y
          estilo a precios irresistibles. Descubre una amplia gama de productos
          que reflejan tu personalidad y realzan tu elegancia. ¡Explora nuestras
          colecciones hoy y encuentra tu estilo perfecto sin comprometer tu
          bolsillo!
        </p>
        <div className="flex justify-center">
          <Link
            href="/tienda"
            className="px-6 py-3 font-bold uppercase bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Explorar Ahora
          </Link>
        </div>
      </div>
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay()]}
        className=" w-full max-w-4xl"
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
    </section>
  );
}
