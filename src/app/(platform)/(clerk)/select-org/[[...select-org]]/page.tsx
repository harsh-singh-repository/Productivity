import { organisationList } from "@clerk/nextjs";

export default function CreateOrganisationPage(){
    return(
        <div>
             <organisationList hidePersonal afterSelectorganisationUrl="/organisation/:id" afterCreateorganisationUrl={"/organisation/:id"}/>
        </div>
    )
} 