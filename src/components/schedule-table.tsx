"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  description?: string
  day: number
  startTime: number
  endTime: number
  color: string
  type: "meeting" | "task" | "appointment" | "other"
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

const EVENT_COLORS = [
  { name: "Blue", value: "bg-blue-400", hover: "hover:bg-blue-500" },
  { name: "Green", value: "bg-green-400", hover: "hover:bg-green-500" },
  { name: "Yellow", value: "bg-yellow-400", hover: "hover:bg-yellow-500" },
  { name: "Red", value: "bg-red-400", hover: "hover:bg-red-500" },
  { name: "Purple", value: "bg-purple-400", hover: "hover:bg-purple-500" },
  { name: "Gray", value: "bg-gray-400", hover: "hover:bg-gray-500" },
]

export default function WeeklyScheduler() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly standup",
      day: 27,
      startTime: 9,
      endTime: 10,
      color: "bg-green-400",
      type: "meeting",
    },
    {
      id: "2",
      title: "Lunch Break",
      description: "Team lunch",
      day: 28,
      startTime: 11,
      endTime: 12,
      color: "bg-yellow-400",
      type: "other",
    },
    {
      id: "3",
      title: "Client Call",
      description: "Project review",
      day: 27,
      startTime: 13,
      endTime: 14,
      color: "bg-red-400",
      type: "appointment",
    },
    {
      id: "4",
      title: "Workshop",
      description: "Training session",
      day: 30,
      startTime: 10,
      endTime: 11,
      color: "bg-blue-400",
      type: "meeting",
    },
    {
      id: "5",
      title: "Code Review",
      description: "PR review",
      day: 29,
      startTime: 16,
      endTime: 17,
      color: "bg-gray-400",
      type: "task",
    },
  ])

  const [selectedSlot, setSelectedSlot] = useState<{ day: number; time: number } | null>(null)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState("August 2025")

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    color: "bg-blue-400",
    type: "meeting" as Event["type"],
    startTime: 8,
    endTime: 9,
  })

  const handleCellClick = (day: number, timeIndex: number) => {
    const existingEvent = getEventForSlot(day, timeIndex)
    if (existingEvent) {
      setEditingEvent(existingEvent)
      setEventForm({
        title: existingEvent.title,
        description: existingEvent.description || "",
        color: existingEvent.color,
        type: existingEvent.type,
        startTime: existingEvent.startTime,
        endTime: existingEvent.endTime,
      })
      setIsDialogOpen(true)
    } else {
      setSelectedSlot({ day, time: timeIndex + 8 })
      setEventForm({
        title: "",
        description: "",
        color: "bg-blue-400",
        type: "meeting",
        startTime: timeIndex + 8,
        endTime: timeIndex + 9,
      })
      setEditingEvent(null)
      setIsDialogOpen(true)
    }
  }

  const handleSaveEvent = () => {
    if (!eventForm.title.trim()) return

    if (editingEvent) {
      // Update existing event
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                title: eventForm.title,
                description: eventForm.description,
                color: eventForm.color,
                type: eventForm.type,
                startTime: eventForm.startTime,
                endTime: eventForm.endTime,
              }
            : event,
        ),
      )
    } else if (selectedSlot) {
      // Create new event
      const newEvent: Event = {
        id: Date.now().toString(),
        title: eventForm.title,
        description: eventForm.description,
        day: selectedSlot.day,
        startTime: eventForm.startTime,
        endTime: eventForm.endTime,
        color: eventForm.color,
        type: eventForm.type,
      }
      setEvents([...events, newEvent])
    }

    setIsDialogOpen(false)
    setSelectedSlot(null)
    setEditingEvent(null)
    setEventForm({ title: "", description: "", color: "bg-blue-400", type: "meeting", startTime: 8, endTime: 9 })
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setIsDialogOpen(false)
    setEditingEvent(null)
  }

  const getEventForSlot = (day: number, timeIndex: number) => {
    return events.find((event) => event.day === day && event.startTime === timeIndex + 8)
  }

  const handlePrevMonth = () => {
    // Mock navigation - in real app would change actual dates
    console.log("Previous month clicked")
  }

  const handleNextMonth = () => {
    // Mock navigation - in real app would change actual dates
    console.log("Next month clicked")
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="gap-2 bg-stone-400 rounded-2xl cursor-pointer text-[#11204B] hover:text-white hover:bg-[#11204B]"
            >
              New
              <Plus className="w-4 h-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {editingEvent ? "Edit Event" : "Create New Event"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Enter description (optional)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={eventForm.type}
                    onValueChange={(value: Event["type"]) => setEventForm({ ...eventForm, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="appointment">Appointment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="color">Color</Label>
                  <Select
                    value={eventForm.color}
                    onValueChange={(value) => setEventForm({ ...eventForm, color: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_COLORS.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div className={cn("w-4 h-4 rounded", color.value)} />
                            {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Select
                    value={eventForm.startTime.toString()}
                    onValueChange={(value) => setEventForm({ ...eventForm, startTime: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((time, index) => (
                        <SelectItem key={time} value={(index + 8).toString()}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Select
                    value={eventForm.endTime.toString()}
                    onValueChange={(value) => setEventForm({ ...eventForm, endTime: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((time, index) => (
                        <SelectItem key={time} value={(index + 8).toString()}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveEvent} className="flex-1">
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
                {editingEvent && (
                  <Button variant="destructive" onClick={() => handleDeleteEvent(editingEvent.id)} className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold">{currentMonth}</h2>
          <Button variant="ghost" size="sm" onClick={handleNextMonth}>
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
                      "p-3 border-l min-h-[60px] cursor-pointer hover:bg-gray-50 relative transition-colors",
                      isSelected && "bg-blue-50",
                    )}
                    onClick={() => handleCellClick(day.date, timeIndex)}
                  >
                    {event && (
                      <div
                        className={cn(
                          "absolute inset-1 rounded px-2 py-1 text-xs font-medium text-white flex items-center justify-between group",
                          event.color,
                          "hover:opacity-90 transition-opacity",
                        )}
                      >
                        <div className="truncate">
                          <div className="font-semibold">{event.title}</div>
                          {event.description && <div className="text-xs opacity-90 truncate">{event.description}</div>}
                        </div>
                        <Edit className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1 flex-shrink-0" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
