import { ACTION,auditLogs } from "@prisma/client";

export const generateLogMessage = (log:auditLogs)=>{
    const {action,entityTitle,entityType} = log;
    
    switch(action){
      case ACTION.CREATE:
         return `Create ${entityType.toLowerCase()} "${entityTitle}"`
      case ACTION.UPDATE:
         return `Update ${entityType.toLowerCase()} "${entityTitle}"`
      case ACTION.DELETE:
         return `Deleted ${entityType.toLowerCase()} "${entityTitle}"`
      default:
         return `Unknown Action ${entityType.toLowerCase()} "${entityTitle}"`
    }

}