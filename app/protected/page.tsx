import { convertirHoraUTCALocal } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
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
      <h2 className="max-w-4xl mx-auto mt-10 text-3xl">Pedidos Realizados</h2>

      <div className="mt-10 ">
        <div className="max-w-6xl mx-auto shadow-lg dark:shadow-gray-800 border-y p-4">
          <div className="flex flex-col gap-6">
            {data &&
              data.map((item) => (
                <div
                  key={item.id}
                  className="md:flex justify-between items-center gap-4 animate__animated animate__fadeInUp"
                >
                  <div className="w-full md:full my-4">
                    <Image
                      src={item.picture_url}
                      alt="picture"
                      height={300}
                      width={300}
                      className="rounded-lg shadow-lg mx-auto"
                    />
                  </div>
                  <div className="w-full">
                    <ul className="text-lg">
                      <li className="font-medium text-gray-400 text-2xl">
                        {item.message}
                      </li>
                      <li>
                        <span className="font-bold">Cantidad:</span>{" "}
                        {item.amount}
                      </li>
                      <li>
                        <span className="font-bold">Email del Usuario:</span>{" "}
                        {item.user_email}
                      </li>
                      <li>
                        <span className="font-bold">Fecha de Inserción:</span>{" "}
                        {convertirHoraUTCALocal(item.inserted_at)}
                      </li>
                      <li>
                        <span className="font-bold">Email de Pago:</span>{" "}
                        {item.payment_email}
                      </li>
                      <li>
                        <span className="font-bold">Estado:</span> {item.status}
                      </li>
                      <li>
                        <span className="font-bold">Cantidad:</span> 1
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
