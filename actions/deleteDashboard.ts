"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function DeleteBoard(id:string){
    await db.board.delete({
        where:{
            id
        }
    })

    revalidatePath("/organisation/org_2iPGFqmmFRUE4jQeYwXCivForUJ")
}