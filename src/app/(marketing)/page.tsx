import { Button } from '@/components/ui/button';
import { Medal } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import localFont from "next/font/local";
import { cn } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';

const headingFont = localFont({
   src: "../../../public/Fonts/CalSans-SemiBold.otf"
})

const  MarketingPage = () => {
   const {userId,orgId} = auth();
  return (
       <div className="flex items-center justify-center flex-col text-black">
           <div className={cn("flex items-center justify-center flex-col", headingFont.className)}>
              <div className='mb-4 flex items-center border shadow-sm p-4 bg-amber-100'>
                <Medal className='h-6 w-6 mr-2'/>
                No1 task management.
              </div>
              <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>Prodctivity on its Edges.</h1>
              <div className="text-2xl md:text-6xl text-green-600 px-4 p-2 rounded-md">
                 Productify
              </div>
           </div>
           <div className='text-sm md:text-xl text-neutral-400 mt-4 max-w-s md: max-w-2xl text-center mx-auto'>
              Collaborate, Manage Project and reach at the edge of productivity. Organize your projects effortlessly with our No 1. task management app. Collaborate, track progress, and stay productive all in one place!
           </div>
           <Button className='mt-6' size={"lg"} >
           <Button>
                  {userId ? (
                      <Link href={`/organisation/${orgId}`}>
                         DashBoard
                      </Link>
                  ):(
                    <Link href={`/sign-in`}>
                        Login
                    </Link>
                  )}
              </Button>
           </Button>
       </div>
  )
}

export default  MarketingPage;