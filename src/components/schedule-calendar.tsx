"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScheduleItem {
  id: string
  date: number
  month: string
  color: "yellow" | "red"
}

const mockScheduleItems: ScheduleItem[] = [
  { id: "1", date: 28, month: "Thu", color: "yellow" },
  { id: "2", date: 29, month: "Fri", color: "red" },
  { id: "3", date: 31, month: "Sun", color: "red" },
  { id: "4", date: 2, month: "Tue", color: "red" },
  { id: "5", date: 27, month: "Fri", color: "red" },
  { id: "6", date: 25, month: "Sat", color: "yellow" },
]

export default function ScheduleComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 7, 28)) // August 28, 2025
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7, 1)) // August 2025

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-2">
        <h2 className="text-gray-900 mb-3">Schedule</h2>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{formatMonth(currentMonth)}</h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("prev")}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("next")}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Custom Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Dates */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Previous month dates */}
          <div className="text-center py-2">
            <span className="text-sm text-gray-400">25</span>
          </div>
          <div className="text-center py-2">
            <span className="text-sm text-gray-400">26</span>
          </div>
          <div className="text-center py-2">
            <span className="text-sm text-gray-400">27</span>
          </div>

          {/* Current month dates */}
          <div className="text-center py-2">
            <button className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              28
            </button>
          </div>
          <div className="text-center py-2">
            <span className="text-sm text-gray-900">29</span>
          </div>
          <div className="text-center py-2">
            <span className="text-sm text-gray-900">30</span>
          </div>
          <div className="text-center py-2">
            <span className="text-sm text-gray-900">31</span>
          </div>
        </div>
      </div>

      {/* Schedule Items */}
      <div className="px-4 pb-4 space-y-2">
        {mockScheduleItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
            <div
              className={`
              flex flex-col items-center justify-center w-10 h-10 rounded-lg text-white text-xs font-medium
              ${item.color === "yellow" ? "bg-yellow-500" : "bg-red-500"}
            `}
            >
              <span className="text-[10px] leading-none">{item.month}</span>
              <span className="text-sm font-bold leading-none">{item.date}</span>
            </div>
            <div className="flex-1">
              {/* Placeholder for schedule content */}
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
