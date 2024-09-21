"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { type SidebarNavItem } from "@/app/(admin)/types";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "../../../components/icons";
import { SidebarNav } from "./sidebar-nav";

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {
  storeId: string;
  children: React.ReactNode;
}

export function DashboardSidebar({
  storeId,
  children,
  className,
  ...props
}: DashboardSidebarProps) {
  const segments = useSelectedLayoutSegments();

  const sidebarNav: SidebarNavItem[] = [
    {
      title: "Dashboard",
      href: `/admin`,
      icon: "dashboard",
      active: segments.length === 0,
    },
    {
      title: "Categories",
      href: `/admin/categories`,
      icon: "cart",
      active: segments.includes("categories"),
    },
    {
      title: "Attributes",
      href: `/admin/attributes`,
      icon: "cart",
      active: segments.includes("attributes"),
    },
    {
      title: "Types",
      href: `/admin/types`,
      icon: "product",
      active: segments.includes("types"),
    },
    {
      title: "Products",
      href: `/admin/products`,
      icon: "product",
      active: segments.includes("products"),
    },
    {
      title: "Customers",
      href: `#`,
      icon: "avatar",
      active: segments.includes("customers"),
    },
    {
      title: "Analytics",
      href: `#`,
      icon: "analytics",
      active: segments.includes("analytics"),
    },
    {
      title: "Settings",
      href: `#`,
      icon: "settings",
      active: segments.includes("settings"),
    },
  ];

  return (
    <aside className={cn("h-screen w-full", className)} {...props}>
      <div className="hidden h-[3.55rem] items-center border-b border-border/60 px-4 lg:flex lg:px-6">
        <Link
          href="/"
          className="flex w-fit items-center font-heading tracking-wider text-foreground/90 transition-colors hover:text-foreground"
        >
          <Icons.logo className="mb-1 mr-2 size-7" aria-hidden="true" />
          {siteConfig.name}
        </Link>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)] px-3 py-2.5 lg:px-5 border-r border-border/60 ">
        <SidebarNav items={sidebarNav} className="p-1 pt-1" />
      </ScrollArea>
    </aside>
  );
}
