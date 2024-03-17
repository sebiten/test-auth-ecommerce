"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { sizestofilter } from "@/app/constantes/constantes";
import { ItemData } from "@/types";
import { createClient } from "@/utils/supabase/client";
import SkeletonCard from "@/components/Skeletor";
import { useDebounce } from "use-debounce";
import { SearchIcon } from "lucide-react";
import { titleFont } from "../config/fonts";

export default function Page() {
  const [filteredSize, setFilteredSize] = useState<string>("");
  const [filteredType, setFilteredType] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ItemData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;
  const supabase = createClient();

  // Uso de debounce para el campo de búsqueda
  const [debouncedText] = useDebounce(text, 500);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "search") {
      setText(value);
    } else if (name === "size") {
      setFilteredSize(value);
    } else if (name === "type") {
      setFilteredType(value);
    }

    setIsLoading(true);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const offset = (currentPage - 1) * perPage;
        let query = supabase
          .from("prenda")
          .select("*")
          .ilike("title", `%${debouncedText}%`);

        if (filteredType) {
          query = query.eq("type", filteredType);
        }

        if (filteredSize) {
          query = query.ilike("sizes", `%${filteredSize}%`);
        }

        const { data } = await query
          .range(offset, offset + perPage - 1)
          .limit(perPage);
        setSearchResults(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [debouncedText, currentPage, filteredSize, filteredType]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="mx-auto max-w-7xl px-4">
      <form
        id="search&filter"
        className="flex flex-col mt-10 items-center w-full"
      >
        <h2 className={titleFont.className}>
          <p className="block  my-2 text-xl border-b-2 border-zinc-400">
            Descubre tu estilo ahora mismo
          </p>
        </h2>
        <div className="">
          <div className="relative flex items-center">
            <Input
              onChange={(event) => handleFilterChange(event)}
              value={text}
              name="search"
              type="text"
              placeholder="Buscar prenda..."
              className="p-2 rounded-full shadow-md focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-lg duration-200 text-gray-700 bg-white border border-gray-300  dark:text-gray-200 dark:border-gray-600"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon className="h-5 w-5" />
            </span>
          </div>
          <div className="flex items-center justify-center mt-2 gap-2 md:flex-row md:space-y-0 md:space-x-4 w-full ">
            <div className="flex  items-center space-x-4">
              <select
                name="size"
                value={filteredSize}
                onChange={(e) => setFilteredSize(e.target.value)}
                className="p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-black border border border-gray-300 "
              >
                <option className="bg-blue-400" value="">
                  Selecciona un talle
                </option>
                {sizestofilter ? (
                  sizestofilter.map((size, index) => (
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
            </div>

            <div className="flex items-center space-x-4">
              <select
                name="type"
                value={filteredType}
                onChange={(e) => setFilteredType(e.target.value)}
                className="p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-black  border border border-gray-300 "
              >
                <option value="">Selecciona el tipo</option>
                <option value="shirts">Remera</option>
                <option value="long sleeve tee">Camiseta</option>
              </select>
            </div>
          </div>
        </div>
      </form>
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

      <div className="flex justify-center my-4">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-4"
        >
          Anterior
        </button>
        <span className="mx-4">{currentPage}</span>
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!searchResults || searchResults.length < perPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
