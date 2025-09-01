import React from 'react'
import IncidentsTable from "@/components/incidents-table"
import Header from '@/components/layout/header'
function Page() {
  return (
    <div>
      <Header title="INCIDENTS" />
      <IncidentsTable />
    </div>
  )
}

export default Page