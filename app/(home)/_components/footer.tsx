"use client";
import Link from "next/link";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Linkedin className="text-white" />,
      link: "https://www.linkedin.com/company/the-big-alliance/",
    },
    {
      icon: <Twitter className="text-white" />,
      link: "https://x.com/TheBIGAlliance",
    },
    {
      icon: <Instagram className="text-white" />,
      link: "https://www.instagram.com/thebigalliance/",
    },
  ];

  const navigationLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Privacy Policy", path: "/privacy-policy" },
  ];
  return (
    <footer className="bg-[#059669] text-white py-10 mt-auto ">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          {/* <p className='text-center md:text-left'>
            Your trusted partner in making a difference.
          </p> */}
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-0">
          {navigationLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className="font-medium hover:text-gray-400"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex space-x-4 mb-6 md:mb-0">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <div className="text-center md:text-right">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
