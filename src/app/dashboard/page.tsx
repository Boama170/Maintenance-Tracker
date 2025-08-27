import { SectionCards } from "@/components/section-cards"
import { ChartLineMultiple } from "@/components/chart-line-multiple"
import { IncidentsCard }  from "@/components/incidents-card"
import { Schedule } from "@/components/schedule-calendar"

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div className="w-[99%] h-[6rem] p-6 bg-foreground">
          <h1 className="text-white text-2xl italic mt-2">DASHBOARD</h1>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <SectionCards />
        <div className="flex">
          <div className="container ms-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ChartLineMultiple />
          </div>
          <Schedule />
        </div>
       
        <div className="container ms-4">
          <IncidentsCard />
        </div>
      </div>
    </div>
  )
}
