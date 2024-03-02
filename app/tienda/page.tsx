import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { sizestofilter } from "../constantes/constantes";
import { Button } from "@/components/ui/button";

type ProfileParams = {
  [key: string]: string;
};

export default async function page({
  searchParams,
}: {
  searchParams: ProfileParams;
}) {
  const supabase = createClient();

  const { title, size } = searchParams;

  // Construct the Supabase query with filters
  let query = supabase.from("prenda").select("*");
  if (title) {
    query = query.ilike("title", `%${title}%`);
  }
  if (size) {
    query = query.ilike("sizes", `%${size}%`);
  }
  const { data: prenda, error } = await query;
  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <form className="flex flex-col mt-6 gap-4">
          <h2 className="text-center font-bold text-2xl mb-2">
            <span>Explora tus prendas aquí</span>
          </h2>
          <div className="flex w-full">
            <Input
              placeholder="Search model"
              type="text"
              name="title"
              id="title"
            />
            <Button className="font-bold" variant="default" type="submit">
              Search model
            </Button>
          </div>
          <div className="flex justify-start items-center gap-4">
            {sizestofilter?.map((size, index) => (
              <div
                className="flex items-center justify-center gap-1"
                key={index}
              >
                <Checkbox name="size" value={size} id={size} />
                <label
                  htmlFor={size}
                  className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {size}
                </label>
              </div>
            ))}

            <Link className="flex items-center justify-center" href="/tienda">
              <Button
                // disabled={searchText.length === 0}
                // onClick={() => setSearchText("")}
                variant="outline"
              >
                Reset Filter
              </Button>
            </Link>
          </div>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-8 max-w-7xl mx-auto">
          {prenda &&
            prenda.map((item: any) => (
              <Link href={`/tienda/${item.id}`} key={item.id} passHref>
                <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out w-full mx-auto">
                  <Image
                    width={400}
                    height={400}
                    src={item.images}
                    alt={item.description}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:from-transparent transition-opacity duration-300 ease-in-out"></div>
                  <div className="p-2">
                    <h3 className="text-sm font-semibold transition-opacity duration-300 ease-in-out">
                      {item.title}
                    </h3>
                    <div className="flex text-green-500 flex-row justify-between mt-1">
                      <p className="text-xs font-medium transition-opacity duration-300 ease-in-out">
                        {item.sizes
                          ? item.sizes.split(",").join(", ")
                          : "No sizes available"}
                      </p>
                    </div>
                    <p
                      className={
                        item.inStock
                          ? "text-gray-400 text-sm mt-1"
                          : "text-red-400 text-sm mt-1"
                      }
                    >
                      {item.inStock === 0
                        ? "No Stock"
                        : `Quantity: ${item.inStock}`}
                    </p>
                    <p className="text-lg font-bold mt-1 transition-opacity duration-300 ease-in-out">
                      ${item.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
