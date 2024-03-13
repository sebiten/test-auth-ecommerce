import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Form from "@/components/Form";
import { createClient } from "@/utils/supabase/server";
import Spinner from "@/components/Spinner";
import Comment from "@/components/Comment";
import { Item } from "@/types";
import { Relacionados } from "@/components/Relacionados";

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
    <section className=" my-28 items-center justify-center mx-auto">
      <div className="grid gap-8 items-center justify-center ">
        <Suspense fallback={<Spinner />}>
          <Form data={data!} role={role!} params={params} email={email!} />
        </Suspense>
      </div>
      <Relacionados relacionados={relacionados!} />
      <Comment postId={postId} />
    </section>
  );
}
