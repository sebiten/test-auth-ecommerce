import { convertirHoraUTCALocal } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function PedidosPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const { data, error } = await supabase
    .from("checkout")
    .select("*")
    .eq("user_id", user.id);
  if (error) {
    console.log(error);
  }

  return (
    <section className=" w-full gap-20 items-center">
      <div className="w-full">
        <div className="py-6 flex text-gray-300 flex-col font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <h2 className="max-w-4xl mx-auto text-center mt-10 text-3xl">Pedidos Realizados</h2>
      <div className="mt-10 ">
        <div className="max-w-6xl mx-auto shadow-xl dark:shadow-black p-4">
          <div className="flex flex-col gap-6">
            {data &&
              data?.map((item) => (
                <div
                  key={item.id}
                  className="md:flex justify-between items-center gap-4 animate__animated animate__fadeInUp"
                >
                  <div className="w-full  md:full my-4">
                    {item?.picture_url && Array.isArray(item.picture_url) && (
                      <div className="w-full grid grid-cols-3 md:full my-4">
                        {item.picture_url.map((url: string, index: number) => (
                          <Image
                            key={index}
                            src={url}
                            alt={`picture_${index}`}
                            height={100}
                            width={160}
                            className="rounded-lg shadow-lg"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <ul className="text-lg">
                      {item?.message && (
                        <li className="text-2xl font-bold text-gray-400">

                          {item.message.map((monto: number, index: number) => (
                            <span key={index}>
                              {monto}
                              {index < item.message.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </li>
                      )}
                      {item?.amount && (
                        <li>
                          <span className="font-bold">Montos:</span>{" "}
                          {item.amount.map((monto: number, index: number) => (
                            <span key={index}>
                              {monto}
                              {index < item.amount.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </li>
                      )}
                      <li>
                        <span className="font-bold">Email del Usuario:</span>{" "}
                        {item?.user_email}
                      </li>
                      <li>
                        <span className="font-bold">Fecha de Inserción:</span>{" "}
                        {convertirHoraUTCALocal(item?.inserted_at)}
                      </li>
                      <li>
                        <span className="font-bold">Email de Pago:</span>{" "}
                        {item?.payment_email}
                      </li>
                      <li className="flex gap-1">
                        Estado:
                        <span className="font-bold">
                          {item?.status === "approved" ? (
                            <p className="text-green-400">Aprovado</p>
                          ) : (
                            <p className="text-red-400">Rechaqado</p>
                          )}
                        </span>{" "}
                      </li>
                      <li>
                        Cantidad:
                        <span className="font-bold text-gray-400">
                          {" "}
                          {item.message.length}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
