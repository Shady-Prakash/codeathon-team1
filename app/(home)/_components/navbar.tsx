"use client"
import Link from "next/link"
import { Menu, X} from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Donate from "./paypal/donate"
import { useRouter } from "next/navigation"
import {useAuth, UserButton } from "@clerk/nextjs"
import { Actions } from "./actions"

const NavBar = () => {
  const [state, setState] = useState(false);
  const [prevScrollpos, setPrevScrollpos] = useState(window.scrollY);
  const [top, setTop] = useState(0);
  const router = useRouter();
  const {userId} = useAuth()

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        setTop(0); // Show navbar
      } else {
        setTop(-110); // Hide navbar
      }
      setPrevScrollpos(currentScrollPos);
    };
    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);
    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollpos]);

  const menus = [
    { title: "Home", path: "/home" },
    { title: "About Us", path: "/about-us" },
    { title: "Programmes", path: "/programmes" },
    { title: "Stories", path: "/stories" },
    { title: "Work with Us", path: "/work" },
    { title: "Contact Us", path: "/contact-us" },
  ]

  const clickHandler = () => {
    router.push('/sign-in')
  }

  const donationHandler = async () => {
  const response = await fetch("https://www.paypal.com/donate", {
      method: "POST",
    });
  }

  return (
    
    <nav 
      className ={!state ? `sticky top-${top} bg-white z-10 w-full border-b md:border-0` : "fixed bg-white z-10 w-full border-b md:border-0"} style={{transition: 'top ease-in-out 0.3s'}}>
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
              {!state ? <Menu/> : <X/>}
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
              <li key={idx} className="font-medium text-black hover:text-indigo-600">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
          <div className={`${state ? "block text-center" : "hidden"} md:flex gap-3 items-center`}>
            {
              !userId 
              ? <Button variant="success" border="rounded" size="lg" onClick={clickHandler}>Sign in</Button> 
              : 
              // <form action="https://www.paypal.com/donate" method="post" target="_top">
              //   <input type="hidden" name="hosted_button_id" value="C63JQ5E9GLUSC" />
                  <Actions
                // userId={row.original.publicUserData?.userId}
                // role={row.original.role}
              />
              // </form>
                  }
              {/* <UserButton afterSignOutUrl="/"/> */}
          {/* <Donate/> */}

        </div>
      </div>
    </nav>
  )
}

export default NavBar