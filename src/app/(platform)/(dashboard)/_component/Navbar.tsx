import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { Plus } from "lucide-react"
import MobileSidebar from "./MobileSidebar"


const Navbar = () => {
    const {orgId} = auth();
  return (
      <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
            <MobileSidebar/>
        <div className="flex item-center gap-x-4">
             <div className="hidden md:flex">
                 <Logo/>
             </div>
             <Button size={"sm"} className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                 Create
             </Button>
             <Button size={"sm"} className="rounded-sm  md:hidden h-auto py-1.5 px-2">
                 <Plus className="h-4 w-4"/>
             </Button>
         </div>
         <div className="ml-auto flex item-center gap-x-2">
            <OrganizationSwitcher hidePersonal afterCreateOrganizationUrl={"/organisation/:id"} afterLeaveOrganizationUrl="/select-org" afterSelectOrganizationUrl={`/organisation/:id`} appearance={{
                elements:{
                    rootBox:{
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center"
                    }
                }
            }}/>
            <UserButton afterSignOutUrl="/" appearance={{
                elements:{
                    avatarBox:{
                        height: "30",
                        width: "30"
                    }
                }
            }}/>
         </div>
    </nav>
  )
}

export default Navbar