"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";
import { signOut } from "@/app/actions";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ItemData } from "@/types";
import { useCartStore } from "@/app/store/cartStore";
import { AiFillShopping, AiOutlineShoppingCart } from "react-icons/ai";
import { SiBigbasket } from "react-icons/si";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import { FcGoogle } from "react-icons/fc";

export function NavBar({ user }: { user: User | null }) {
  const supabase = createClient();
  const [position, setPosition] = useState("bottom");
  const cartItems = useCartStore((state) => state.cartItems);
  const cartCount = cartItems.length;
  const handleLogin = (e: any) => {
    e.preventDefault();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback"
      },
    });
  };

  return (
    <nav className="sticky p-4 z-50  border-b-2  w-full top-0  mx-auto flex items-center justify-around bg-white/95 dark:bg-zinc-950/95 ">
      <div className="flex flex-row-reverse items-center justify-center">
        <div className=" gap-4 hidden sm:grid">
          {!user && (
            <div className="flex gap-2 items-center">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleLogin}
              >
                <FcGoogle />
                Login
              </Button>
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className=" h-12 flex gap-2 hover:text-blue-500 transition duration-300 focus:outline-none"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`https://aaxuhmukpnvrngnsqoym.supabase.co/storage/v1/object/public/profile/user/${
                    user?.id
                  }?v=${Date.now()}`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-72 shadow-lg  rounded-md p-2">
            <DropdownMenuLabel className="text-lg font-semibold text-center">
              Hola!👋 {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem
                value="link"
                className="text-lg"
              ></DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>

            {/* Add your additional menu items here based on the user and other conditions */}
            {user ? (
              <form className="mt-2  flex justify-evenly items-center">
                <div className="w-full  max-w-4xl flex justify-between items-center text-sm">
                  {user ? (
                    <div className="flex items-center gap-2">
                      <Link href="/perfil">
                        <Button
                          type="button"
                          variant="outline"
                          className="hover:text-blue-500 transition duration-300"
                        >
                          Profile
                        </Button>
                      </Link>
                      <Link href="/pedidos">
                        <Button type="button" variant="outline">
                          {" "}
                          Pedidos
                        </Button>
                      </Link>
                      <Button
                        type="submit"
                        formAction={signOut}
                        className="py-2 px-4 rounded-md no-underline "
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Link href="/login">Login</Link>
                  )}
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-evenly items-center">
                  <ModeToggle />

                  <Link href="/ingreso">
                    <span className="mt-0 block text-sm  hover:text-blue-500 transition duration-300 focus:outline-none uppercase">
                      Ingresar
                    </span>
                  </Link>
                  <Link href="/registro">
                    <span className="hover:text-gray-300 text-sm transition duration-300 uppercase">
                      Registrarse
                    </span>
                  </Link>
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center justify-center  gap-1">
        <div className="flex">
          <Link href="/">
            <Button
              className="md:text-md text-sm uppercase font-bold hover:text-blue-500 transition duration-300 focus:outline-none"
              variant="ghost"
            >
              Inicio
            </Button>
          </Link>

          <Link href="/tienda">
            <Button
              className="md:text-md text-sm uppercase font-bold hover:text-blue-500 transition duration-300 focus:outline-none"
              variant="ghost"
            >
              Tienda
            </Button>
          </Link>
        </div>
        <Link href="/carrito" className="flex ">
          <Button
            className="hover:text-blue-500 transition duration-300 focus:outline-none"
            variant="ghost"
          >
            <MdOutlineShoppingCart size={25} />
            <p className="text-white text-lg">{cartCount}</p>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
