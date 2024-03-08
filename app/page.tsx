import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Index() {
  return (
    <section
      id="hero"
      className="flex flex-col w-full h-screen items-center justify-center "
    >
      <div className="text-center flex flex-col my-auto">
        <p className="text-7xl font-bold uppercase text-blue-500">
          <span>
            Pilcheria <br /> OnLine
          </span>
        </p>
        <h1 className="text-xl font-bold text-center uppercase leading-tight tracking-tight md:text-xl mt-4">
          Tu estilo a un precio excelente
        </h1>
        <div className="flex justify-center mt-2">
          <Link
            href="/tienda"
            className=" items-center px-4 py-2 font-bold uppercase"
          >
            <Button className="font-bold  hover:bg-blue-500">
              Explorar Ahora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
