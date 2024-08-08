"use client";

import { ElementRef, useRef, useState } from "react";
import { ListWithCard } from "../../../../../../../types";
import { ListHeader } from "./ListHeader";
import { CardForm } from "./CardForm";
import { cn } from "@/lib/utils";

import { CardItem } from "./CardItem";
import { Draggable, Droppable } from "@hello-pangea/dnd";

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
    <Draggable draggableId={data.id} index={index}>
      {(provided)=>(
          <div>
          <li className="shrink-0 h-full w-[272px] select-none" {...provided.draggableProps} ref={provided.innerRef}>
            <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2" {...provided.dragHandleProps}>
              <ListHeader data={data} onAddCard={enableEditing} />
              <Droppable droppableId={data.id} type="card">
                {(provided)=>(
                     <ol className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2",data.cards.length > 0 ? "mt-2"  : "mt-0")} ref={provided.innerRef} {...provided.droppableProps}>
                     {data.cards.map((card)=>(
                         <CardItem index={index} key={card.id} data={card}/>
                    ))}
                    {provided.placeholder}
                  </ol>
                )}
              </Droppable>
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
      )}
      </Draggable>
    </>
  );
};

export default ListItems;
