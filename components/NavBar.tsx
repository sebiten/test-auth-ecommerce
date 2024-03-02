import React from "react";
import AuthButton from "./AuthButton";
import { createClient } from "@/utils/supabase/server";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";

export default async function NavBar({ user }: { user: User }) {
  return (
    <nav className="w-full flex border-b gap-1 items-center justify-center h-16">
      <Link href="/tienda">
        <Button>Tienda</Button>
      </Link>
      <Link href="/">
        <Button variant="outline">Home</Button>
      </Link>
      <div className="w-full max-w-4xl flex justify-between items-center text-sm">
        {user ? (
          <Link href="/profile">
            <Button variant="outline"> Perfil</Button>
          </Link>
        ) : (
          ""
        )}

        <AuthButton />
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}
