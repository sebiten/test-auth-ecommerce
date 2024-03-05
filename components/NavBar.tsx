"use client";
import * as React from "react";
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

export function NavBar({ user }: { user: User | null }) {
  const [position, setPosition] = React.useState("bottom");
  const [cartItemCount, setCartItemCount] = React.useState<number>(0);
  const aud = user?.aud;

  return (
    <nav className="sticky top-10 max-w-4xl mx-auto flex items-center justify-between mt-10 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="focus:outline-none">
            <span className="flex items-center">
              <span className="mr-2">Menu</span>
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
                    <Link href="/profile">
                      <Button
                        type="button"
                        variant="outline"
                        className="hover:text-blue-500 transition duration-300"
                      >
                        Profile
                      </Button>
                    </Link>
                    <Link href="/protected">
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
      <ModeToggle />
    </nav>
  );
}
