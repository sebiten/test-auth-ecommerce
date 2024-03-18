import { Item } from "@/types";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { FormProps } from "./Form";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type RelacionadosProps = {
  relacionados: Item[];
};
export const Relacionados: React.FC<RelacionadosProps> = async ({
  relacionados,
}) => {
  const supabase = createClient();
  const relacion = relacionados.map((item) => item.gender);

  const { data: relacionado, error } = await supabase
    .from("prenda")
    .select("*")
    .eq("gender", relacion);

  return (
    <Carousel className="w-full mt-4 max-w-2xl ml-16 hidden md:block md:grid-cols-2 relative">
      <CarouselContent className="">
        {relacionado && relacionado.map((relacionado, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Image src={relacionado.images} alt={relacionado.title} width={500} height={500} />
              {/* Puedes ajustar las propiedades de Image según tus necesidades */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2" />
      <CarouselNext  className="absolute right-0 top-1/2" />
    </Carousel>
  );
};
