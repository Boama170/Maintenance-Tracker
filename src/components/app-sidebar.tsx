"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, IncidentsIcon, ScheduleIcon, StoreIcon, ReportIcon, MachinesIcon, OutputIcon } from "@/components/ui/icons"
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
import { Home } from "lucide-react"

const data = {
  navMain: [
    { title: "Dashboard", url: "/", icon: HomeIcon },
    { title: "Machines", url: "/machines", icon: MachinesIcon },
    { title: "Schedule", url: "/schedule", icon: ScheduleIcon },
    { title: "Stores", url: "/stores", icon: StoreIcon },
    { title: "Report", url: "/report", icon: ReportIcon },
    { title: "Incidents", url: "/incidents", icon: IncidentsIcon },
    { title: "Production Output", url: "/production-output", icon: OutputIcon },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props} className="w-54">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">SecPrint</span>
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
                    className={`font-medium flex items-center gap-2`}
                  >
                    <item.icon/>
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
