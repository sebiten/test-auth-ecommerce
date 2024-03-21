import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-7xl justify-center gap-2">
      <LoginForm searchParams={searchParams} />
    </div>
  );
}
