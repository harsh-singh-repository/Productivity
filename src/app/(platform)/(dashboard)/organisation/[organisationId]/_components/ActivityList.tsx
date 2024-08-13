import { ActivityItems } from "@/components/modals/card-modal/activity-items";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export const ActivityList = async() => {
   
    const {orgId} = auth();
     
    if(!orgId){
        redirect("/select-org")
    }

    const auditLogs = await db.auditLogs.findMany({
        where:{
            orgId
        }
    })

  return (
    <div>
         <div className="space-y-4 mt-4">
             <p className="hidden last:block text-xs text-center text-muted-foreground">
                No activity found inside this organization
             </p>
             {auditLogs.map((log)=>(
                <ActivityItems key={log.id} data={log}/>
             ))}
         </div>
    </div>
  )
}

ActivityList.Skeleton = function ActivityListSkeleton(){
    return(
       <ol className='space-y-4 mt-4'>
         <Skeleton className='w-[80%] h-14'/>
         <Skeleton className='w-[50%] h-14'/>
         <Skeleton className='w-[70%] h-14'/>
         <Skeleton className='w-[80%] h-14'/>
         <Skeleton className='w-[85%] h-14'/>
       </ol>
    )
 }
