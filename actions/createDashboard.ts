"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {z} from "zod";

export type state = {
   errors?:{
      title?: string[],
   },
   message?: string | null
}

const  CreateBoard = z.object({
    title: z.string().min(3,{
        message: "Minimum length of 3 letters is required."
    }),
})

export async function create(prevState: state,formData:FormData){
     const validatedField = CreateBoard.safeParse({
        title : formData.get("title"),
     })

     if(!validatedField.success){
        return{
            errors: validatedField.error.flatten().fieldErrors,
            message: "Message field"
        }
     }

     const {title} = validatedField.data;
    
     try {
        await db.board.create({
            data:{
                title,
            }
         })
     } catch (error) {
        return{
            message:"Database Error"
        }
     }

    revalidatePath("organisation/org_2iPGFqmmFRUE4jQeYwXCivForUJ");
    redirect("/organisation/org_2iPGFqmmFRUE4jQeYwXCivForUJ");
}