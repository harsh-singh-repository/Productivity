import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
    <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between text-black">
          <Logo/>
          <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
              <Button>
                  <Link href={"/sign-in"}>
                     Login
                  </Link>
              </Button>
              <Button size={"sm"} variant={"outline"}>
                  Try for free
              </Button>
          </div>
    </div>
   </div>
  )
}

export default Navbar;