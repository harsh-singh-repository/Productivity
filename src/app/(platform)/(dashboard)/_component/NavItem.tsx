"use client";

import { AccordionTrigger, AccordionItem } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { AccordionContent } from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type organisation = {
    id: string,
    slug: string,
    imageUrl: string,
    name: string,
}

interface NavItemProp {
    isExpanded: boolean,
    isActive: boolean,
    organisation: organisation,
    onExpand: (id: string) => void,
}

const NavItem = ({ isExpanded, isActive, organisation, onExpand }: NavItemProp) => {
    const router = useRouter();
    const pathname = usePathname();
    const routes = [
        {
            label: "Boards",
            icon: <Layout className="h-4 w-4 mr-2" />,
            href: `/organisation/${organisation.id}`
        },
        {
            label: "Activity",
            icon: <Activity className="h-4 w-4 mr-2" />,
            href: `/organisation/${organisation.id}/activity`
        },
        {
            label: "Settings",
            icon: <Settings className="h-4 w-4 mr-2" />,
            href: `/organisation/${organisation.id}/settings`
        },
        {
            label: "Credit Card",
            icon: <CreditCard className="h-4 w-4 mr-2" />,
            href: `/organisation/${organisation.id}/billing`
        },
    ]

    const onClick = (href: string) => {
        router.push(href);
    };

    return (
        <>
            <AccordionItem value={organisation.id} className="border-none">
                <AccordionTrigger onClick={() => onExpand(organisation.id)} className={cn("flex item-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500 transition text-start no-underline hover:no-underline", isActive && !isExpanded && "bg-green-500/10 text-green-700")}>
                    <div className="flex items-center gap-x-2">
                        <div className="w-7 h-7 relative">
                            <Image
                                fill
                                src={organisation.imageUrl}
                                alt="image"
                                className="rounded-sm object-cover"
                            />
                        </div>
                        <span className="font-medium">
                            {organisation.name}
                        </span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1 text-neutral-700">
                    {routes.map((route) => (
                        <Button key={route.href} size={"sm"} onClick={() => onClick(route.href)} className={cn("w-full font-normal justify-start pl-10 mb-1", pathname === route.href && "bg-green-500/10 text-green-700")} variant={"ghost"}>
                            {route.icon}
                            {route.label}
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </>
    )
}

export default NavItem;

NavItem.Skeleton = function SkeletonNavItem() {
    return (
        <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 relative shrink-0">
                <Skeleton className="h-full w-full absolute" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    )
}