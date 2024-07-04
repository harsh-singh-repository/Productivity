"use client"

import { Button } from "@/components/ui/button"
import { create } from "../../../../../../actions/createDashboard"
import { useFormState } from "react-dom"
import FormInput from "./FormInput"
import FormButton from "./FormButton"


export const Form = ()=>{
    const initialState = {message: "",errors:{}}
    const [state,dispatch] = useFormState(create,initialState);
   return(
       <form action={dispatch}>
         <div className="flex flex-col space-y-2">
            <FormInput error={state?.errors}/>
          </div>
            <FormButton/>
       </form>
   )
}

