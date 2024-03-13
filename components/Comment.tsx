import React from "react";
import { createClient } from "@/utils/supabase/server";
import CommentForm from "./CommentForm";
import StarRating from "./StarRating";
import Image from "next/image";

interface propsType {
  postId: number | string | undefined;
}

export default async function Comment({ postId }: propsType) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  const email: string | undefined = user.user?.email;

  const { data: comentarios } = await supabase
    .from("comentarios")
    .select("*")
    .eq("postId", postId);

  const ratingQuery = await supabase
    .from("comentarios")
    .select("rating")
    .eq("email", email);
  const rating: number =
    ratingQuery.data && ratingQuery.data.length > 0
      ? ratingQuery.data[0].rating
      : null;

  return (
    <div className="rounded-lg shadow-md w-full xl:max-w-7xl  mt-24 grid grid-cols-1 xl:grid-cols-2 py-10">
      <CommentForm email={email} postId={postId} />
      <div className="flex flex-col gap-4 w-full px-6 md:p-0">
        <h3 className="text-2xl text-center md:text-end font-bold  my-6 md:m-0">
          Comentarios del producto
        </h3>
        {comentarios && comentarios.length > 0 ? (
          comentarios.map((comentario) => (
            <div
              className="border rounded-md p-4 flex flex-col gap-2"
              key={comentario.id}
            >
              <div className="flex items-center">
                <div className="mr-2">
                  <StarRating rating={comentario.rating} />{" "}
                  {/* Cambiado aquí */}
                </div>
                <h4 className="text-lg font-semibold">{comentario.name}</h4>
              </div>
              <p>{comentario.content}</p>
              <div className="flex items-center justify-between text-sm">
                <span>{comentario.email}</span>
                <span>{comentario.fecha}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center md:items-end justify-center">
            <Image
              src="/emptyCart.png"
              height={300}
              width={300}
              alt="emptycomments"
            />
            <span className="text-lg font-bold">
              No hay comentarios disponibles.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
