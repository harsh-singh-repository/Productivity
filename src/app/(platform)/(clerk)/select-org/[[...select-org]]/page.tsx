import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganisationPage(){
    return(
        <div>
             <OrganizationList hidePersonal afterSelectOrganizationUrl="/organisation/:id"/>
        </div>
    )
} 