import React from 'react'
import WeeklyScheduler from '@/components/schedule-table'
import Header from '@/components/layout/header'
function Page() {
  return (
     <div className="flex flex-col gap-4 p-4 max-h-screen">
         <Header title='SCHEDULE' />
          <WeeklyScheduler />
       </div>
  )
}

export default Page