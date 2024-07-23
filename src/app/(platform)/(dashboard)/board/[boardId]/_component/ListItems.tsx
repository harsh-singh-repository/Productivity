"use client";

import { ElementRef, useRef, useState } from "react";
import { ListWithCard } from "../../../../../../../types";
import { ListHeader } from "./ListHeader";
import { CardForm } from "./CardForm";
import { cn } from "@/lib/utils";
import { CardItem } from "./CardItem";

interface listItemProps {
  data: ListWithCard;
  index: number;
}

const ListItems = ({ data, index }: listItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const textAreaRef = useRef<ElementRef<"textarea">>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  return (
    <>
      <div>
        <li className="shrink-0 h-full w-[272px] select-none">
          <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
            <ListHeader data={data} onAddCard={enableEditing} />
            <ol className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2",data.cards.length > 0 ? "mt-2"  : "mt-0")}>
                {data.cards.map((card)=>(
                  <CardItem index={index} key={card.id} data={card}/>
                ))}
            </ol>
            <CardForm
              ref={textAreaRef}
              enableEditing={enableEditing}
              isEditing={isEditing}
              disableEditing={disableEditing}
              listId={data.id}
            />
          </div>
        </li>
      </div>
    </>
  );
};

export default ListItems;
