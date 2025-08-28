"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  day: number
  startTime: number
  endTime: number
  color: string
}

const DAYS = [
  { name: "Mon", date: 25 },
  { name: "Tue", date: 26 },
  { name: "Wed", date: 27 },
  { name: "Thu", date: 28 },
  { name: "Fri", date: 29 },
  { name: "Sat", date: 30 },
  { name: "Sun", date: 31 },
]

const TIME_SLOTS = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]

export default function WeeklyScheduler() {
  const [events, setEvents] = useState<Event[]>([
    { id: "1", title: "Meeting", day: 27, startTime: 9, endTime: 10, color: "bg-green-400" },
    { id: "2", title: "Lunch", day: 28, startTime: 11, endTime: 12, color: "bg-yellow-400" },
    { id: "3", title: "Call", day: 27, startTime: 13, endTime: 14, color: "bg-red-400" },
    { id: "4", title: "Workshop", day: 30, startTime: 10, endTime: 11, color: "bg-blue-400" },
    { id: "5", title: "Review", day: 29, startTime: 16, endTime: 17, color: "bg-gray-400" },
  ])

  const [selectedSlot, setSelectedSlot] = useState<{ day: number; time: number } | null>(null)

  const handleCellClick = (day: number, timeIndex: number) => {
    setSelectedSlot({ day, time: timeIndex + 8 })
  }

  const addNewEvent = () => {
    if (selectedSlot) {
      const newEvent: Event = {
        id: Date.now().toString(),
        title: "New Event",
        day: selectedSlot.day,
        startTime: selectedSlot.time,
        endTime: selectedSlot.time + 1,
        color: "bg-blue-400",
      }
      setEvents([...events, newEvent])
      setSelectedSlot(null)
    }
  }

  const getEventForSlot = (day: number, timeIndex: number) => {
    return events.find((event) => event.day === day && event.startTime === timeIndex + 8)
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm ">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="secondary" size="sm" className="gap-2 bg-stone-400 rounded-2xl cursor-pointer text-[#11204B] hover:text-white hover:bg-[#11204B]">
            New
            <Plus className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold">August 2025</h2>
          <Button variant="ghost" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Button size="sm" className="bg-red-500 rounded-2xl hover:bg-red-600 text-white">
          Submit
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Days Header */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-3"></div>
            {DAYS.map((day) => (
              <div key={day.date} className="p-3 text-center border-l">
                <div className="font-medium text-sm">
                  {day.name} {day.date}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {TIME_SLOTS.map((time, timeIndex) => (
            <div key={time} className="grid grid-cols-8 border-b">
              <div className="p-3 text-sm font-medium text-gray-600 border-r">{time}</div>
              {DAYS.map((day) => {
                const event = getEventForSlot(day.date, timeIndex)
                const isSelected = selectedSlot?.day === day.date && selectedSlot?.time === timeIndex + 8

                return (
                  <div
                    key={`${day.date}-${timeIndex}`}
                    className={cn(
                      "p-3 border-l min-h-[60px] cursor-pointer hover:bg-gray-50 relative",
                      isSelected && "bg-blue-50",
                    )}
                    onClick={() => handleCellClick(day.date, timeIndex)}
                  >
                    {event && (
                      <div
                        className={cn("absolute inset-1 rounded px-2 py-1 text-xs font-medium text-white", event.color)}
                      >
                        {event.title}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Add Event Button */}
      {selectedSlot && (
        <div className="p-4 border-t bg-gray-50">
          <Button onClick={addNewEvent} size="sm">
            Add Event at {TIME_SLOTS[selectedSlot.time - 8]} on {DAYS.find((d) => d.date === selectedSlot.day)?.name}{" "}
            {selectedSlot.day}
          </Button>
        </div>
      )}
    </div>
  )
}
