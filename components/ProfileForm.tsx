"use client";
import React, { Suspense, useState } from "react";
import SkeletonCard from "./Skeletor";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import PedidosPage from "@/app/pedidos/page";
import { photo } from "@/app/actions";
import { User } from "@supabase/supabase-js";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Spinner from "./Spinner";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ProfileFormProps {
  user: User | null;
}
export default function ProfileForm({ user }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    setLoading(true); // Set loading to true when the button is clicked
    try {
      // Simulate photo upload action
      await new Promise((resolve) => setTimeout(resolve, 2000)); // This setTimeout simulates the photo upload action. Replace it with your actual photo upload logic.
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setLoading(false); // Set loading to false when the upload process is complete
    }
  };

  return (
    <form action={photo} className="flex max-w-xl mx-auto mt-2">
      <div className="h-full flex items-center justify-center">
        <div className="p-8 rounded-md shadow-lg mx-4 flex flex-col text-center justify-center ">
          <h1 className="text-3xl font-semibold  mt-4">Hello, {user?.email}</h1>
          <p className="text-base text-gray-600 mt-2">
            Welcome to our website!
          </p>
          <Image
            className="mx-auto"
            alt="logo"
            width={300}
            height={300}
            src={`https://aaxuhmukpnvrngnsqoym.supabase.co/storage/v1/object/public/profile/user/${
              user?.id
            }?v=${Date.now()}`}
          />
          <Input name="img" type="file" />
          <Button onClick={handleImageUpload}>
            {loading ? (
              <p className="flex gap-1 items-center justify-center">
                Subiendo{" "}
                <AiOutlineLoading3Quarters className={cn("animate-spin")} />
              </p>
            ) : (
              "Submit"
            )}
          </Button>
          <div className="mt-6 text-start"></div>
        </div>
      </div>
    </form>
  );
}
