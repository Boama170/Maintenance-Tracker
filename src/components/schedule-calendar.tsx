"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function Schedule() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md shadow-xl sm w-[30vw]"
      captionLayout="dropdown"
    />
  )
}
