import { ClerkProvider } from "@clerk/nextjs"


const PlatformLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
      <ClerkProvider appearance={{
        variables: {
          colorPrimary: "#2CAB5B",
          colorText: "black"
        }
      }}>
          <div className="flex item-center justify-center my-10">
            {children}
          </div>
      </ClerkProvider>
    </>
  )
}

export default PlatformLayout;