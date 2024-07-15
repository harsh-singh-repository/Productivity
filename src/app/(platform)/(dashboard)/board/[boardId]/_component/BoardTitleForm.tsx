"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { updateBoard } from "../../../../../../../actions/update-board/index";
import { useAction } from "../../../../../../../hooks/use-action";
import { toast } from "sonner";

interface BoardTitleFromProps {
  data: board;
}

export const BoardTitleForm = ({ data }: BoardTitleFromProps) => {
  
  const {execute} = useAction(updateBoard,{
    onSuccess:(data)=>{
      toast.success(`Board ${data.title} updated!`),
      setTitle(data.title),
      disableEditing();
    },
    onError:(error)=>{
      toast.error(error)
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [title,setTitle] = useState(data.title);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    //to-do focus input
    setIsEditing(true);
    setTimeout(()=>{
        inputRef.current?.focus();
        inputRef.current?.select();
  })
  };

  const disableEditing = () => {
    setIsEditing(false);
  };
   
  const onSubmit = (formdata:FormData) =>{
    const title = formdata.get("title")as string;
    execute({title,id:data.id})
  }

  const onBlur = () =>{
    formRef.current?.requestSubmit();
  }

  if (isEditing) {
    return (
      <>
        <form action={onSubmit} className="flex items-center gap-x-2" ref={formRef}>
          <FormInput
            ref={inputRef}
            id="title"
            onBlur={onBlur}
            defaultValue={title}
            className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
          />
        </form>
      </>
    );
  }

  return (
    <>
      <Button variant={"transparent"} onClick={enableEditing}>
        {title}
      </Button>
    </>
  );
};
