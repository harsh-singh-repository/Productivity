import { auth } from "@clerk/nextjs/server";
import { OrgControl } from "./_components/OrgControl";
import { startCase } from "lodash";

const organisationIdLayout = ({children}:{children:React.ReactNode}) => {
  return (
     <>
          <OrgControl/>
          {children}
     </>
  )
}

export default organisationIdLayout;