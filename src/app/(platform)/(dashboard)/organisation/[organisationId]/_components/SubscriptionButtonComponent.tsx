"use client"

import { Button } from "@/components/ui/button"
import { useAction } from "../../../../../../../hooks/use-action"
import { StripeRedirect } from "../../../../../../../actions/stripe-redirect"
import { toast } from "sonner"
import { useProModal } from "../../../../../../../hooks/use-pro-model"

interface SubscriptionButtonComponentProps{
    isPro:boolean
}

const SubscriptionButtonComponent = ({isPro}:SubscriptionButtonComponentProps) => {

    const proModel = useProModal();

    const {execute,isLoading} = useAction(StripeRedirect,{
        onSuccess:(data)=>{
            window.location.href = data;
        },
        onError:(error)=>{
           toast.error(error)
        }
    })

    const onClick = ()=>{
        if(isPro){
            execute({})
        }
        else{
            proModel.onOpen();
        }
    }

  return (
   <>
      <Button variant={"default"} onClick={onClick}>
        {isPro ? "Manage Subscription" : "Upgrade to Pro"}
      </Button>
   </>
  )
}

export default SubscriptionButtonComponent