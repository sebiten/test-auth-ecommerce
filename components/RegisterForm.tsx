import { signUp } from "@/app/actions";
import { SubmitButton } from "@/app/ingreso/submit-button";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";


interface IRegisterFormProps {}

export default function RegisterForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4 ">
      <h2 className="text-2xl flex items-center justify-center gap-2 font-bold mb-4">
        Crear una cuenta <IoCreateOutline/>
      </h2>
      <label htmlFor="email" className="text-md flex items-center">
        <AiOutlineMail className="mr-2" /> Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="rounded-md px-4 py-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="tú@correo.com"
        required
      />

      <label htmlFor="password" className="text-md flex items-center">
        <AiOutlineLock className="mr-2" /> Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="rounded-md px-4 py-2  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="••••••••"
        required
      />
      <p className="text-center text-sm ">
        Ya tenes una cuenta creada?{" "}
        <Link className="text-blue-500" href="/ingreso">
          Inicia sessión aqui
        </Link>
      </p>
      <SubmitButton
        formAction={signUp}
        type="submit"
        pendingText="Creando Registro..."
        className="flex items-center justify-center bg-blue-500  rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <RiCheckboxCircleFill className="mr-2" />
        Registrarse
      </SubmitButton>

      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
}
