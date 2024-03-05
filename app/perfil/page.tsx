import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";

export default async function About() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  return (
    <div className="h-full flex items-center justify-center">
      <Image alt="logo" width={300} height={300} src="/favicon.ico" />
      <div className="p-8 rounded-md shadow-lg mx-4 ">
        <h1 className="text-3xl font-semibold  mt-4">
          Hello, {data.user.email}
        </h1>
        <p className="text-base text-gray-600 mt-2">Welcome to our website!</p>

        <div className="mt-6 text-start">
          <Link href="/">
            <p className="text-blue-500 hover:underline">Go back to Home</p>
          </Link>
          <Link href="/">
            <p className="text-xl mt-4 hover:underline">Pedidos</p>
            
          </Link>
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
        </div>
      </div>
    </div>
  );
}
