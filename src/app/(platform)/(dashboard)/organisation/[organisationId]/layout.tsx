import { OrgControl } from "./_components/OrgControl";


const organisationIdLayout = ({children}:{children:React.ReactNode}) => {
  return (
     <>
          <OrgControl/>
          {children}
     </>
  )
}

export default organisationIdLayout;