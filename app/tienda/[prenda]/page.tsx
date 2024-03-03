import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Form from "@/components/Form";
import { createClient } from "@/utils/supabase/server";

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
              <Form item={item} role={role} params={params} />
            </Suspense>
          </div>
        ))}
      </div>
    </section>
  );
}
