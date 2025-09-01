import { SectionCards } from "@/components/section-cards"
import { ChartLineMultiple } from "@/components/chart-line-multiple"
import { IncidentsCard }  from "@/components/incidents-card"
import ScheduleCalendar  from "@/components/schedule-calendar"
import Header from "@/components/layout/header"

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4  mb-2 ">
      <Header title="DASHBOARD" />
      <div className="flex flex-col gap-1">
        <SectionCards />
        <div className="flex">
          <div className="container ms-4 flex flex-col w-12/15 gap-4">
            <ChartLineMultiple />
          </div>
          <div className="ms-2 w-1/3 -mt-2"><ScheduleCalendar /></div>
        </div>
       
        
      </div>
      <div className="container ms-4 -mt-88">
          <IncidentsCard />
        </div>
    </div>
  )
}
