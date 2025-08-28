import React from 'react'
import WeeklyScheduler from '@/components/schedule-table'
function Page() {
  return (
     <div className="flex flex-col gap-4 p-4 max-h-screen">
         <div className="flex items-center justify-between">
           <div className="w-[99%] h-[6rem] p-6 bg-foreground">
             <h1 className="text-white text-2xl italic mt-2">SCHEDULE</h1>
           </div>
         </div>
          <WeeklyScheduler />
       </div>
  )
}

export default Page