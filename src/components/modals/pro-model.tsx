"use client";

import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import Payment from "../../../public/payment.svg";
import { useProModal } from "../../../hooks/use-pro-model";
import { Button } from "../ui/button";
import { useAction } from "../../../hooks/use-action";
import { StripeRedirect } from "../../../actions/stripe-redirect";
import { toast } from "sonner";

export const ProModel = () => {
  const proModel = useProModal();
  const {execute,isLoading,} = useAction(StripeRedirect,{
    onSuccess:(data)=>{
      window.location.href = data
    },
    onError:(error)=>{
      toast.error(error)
    }
  });

  const onClick = ()=>{
    execute({})
  }
  return (
    <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src={Payment} alt="PAY_ME" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold">Upgrade to Productify Pro Today</h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>
          <div className="pl-3 flex flex-col gap-3">
            <div className="text-sm list-disc">
              <ul>
                <li>Unlimited Board</li>
                <li>Advance Checklist</li>
                <li>Admin and security features</li>
                <li>And More!</li>
              </ul>
            </div>
            <Button className="w-full" variant="default" onClick={onClick} disabled={isLoading}>
               Upgrade
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
