import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Form from "@/components/Form";
import { createClient } from "@/utils/supabase/server";
import Spinner from "@/components/Spinner";
import Comment from "@/components/Comment";
import { Item } from "@/types";
import { Relacionados } from "@/components/Relacionados";
import Link from "next/link";
import { ArrowBigLeft, ArrowLeft, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: any) {
  const supabase = createClient();
  const { data: auth, error } = await supabase.auth.getUser();
  const role = auth.user?.role;
  const email = auth.user?.email;
  const postId: string | undefined = params.prenda;
  const { data } = await supabase
    .from("prenda")
    .select("*")
    .eq("id", params.prenda);

  const { data: relacionados } = await supabase
    .from("prenda")
    .select("*")
    .eq("id", params.prenda);

  return (
    <section className=" mt-6 items-center justify-center mx-auto">
      <Link
        className=""
        href="/tienda
      "
      >
        <Button variant="outline" className="rounded-full">
          <ArrowLeft />
        </Button>
      </Link>
      <div className="grid gap-8 items-center justify-center mt-6 max-w-7xl mx-auto ">
        <Suspense fallback={<Spinner />}>
          <Form data={data!} role={role!} params={params} email={email!} />
        </Suspense>
      </div>
      {/* <Relacionados relacionados={relacionados!} /> */}
      <Comment postId={postId} />
    </section>
  );
}
