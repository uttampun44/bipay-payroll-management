  "use client"
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

  const path = usePathname();

  return (
    <header className="bg-[#F0F4FC]">
      <div className="header max-w-[1440px] mx-auto py-6 w-full flex items-center justify-between">
        <div className="headingTest text-2xl font-bold">
          <Link href="/" className="text-blue-500">
            BIPAY
          </Link>
         
        </div>
        <div className="page-link">
          <nav>
            <div className="nav-menu flex gap-x-2.5 text-base font-normal"> 
                <Link href="/" className={clsx(" p-1 rounded-md",path == "/" ? "bg-white text-blue-700 border-2" : 'text-black bg-none')}>Sign In </Link>
                <Link href="/login" className={clsx(" p-1 rounded-md",path == "/login" ? "bg-white text-blue-700 border-2" : 'text-black bg-none')}>Sign Up </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
