"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";

const DeleteBtn = () => {
    const {pending} = useFormStatus();
  return (
      <div>
        <Button variant={"destructive"} size={"sm"} disabled={pending}>
            <Trash className="h-3 w-3"/>
        </Button>
      </div>
  )
}

export default DeleteBtn