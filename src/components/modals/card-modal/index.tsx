"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "../../../../hooks/use-card-model";
import { useQuery } from "@tanstack/react-query";
import { CardWithList } from "../../../../types";
import { fetcher } from "@/lib/fetcher";
import { Header } from "./Header";
import { Description } from "./Description";
import { Action } from "./action";
import { auditLogs } from "@prisma/client";
import { Activity } from "./activity";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<auditLogs[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
            <div className="col-span-3">
                <div className="w-full space-y-6">
                    {!cardData ? <Description.Skeleton/> : <Description data={cardData}/>}
                    {!auditLogsData ? <Activity.Skeleton/> : <Activity items={auditLogsData}/>}
                </div>
            </div>
            {!cardData ? <Action.Skeleton/> : <Action data={cardData}/>}
        </div>
      </DialogContent>
    </Dialog>
  );
};
