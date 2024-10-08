"use client";

import { useEffect, useState } from "react";
import { ListWithCard } from "../../../../../../../types";
import { ListForm } from "./ListForm";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ListItems from "./ListItems";
import { useAction } from "../../../../../../../hooks/use-action";
import { updateListOrder} from "../../../../../../../actions/update-listorder";
import { toast } from "sonner";
import { updateCardOrder } from "../../../../../../../actions/update-card-order";

interface ListContainerProps {
  data: ListWithCard[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const [orderedData, setOrderedData] = useState(data);

const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });  

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if Droped into same postion
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

// User moves a list
if (type === "list"){
  const items = reOrder(orderedData, source.index, destination.index).map(
    (item, index) => ({ ...item, order: index})
   );

   setOrderedData(items);
   executeUpdateListOrder({items,boardId});
  }
    
    // user moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];

      // Source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      // Check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reOrder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        
        executeUpdateCardOrder({boardId:boardId,items:reorderedCards})
      } else {
        // Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        // Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // Update the order for each card in the destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({boardId:boardId,items:destList.cards})
      }
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" type="lists" direction="horizontal">
          {(provided) => (
            <ol
              {...provided.droppableProps}
              className="flex gap-x-3 h-full"
              ref={provided.innerRef}
            >
              {orderedData.map((list, index) => {
                return <ListItems key={list.id} index={index} data={list} />;
              })}
              {provided.placeholder}
              <ListForm />
              <div className="flex shrink-0 w-1" />
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
