"use client";

import { ListWithCard } from "../../../../../../../types";
import { ListHeader } from "./ListHeader";

interface listItemProps{
    data:ListWithCard,
    index:number
}

const ListItems = ({data,index}:listItemProps) => {
  return (
      <>
        <div>
            <li className="shrink-0 h-full w-[272px] select-none">
               <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                   <ListHeader data={data}/>
               </div> 
            </li>
        </div>
      </>
  )
}

export default ListItems