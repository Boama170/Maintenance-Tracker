"use client"
import * as React from "react"
import { Home, Settings, Calendar, Store, FileText, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    { title: "Home", url: "/", icon: Home },
    { title: "Machines", url: "/machines", icon: Settings },
    { title: "Schedule", url: "/schedule", icon: Calendar },
    { title: "Stores", url: "/stores", icon: Store },
    { title: "Report", url: "/report", icon: FileText },
    { title: "Incidents", url: "/incidents", icon: AlertTriangle },
    { title: "Production Output", url: "/production-output", icon: TrendingUp },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-3">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={`font-medium flex items-center gap-2 ${pathname === item.url ? "bg-accent text-accent-foreground" : ""}`}
                  >
                    <item.icon className="size-4" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
