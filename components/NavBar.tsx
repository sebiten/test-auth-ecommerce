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

export function NavBar({ user }: { user: User | null }) {
  const [position, setPosition] = useState("bottom");
  const cartItems = useCartStore((state: any) => state.cartItems);
  const cartCount = cartItems.length;

  return (
    <nav className="sticky p-6 z-10  dark:bg-zinc-950/85 w-full top-0  mx-auto flex items-center justify-around  ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="focus:outline-none">
            <span className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={"https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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

        <DropdownMenuContent className="w-72 shadow-lg  rounded-md p-4">
          <DropdownMenuLabel className="text-lg font-semibold text-center">
            Hey!👋 {user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2" />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem
              value="link"
              className="text-lg"
            ></DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>

          {/* Add your additional menu items here based on the user and other conditions */}
          {user ? (
            <form className="mt-2 flex justify-evenly items-center">
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
            <div className="flex justify-evenly items-center">
              <Link href="/login">
                <span className="mt-0 block text-lg  hover:text-blue-500 transition duration-300 focus:outline-none">
                  Login
                </span>
              </Link>
              <Link href="/signup">
                <span className="hover:text-gray-300 text-lg transition duration-300">
                  Register
                </span>
              </Link>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center justify-center gap-3">
        <div>
          <Link href="/">
            <Button variant="ghost">Inicio</Button>
          </Link>
        </div>
        <ModeToggle />
        <Link href="/carrito" className="flex ">
          <Button variant="ghost">
            <MdOutlineShoppingCart size={22} />
            <p className="text-white">{cartCount}</p>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
