import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SiMercadopago } from "react-icons/si";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Form } from "@/components/ui/form";

export default async function Page({ params }: any) {
  const supabase = createClient();
  const itemId: number = params.prenda;

  const { data: auth, error } = await supabase.auth.getUser();
  const role = auth.user?.role;
  const { data } = await supabase
    .from("prenda")
    .select("*")
    .eq("id", params.prenda);
  if (error) {
    console.log(error);
  } else {
    console.log(role);
  }

  return (
    <section className="flex my-28 items-center justify-center max-w-7xl mx-auto">
      <div className="grid gap-8 items-center justify-center ">
        {data?.map((item: any) => (
          <div key={item.id} className="flex gap-14 p-4 rounded-lg">
            <Suspense fallback={<Skeleton className="w-[400] h-[100px]" />}>
              <form className="max-w-3xl mx-auto ml-4">
                {/* {notification.isOpen && (
        <div className="">
          <div
            className=""
            style={{
              backgroundColor:
                notification.type === "approved" ? "#00cc99" : "#ee4646",
            }}
          >
            <p>{notification.type}</p>
          </div>

          <p>{notification.content}</p>
        </div>
      )} */}
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
                  >
                    <option value="">Selecciona un talle</option>
                    {item?.sizes ? (
                      item?.sizes
                        .split(",")
                        .map((size: string, index: number) => (
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
                    type="button"
                    // siguiente hacer que el action de este button guarde la informacion al carrito en ls
                    className="hover:underline"
                    disabled={role !== "authenticated" || item.inStock <= 0}
                  >
                    {role !== "authenticated"
                      ? "Tienes que estar logeado"
                      : "Agregar al carrito"}
                  </Button>
                  <Button
                    type="submit"
                    className="hover:underline bg-sky-400 flex gap-1 font-bold"
                    disabled={role !== "authenticated" || item.inStock <= 0}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <AiOutlineLoading3Quarters
                        className={cn("animate-spin")}
                      />
                      Comprar Con Mercado pago Ahora{" "}
                    </div>

                    <SiMercadopago className="mr-4  font-bold" size={30} />
                  </Button>
                </div>
              </form>
            </Suspense>
          </div>
        ))}
      </div>
    </section>
  );
}
