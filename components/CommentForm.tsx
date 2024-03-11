"use client";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { onsubMitRating } from "@/app/actions";
import { IoMdMail } from "react-icons/io";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface ICommentFormProps {}

export default function CommentForm(postId: any, email: string | undefined) {
  const [rating, setRating] = useState<number>(0);
  const ref = useRef<HTMLFormElement>(null);

  const handleRatingChange = (value: any) => {
    setRating(value);
  };
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await onsubMitRating(formData, postId.postId, postId.email, rating);
        // reseteamos form
        ref.current?.reset();
      }}
      className="px-6 rounded-md shadow-lg items-center justify-center  gap-10 flex  w-full"
    >
      <div className="w-full">
        <h3 className="text-3xl text-blue-400 font-bold  mb-6">
          Comparte tu opinión sobre nuestro producto
        </h3>
        <div className="mb-4">
          <label className=" text-sm  font-medium mb-2">Rating:</label>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleRatingChange(index + 1)}
                className={`text-3xl focus:outline-none ${
                  index + 1 <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                &#9733;
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4 w-full">
          <label className="block text-sm  font-medium mb-2">Nombre:</label>
          <Input
            name="name"
            type="text"
            className="w-full p-3 border  rounded-md focus:outline-none focus:border-yellow-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm  font-medium mb-2">Comentario:</label>
          <Textarea
            name="content"
            className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:border-yellow-500"
            rows={4}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full py-3 rounded-md transition duration-300 hover:bg-sky-500"
        >
          <span className="flex items-center justify-center">
            Enviar comentario <IoMdMail className="ml-2" size={20} />
          </span>
        </Button>
      </div>
    </form>
  );
}
