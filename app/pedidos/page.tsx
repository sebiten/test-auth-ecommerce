import { convertirHoraUTCALocal } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <section className="w-full gap-20 items-center">
      <h2 className="max-w-4xl mx-auto text-center mt-10 text-3xl font-bold">
        Pedidos Realizados
      </h2>
      <div className="mt-10">
        <div className="w-full mx-auto shadow-xl dark:shadow-black overflow-x-auto">
          <Table className="w-full">
            <TableCaption>Lista de tus recientes adquisiciones.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2 text-left">Imágenes</TableHead>
                <TableHead className="px-4 py-2 text-left">Mensajes</TableHead>
                <TableHead className="px-4 py-2 text-left">Montos</TableHead>
                <TableHead className="px-4 py-2 text-left">
                  Email del Usuario
                </TableHead>
                <TableHead className="px-4 py-2 text-left">
                  Fecha de Inserción
                </TableHead>
                <TableHead className="px-4 py-2 text-left">
                  Email de Pago
                </TableHead>
                <TableHead className="px-4 py-2 text-left">Estado</TableHead>
                <TableHead className="px-4 py-2 text-left">Cantidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {data &&
                data.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 dark:bg-black "
                        : "bg-white dark:bg-black/20 "
                    }
                  >
                    <TableCell className="px-4 py-2 ">
                      {item?.picture_url && Array.isArray(item.picture_url) && (
                        <ul className="list-decimal grid grid-cols-3 md:grid-cols-1 gap-2">
                          {item.picture_url.map((url: string, index: number) => (
                            <li key={index}>
                              <Image
                              height={300}
                              width={300}
                                src={url}
                                alt={`Imagen ${index + 1}`}
                                className=" rounded-lg shadow-lg "
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </TableCell>
                    <TableCell
                      className="px-4 py-2 "
                      style={{ minWidth: "300px" }}
                    >
                      {item?.message && (
                        <ul className=" space-y-10">
                          {item.message.map((message: string, index: number) => (
                            <li key={index}>{message}</li>
                          ))}
                        </ul>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {item?.amount && (
                        <ul className=" space-y-10">
                          {item.amount.map((monto: number, index: number) => (
                            <li key={index}>{monto}</li>
                          ))}
                        </ul>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {item?.user_email}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {convertirHoraUTCALocal(item?.inserted_at)}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {item?.payment_email}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <span
                        className={
                          item?.status === "approved"
                            ? "text-green-400 dark:text-green-300"
                            : "text-red-400 dark:text-red-300"
                        }
                      >
                        {item?.status === "approved" ? "Aprobado" : "Rechazado"}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {item.message.length}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
