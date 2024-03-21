import RegisterForm from "@/components/RegisterForm";
import React from "react";

interface IpageProps {}

export default function page({
    searchParams,
  }: {
    searchParams: { message: string };
  }) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <RegisterForm searchParams={searchParams} />
    </div>
  );
}
