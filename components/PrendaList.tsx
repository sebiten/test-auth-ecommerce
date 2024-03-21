import Image from "next/image";
import React from "react";
import SkeletonCard from "./Skeletor";
import { ItemData } from "@/types";
import Link from "next/link";

interface IPrendaListProps {
  searchResults: any;
  isLoading: boolean;
}

export default function PrendaList({
  searchResults,
  isLoading,
}: IPrendaListProps) {
  return (
    <div>
      <div className="grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-8">
        {isLoading ? (
          <SkeletonCard />
        ) : searchResults?.length === 0 ? (
          <p className="text-center">No se encontraron resultados.</p>
        ) : (
          searchResults &&
          searchResults.map((item: ItemData) => (
            <Link href={`/tienda/${item.id}`} key={item.id} passHref>
              <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out w-full mx-auto">
                <Image
                  src={item.images}
                  width={1920}
                  height={1080}
                  layout="responsive"
                  quality={80}
                  alt={item.description}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:from-transparent transition-opacity duration-300 ease-in-out"></div>
                <div className="p-2">
                  <h3 className="text-sm font-semibold transition-opacity duration-300 ease-in-out line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex flex-row justify-between mt-1">
                    <p className="text-xs font-medium transition-opacity duration-300 ease-in-out">
                      {item.sizes
                        ? item.sizes.split(",").join(", ")
                        : "No sizes available"}
                    </p>
                  </div>
                  <p className="text-xs font-medium transition-opacity duration-300 ease-in-out my-2">
                    {item.inStock > 0 ? (
                      <span className="text-green-500">
                        {item.inStock} unidades disponibles
                      </span>
                    ) : (
                      <span className="text-red-500">Sin stock</span>
                    )}
                  </p>
                  <p className="text-lg font-bold mt-1 transition-opacity duration-300 ease-in-out">
                    ${item.price}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
