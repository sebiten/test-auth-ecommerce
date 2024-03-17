import Image from "next/image";
import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import PedidosPage from "../pedidos/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import SkeletonCard from "@/components/Skeletor";
import { photo } from "../actions";
import ProfileForm from "@/components/ProfileForm";

export default async function About() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    revalidatePath("/perfil", "page");
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 place-content-center max-w-[90rem] mx-auto p-10">
      <div className="flex  justify-center  mx-auto">
        <ProfileForm user={user} />
      </div>
      <div className="flex items-center justify-center w-full ">
        <PedidosPage />
      </div>
    </div>
  );
}
