"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

interface formInputProps{
    id: string,
    label?: string,
    type?:string,
    placeholder?:string,
    required?:string,
    disabled?:boolean,
    errors?:Record<string , string[] | undefined>
    className?:string,
    defaultVariable?:string,
    onBlur?: ()=>void,
}

export const FormInput = forwardRef<HTMLInputElement,formInputProps>(({
    id,
    label,
    type,
    placeholder,
    required,
    disabled,
    errors,
    className,
    defaultVariable,
    onBlur,
},ref)=>{
     const {pending} = useFormStatus();
     return(
        <div className="space-y-2">
            <div className="space-y-1">
                {label?(
                    <div>
                        Label
                    </div>
                ):null}
            </div>
        </div>
     )
});

FormInput.displayName = "FormInput"