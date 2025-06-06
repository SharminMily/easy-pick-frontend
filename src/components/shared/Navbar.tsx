"use client";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "../ui/button";
import { Heart, LogOut, ShoppingBag } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthServices";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user, setIsLoading } = useUser();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
  };

  return (
    <header className="border-b border-b-gray-300 w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <h1 className="text-2xl font-black flex items-center">
          <Logo />
          EASY PICK
        </h1>
        <div className="max-w-md  flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
          />
        </div>
        <nav className="flex gap-2">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <Heart />
          </Button>
          <Button variant="outline" className="rounded-full p-0 size-10">
            <ShoppingBag />
          </Button>

          {user ? (
            <>
              <Link href="/create-shop">
                <Button
               
                  className="rounded-full bg-fuchsia-600 text-white hover:bg-gray-600  "
                >
                  Create Shop
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-100">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>My Shop</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogOut}
                    className="bg-red-600 cursor-pointer"
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                className="rounded-full hover:bg-gray-300 "
              >
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
