"use client"

import { Input } from "@/components/ui/input";
import {useFormStatus } from "react-dom"

interface formInputProps{
    error?:{
        title?:string[],
    }
}

const FormInput = ({error}:formInputProps) => {
    const {pending} = useFormStatus();
  return (
    <div>
         <Input type="text" name="title" id='title' required placeholder='Enter the board title'
             disabled={pending}
            />
            {error?.title?(
          <div>
            {error.title.map((error:string)=>{
               return(
                     <p key={error} className="text-rose-500">{error}</p>
               )

            })}
          </div>
        ):null}
    </div>
  )
}

export default FormInput