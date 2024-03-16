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
    <>
      <Suspense fallback={<SkeletonCard/>}>
        <ProfileForm user={user} />
      </Suspense>
    </>
  );
}
