import { appConfig } from "@/config";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link className="border border-white/10" href={"/"}>
      <Image src={"/images/logo.png"} width={40} height={40} alt={appConfig.title} />
    </Link>
  );
};

export default Logo;
