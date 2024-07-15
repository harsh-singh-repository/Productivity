import { auth } from "@clerk/nextjs/server";
import { OrgControl } from "./_components/OrgControl";
import { startCase } from "lodash";

export async function generateMetaData(){
   const {orgSlug} = auth();

   return{
    title: startCase(orgSlug || "orgnization")
   };
};

const organisationIdLayout = ({children}:{children:React.ReactNode}) => {
  return (
     <>
          <OrgControl/>
          {children}
     </>
  )
}

export default organisationIdLayout;