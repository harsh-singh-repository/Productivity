"use client";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface formSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "Default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: formSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        disabled={pending || disabled}
        type="submit"
        variant={"default"}
        size="sm"
        className={cn(className)}
      >
        {children}
      </Button>
    </>
  );
};
