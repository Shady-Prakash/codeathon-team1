"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const NavBar = () => {
  const [state, setState] = useState(false);
  const [prevScrollpos, setPrevScrollpos] = useState(0);
  const [top, setTop] = useState(0);
  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        setTop(0);
      } else {
        setTop(-110);
      }
      setPrevScrollpos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollpos]);

  const menus = [
    { title: "Home", path: "/" },
    { title: "Become a Donor", path: "/register" },
  ];

  const clickHandler = () => {
    router.push("/sign-in");
  };

  return (
    <nav
      className={
        !state
          ? `sticky top-${top} bg-white z-10 w-full border-b md:border-0`
          : "fixed bg-white z-10 w-full border-b md:border-0"
      }
      style={{ transition: "top ease-in-out 0.3s" }}
    >
      <div className="items-center px-4 max-w-screen-2xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              width={70}
              height={70}
              alt="Branding logo"
            />
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {!state ? <Menu /> : <X />}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-5 mt-8 md:block md:pb-0 md:mt-0 text-center ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-5 md:flex md:space-x-10 md:space-y-0">
            {menus.map((item, idx) => (
              <li
                key={idx}
                className="font-medium text-black hover:text-indigo-600"
              >
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${
            state ? "block text-center" : "hidden"
          } md:flex gap-3 items-center`}
        >
          {!userId ? (
            <Button
              variant="success"
              border="rounded"
              size="lg"
              onClick={clickHandler}
            >
              Sign in
            </Button>
          ) : (
            <Link href="/dashboard">
              <Button variant="success" border="rounded" size="lg">
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
