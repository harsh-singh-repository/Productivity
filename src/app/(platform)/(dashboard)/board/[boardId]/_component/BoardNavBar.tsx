import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { board } from "@prisma/client";
import { BoardTitleForm } from "./BoardTitleForm";
import BoardOption from "./BoardOption";

interface BoardNavBarProps{
    data : board
}

export const BoardNavBar = async({data}:BoardNavBarProps) => {

  return (
    <>
      <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-2 text-white">
        <BoardTitleForm data={data}/>
        <div className="ml-auto">
          <BoardOption id={data.id}/>
        </div>
      </div>
    </>
  )
}
