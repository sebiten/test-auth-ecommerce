"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AiOutlineEdit, AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { photo } from "@/app/actions";
import { User } from "@supabase/supabase-js";

import { RiImageEditLine } from "react-icons/ri";
interface ProfileFormProps {
  user: User | null;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleImageUpload = async () => {
    setLoading(true); // Set loading to true when the button is clicked
    try {
      // Simulate photo upload action
      await new Promise((resolve) => setTimeout(resolve, 2000)); // This setTimeout simulates the photo upload action. Replace it with your actual photo upload logic.
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setLoading(false); // Set loading to false when the upload process is complete
      setEditing(false); // Set editing to false after photo upload is complete
    }
  };

  return (
    <form action={photo} className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-center ">
        Hola! <br />
        {user?.email}👋
      </h2>
      <div className="flex items-center justify-center">
        <div className=" rounded-lg  p-8 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
          <div className="flex justify-center mb-6 relative">
            {/* Mostrar icono de edición solo si no se está editando */}
            {!editing && (
              <div
                className="absolute bottom-0 right-0 cursor-pointer"
                onClick={() => setEditing(true)}
              >
                <Button variant="ghost">
                  <RiImageEditLine size={30} className="text-gray-500" />
                </Button>
              </div>
            )}
            <div className=" overflow-hidden rounded-full border-4 border-gray-200">
              <Image
                width={400}
                height={400}
                className="object-cover w-full h-full"
                alt="profile-image"
                src={`https://aaxuhmukpnvrngnsqoym.supabase.co/storage/v1/object/public/profile/user/${
                  user?.id
                }?v=${Date.now()}`}
              />
            </div>
          </div>
          {editing && ( // Mostrar input y botón de carga de imagen solo cuando se está editando
            <div className="flex flex-col items-center">
              <Input name="img" type="file" className="mb-4 w-full" />
              <Button onClick={handleImageUpload} className="w-full">
                {loading ? (
                  <div className="flex items-center justify-center">
                    Subiendo{" "}
                    <AiOutlineLoading3Quarters className="animate-spin ml-2" />
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
