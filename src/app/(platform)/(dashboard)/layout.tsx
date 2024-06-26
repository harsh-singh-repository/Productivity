import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./_component/Navbar"

const DashboardLayout = ({children}:{children:React.ReactNode})=>{
    return(
        <>
        <ClerkProvider appearance={{
        variables: {
          colorPrimary: "#2CAB5B",
          colorText: "black"
        }
      }}>
          <div className="h-full">
            <Navbar/>
              {children}
          </div>
          </ClerkProvider>
        </>
    )
}

export default DashboardLayout;