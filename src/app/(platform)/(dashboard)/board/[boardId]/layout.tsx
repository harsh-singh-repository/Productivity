import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { BoardNavBar } from "./_component/BoardNavBar";

const BoardIdLayout = async({children,params}:{children:React.ReactNode,params:{boardId:string}}) =>{
   const {orgId} = auth();

   if(!orgId){
    redirect("/select-org")
   }

   const board = await db.board.findUnique({
    where:{
        id:params.boardId,
        orgId,
    }
   });

   if(!board){
     notFound();
   }
    
   return(
    <div className="relative h-[100vh] bg-no-repeat bg-cover bg-center" style={{backgroundImage:`url(${board.imageFullUrl})`}}>
      <BoardNavBar data={board}/>
      <div className="absolute inset-0 bg-black-10"/>
        <main className="relative pt-28 h-full">
           {children}
        </main>
    </div>
   )
}

export default BoardIdLayout;