import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/assets/logo.png"
        width={70}
        height={70}
        alt="Branding logo"
      />
    </Link>
  );
};
