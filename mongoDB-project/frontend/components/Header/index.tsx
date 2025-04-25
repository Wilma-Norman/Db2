import Link from "next/link";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { auth } from "@/lib/auth";
import LogOutButton from "../LogOut";

const Header = async () => {
  const user = await auth.getAccessToken();
  return (
    <header className="flex h-16 w-full items-center justify-between gap-4 px-4 py-2 md:px-20  shadow-lg">
      <Link href="/" className="text-2xl font-bold flex items-center text-black">
        Chatter
      </Link>
      {user ? (
        <div className="flex gap-4">
          <Link href="/create" className="button-primary bg-[#C86E7A] text-white p-1.5 rounded-lg hover:bg-rose-300">
            Create
          </Link>
          <LogOutButton />
        </div>
      ) : (
        <Link href="/auth/login" className="button-primary bg-[#C86E7A] p-1.5 rounded-lg hover:bg-rose-300">
          Log in
        </Link>
      )}
    </header>
  );
};

export default Header;
