"use client";

import React, { useRef, useState, ElementRef } from "react";
import { ListWrapper } from "./ListWrapper";
import { Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "../../../../../../../hooks/use-action";
import { createList } from "../../../../../../../actions/create-list";
import { toast } from "sonner";

export const ListForm = () => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const params = useParams();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const {execute,fieldErrors} = useAction(createList,{
      onSuccess:(data)=>{
          toast.success(`List ${data.title} is creted`);
          disableEditing();
          router.refresh();
      },
      onError:(error)=>{
        toast.error(error);
      }
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (fromData:FormData) =>{
    const title = fromData.get("title") as string;
    const boardId = fromData.get("boardId") as string;

    execute({title,boardId})
  }

  if (isEditing) {
    return (
      <>
        <ListWrapper>
          <form
            action={onSubmit}
            ref={formRef}
            className="w-full rounded-md bg-white space-y-2 shadow-md p-2"
          >
            <FormInput
              ref={inputRef}
              errors={fieldErrors}
              id="title"
              className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
              placeholder="Enter List Title"
            />
            <input hidden value={params.boardId} name="boardId"/>
            <div className="flex items-center gap-x-1">
                 <FormSubmit>
                    Add List
                 </FormSubmit>
                 <Button onClick={disableEditing} size={"sm"} variant={"ghost"}>
                    <X className="h-5 w-5"/>
                 </Button>
            </div>
          </form>
        </ListWrapper>
      </>
    );
  }

  return (
    <>
      <ListWrapper>
        <button
          className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
          onClick={enableEditing}
        >
          <Plus className="h-4 w-4 mr-2"/>
          Add a list
        </button>
      </ListWrapper>
    </>
  );
};