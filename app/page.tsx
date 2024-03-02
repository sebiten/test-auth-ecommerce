import AuthButton from "@/components/AuthButton";
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
        <p className="text-lg max-w-prose text-center mx-auto mt-4">
          Descubre una amplia variedad de ropa para hombres, tanto nueva como
          usada, con la mejor relación calidad-precio.
          <br />
          ¡Encuentra tu look ideal y exprésate sin límites!
        </p>
        <div className="flex justify-center mt-8">
          <Link
            href="/tienda"
            className="inline-flex items-center px-4 py-2 font-bold uppercase"
          >
            <Button className="font-bold hover:bg-blue-500">
              Explorar Ahora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
