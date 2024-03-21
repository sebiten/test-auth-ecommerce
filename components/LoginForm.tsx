import { signIn } from "@/app/actions";
import { SubmitButton } from "@/app/ingreso/submit-button";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
interface IRegisterFormProps {}

export default function LoginForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="block mx-auto flex lg:grid lg:grid-cols-2 gap-6">
    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4">
      <h2 className="text-2xl flex items-center justify-center gap-2 font-bold mb-4">
        Inicia sesión para continuar <FaUserCheck />
      </h2>
      <label htmlFor="email" className="text-md flex items-center">
        <AiOutlineMail className="mr-2" /> Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="tú@correo.com"
        required
      />

      <label htmlFor="password" className="text-md flex items-center">
        <AiOutlineLock className="mr-2" /> Contraseña
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="••••••••"
        required
      />
      <p className="text-center text-sm ">
        No tenes una cuenta?{" "}
        <Link className="text-blue-500" href="/registro">
          Registrate haciendo click aqui
        </Link>
      </p>
      <SubmitButton
        formAction={signIn}
        type="submit"
        pendingText="Ingresando..."
        className="flex items-center justify-center bg-blue-500 rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <RiCheckboxCircleFill className="mr-2" />
        Ingresar
      </SubmitButton>

      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
    <div className="hidden lg:flex items-center justify-center">
      <Image
        src="carrosel1.jpg"
        width={200}
        height={200}
        layout="responsive"
        quality={80}
        alt="login image"
        className="mx-auto object-cover rounded-3xl"
      />
    </div>
  </div>

  );
}
