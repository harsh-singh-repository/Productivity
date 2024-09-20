import { checkSubscription } from '@/lib/subscription'
import React from 'react'
import { Info } from '../_components/info';
import { Separator } from '@/components/ui/separator';
import SubscriptionButtonComponent from '../_components/SubscriptionButtonComponent';

const BillingPage = async() => {
  const isPro = await checkSubscription();
  return (
    <div className='w-full'>
       <Info isPro={isPro}/>
       <Separator className='my-2'/>
       <SubscriptionButtonComponent isPro={isPro}/>
    </div>
  )
}

export default BillingPage