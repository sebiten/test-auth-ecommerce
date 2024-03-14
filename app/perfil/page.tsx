import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import PedidosPage from "../pedidos/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { photo } from "../actions";
import { revalidatePath } from "next/cache";

export default async function About() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/");
    // revalidatePath("/perfil")
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="p-8 rounded-md shadow-lg mx-4 text-center justify-center ">
        <h1 className="text-3xl font-semibold  mt-4">Hello, {user.email}</h1>
        <p className="text-base text-gray-600 mt-2">Welcome to our website!</p>
        <Image
          className="mx-auto"
          alt="logo"
          width={300}
          height={300}
          src={""}
        />
        <form action={photo} className="flex max-w-xl mx-auto mt-2">
          <Input name="img" type="file" />
          <Button type="submit" name="submit">
            Submit
          </Button>
        </form>
        <div className="mt-6 text-start">
          {/* <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table> */}
          <PedidosPage />
        </div>
      </div>
    </div>
  );
}
