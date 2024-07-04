"use client"

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const FormButton = () => {

    const {pending} = useFormStatus();

  return (
    <div>
        <Button type="submit" disabled={pending}>
          Submit
        </Button>
    </div>
  )
}

export default FormButton;