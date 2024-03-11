import React from "react";
import { createClient } from "@/utils/supabase/server";
import CommentForm from "./CommentForm";
import StarRating from "./StarRating";

export default async function Comment({ postId }: any) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  const email: unknown = user.user?.email;

  const { data: comentarios } = await supabase.from("comentarios").select("*");

  const ratingQuery = await supabase
    .from("comentarios")
    .select("rating")
    .eq("email", email);

  const rating: number =
    ratingQuery.data && ratingQuery.data.length > 0
      ? ratingQuery.data[0].rating
      : null;

  return (
    <div className="rounded-lg shadow-md w-full xl:max-w-7xl  mt-24 grid grid-cols-1 xl:grid-cols-2">
      <CommentForm email={email} postId={postId} />
      <div className="flex flex-col gap-4 w-full px-6">
        <h3 className="text-2xl font-bold  mb-4">Comentarios del producto</h3>
        {comentarios?.map((comentario) => (
          <div
            className="border rounded-md p-4 flex flex-col gap-2"
            key={comentario.id}
          >
            <div className="flex items-center">
              <div className="mr-2">
                <StarRating rating={comentario.rating} /> {/* Cambiado aquí */}
              </div>
              <h4 className="text-lg font-semibold">{comentario.name}</h4>
            </div>
            <p>{comentario.content}</p>
            <div className="flex items-center justify-between text-sm">
              <span>{comentario.email}</span>
              <span>{comentario.fecha}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
