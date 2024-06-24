import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';

const headingFont = localFont({
    src: "../../public/Fonts/CalSans-SemiBold.otf"
})

const Logo = () => {
  return (
    <Link href={"/"}>
        <div className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex'>
             <Image height={30} width={30} src="/Logo.svg" alt='logo'/>
             <p className={cn('text-lg text-neutral-700 pb-1',headingFont.className)}>Productify</p>
        </div>
    </Link>
  )
}

export default Logo;