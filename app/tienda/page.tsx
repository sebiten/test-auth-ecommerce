import React, { Suspense } from "react";
import PageClient from "./page.client";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/server";
import Spinner from "@/components/Spinner";

type ProfileParams = {
  [key: string]: string;
};

export default async function page({
  searchParams,
}: {
  searchParams: ProfileParams;
}) {
  const supabase = createClient();

  const { title, size } = searchParams;

  // Construct the Supabase query with filters
  let query = supabase.from("prenda").select("*");
  if (title) {
    query = query.ilike("title", `%${title}%`);
  }
  if (size) {
    query = query.ilike("sizes", `%${size}%`);
  }
  const { data: prenda, error } = await query;
  return (
    <div>
        <PageClient />
    </div>
  );
}
