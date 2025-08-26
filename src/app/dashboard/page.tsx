import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SectionCards } from "@/components/section-cards"

export default function Page() {
  const cards = [
    { title: "Total Machines", url: "#" },
    { title: "Maintenance", url: "#" },
    { title: "Upcoming Schedule", url: "#" },
    { title: "Incidents", url: "#" },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full flex-col gap-6 p-8">
          <div className="flex items-center justify-between">
            <div className="w-full h-[6rem] p-4 bg-foreground">
              <h1 className="text-white text-2xl font-bold mt-2">DASHBOARD</h1>
            </div>
            <SidebarTrigger className="lg:hidden" />
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, index) => (
              <SectionCards
                key={index}
                title={card.title}
                url={card.url}
                className="bg-gray-300 p-4 rounded-lg flex flex-col justify-between min-h-[10rem]"
              >
                <div className="text-lg font-semibold">{card.title}</div>
                <a
                  href={card.url}
                  className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
                >
                  Learn More
                </a>
              </SectionCards>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
