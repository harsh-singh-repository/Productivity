"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "../../../../types";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from "lucide-react";
import { useAction } from "../../../../hooks/use-action";
import { copyCard } from "../../../../actions/copy- card";
import { deleteCard } from "../../../../actions/delete-card";
import { useParams } from "next/navigation";
import { useCardModal } from "../../../../hooks/use-card-model";
import { toast } from "sonner";

interface ActionProps {
  data: CardWithList;
}

const Action = function Action({ data }: ActionProps){
  const params = useParams();

  const cardModel = useCardModal();
  
  const { execute: executeCopyCard, isLoading: isLoadingCopy } =
    useAction(copyCard,{
      onSuccess:(data)=>{
        toast.success(`Card ${data.title} copied`);
        cardModel.onClose();
      },
      onError:(error)=>{
        toast.error(error);
      }
    });

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } =
    useAction(deleteCard,{
      onSuccess:(data)=>{
        toast.success(`Card ${data.title} deleted`);
        cardModel.onClose();
      },
      onError:(error)=>{
        toast.error(error);
      }
    });

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id:data.id,
      boardId,
    })
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <>
      <div className="space-y-2 mt-2">
        <p className="text-xs font-semibold">Actions</p>
        <Button
          variant={"gray"}
          className="w-full justify-start"
          size={"inline"}
          onClick={onCopy}
          disabled={isLoadingCopy}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button
          variant={"gray"}
          className="w-full justify-start"
          size={"inline"}
          onClick={onDelete}
          disabled={isLoadingDelete}
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </>
  );
};

Action.displayName = 'Action';

// Define Action.Skeleton as a named function
Action.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4" />
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
    </div>
  );
};

// Assign display name for Action.Skeleton
(Action.Skeleton as React.FC).displayName = 'ActionSkeleton';

export default Action;
