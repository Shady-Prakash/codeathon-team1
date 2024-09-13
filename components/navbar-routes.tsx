"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/dashboard/admin");
  const isCoursePage = pathname?.includes("/dashboard/courses");
  const isSearchPage = pathname === "/dashboard/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput/>
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isAdminPage || isCoursePage ? (
          <Link href="/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2"/>
              Exit
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard/admin/courses">
            <Button size="sm" variant="ghost">
              Admin mode
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/"/>
      </div>
    </>
  )
}