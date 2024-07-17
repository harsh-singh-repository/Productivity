"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteList } from "./schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const {id,boardId} = data;

  
  let list;

  try {
    list = await db.list.delete({
     where:{
        id,
        boardId,
        board:{
          orgId
        }
     }
    });
  } catch (error) {
    return {
      error: "Failed to Delete",
    };
  }

  revalidatePath(`/organisation/${orgId}`);
  return({data:list});
};

export const deleteList = createSafeAction(DeleteList, handler);
