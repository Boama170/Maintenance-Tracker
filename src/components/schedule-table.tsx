"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Calendar } from "lucide-react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

interface Event {
  id: string
  title: string
  description?: string
  start: string
  end: string
  backgroundColor: string
  type: "meeting" | "task" | "appointment" | "other"
}

const EVENT_COLORS = [
  { name: "Blue", value: "#60a5fa" },
  { name: "Green", value: "#4ade80" },
  { name: "Yellow", value: "#facc15" },
  { name: "Red", value: "#f87171" },
  { name: "Purple", value: "#a78bfa" },
  { name: "Gray", value: "#9ca3af" },
]

export default function WeeklyScheduler() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly standup",
      start: "2025-08-27T09:00:00",
      end: "2025-08-27T10:00:00",
      backgroundColor: "#4ade80",
      type: "meeting",
    },
    {
      id: "2",
      title: "Lunch Break",
      description: "Team lunch",
      start: "2025-08-28T11:00:00",
      end: "2025-08-28T12:00:00",
      backgroundColor: "#facc15",
      type: "other",
    },
    {
      id: "3",
      title: "Client Call",
      description: "Project review",
      start: "2025-08-27T13:00:00",
      end: "2025-08-27T14:00:00",
      backgroundColor: "#f87171",
      type: "appointment",
    },
    {
      id: "4",
      title: "Workshop",
      description: "Training session",
      start: "2025-08-30T10:00:00",
      end: "2025-08-30T11:00:00",
      backgroundColor: "#60a5fa",
      type: "meeting",
    },
    {
      id: "5",
      title: "Code Review",
      description: "PR review",
      start: "2025-08-29T16:00:00",
      end: "2025-08-29T17:00:00",
      backgroundColor: "#9ca3af",
      type: "task",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    backgroundColor: "#60a5fa",
    type: "meeting" as Event["type"],
    startTime: "09:00",
    endTime: "10:00",
  })

  const handleDateSelect = (selectInfo: unknown) => {
    const startDate = (selectInfo as { start: Date }).start
    const endDate = (selectInfo as { end?: Date }).end || new Date(startDate.getTime() + 60 * 60 * 1000) // Default 1 hour

    setSelectedDate(startDate.toISOString().split("T")[0])
    setEventForm({
      title: "",
      description: "",
      backgroundColor: "#60a5fa",
      type: "meeting",
      startTime: startDate.toTimeString().slice(0, 5),
      endTime: endDate.toTimeString().slice(0, 5),
    })
    setEditingEvent(null)
    setIsDialogOpen(true)
  }

  const handleEventClick = (clickInfo: unknown) => {
    const event = events.find((e) => e.id === (clickInfo as { event: { id: string } }).event.id)
    if (event) {
      setEditingEvent(event)
      const startDate = new Date(event.start)
      const endDate = new Date(event.end)

      setSelectedDate(startDate.toISOString().split("T")[0])
      setEventForm({
        title: event.title,
        description: event.description || "",
        backgroundColor: event.backgroundColor,
        type: event.type,
        startTime: startDate.toTimeString().slice(0, 5),
        endTime: endDate.toTimeString().slice(0, 5),
      })
      setIsDialogOpen(true)
    }
  }

  const handleSaveEvent = () => {
    if (!eventForm.title.trim() || !selectedDate) return

    const startDateTime = `${selectedDate}T${eventForm.startTime}:00`
    const endDateTime = `${selectedDate}T${eventForm.endTime}:00`

    if (editingEvent) {
      // Update existing event
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                title: eventForm.title,
                description: eventForm.description,
                backgroundColor: eventForm.backgroundColor,
                type: eventForm.type,
                start: startDateTime,
                end: endDateTime,
              }
            : event,
        ),
      )
    } else {
      // Create new event
      const newEvent: Event = {
        id: Date.now().toString(),
        title: eventForm.title,
        description: eventForm.description,
        start: startDateTime,
        end: endDateTime,
        backgroundColor: eventForm.backgroundColor,
        type: eventForm.type,
      }
      setEvents([...events, newEvent])
    }

    setIsDialogOpen(false)
    setEditingEvent(null)
    setEventForm({
      title: "",
      description: "",
      backgroundColor: "#60a5fa",
      type: "meeting",
      startTime: "09:00",
      endTime: "10:00",
    })
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setIsDialogOpen(false)
    setEditingEvent(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white">
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
                    value={eventForm.backgroundColor}
                    onValueChange={(value) => setEventForm({ ...eventForm, backgroundColor: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_COLORS.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: color.value }} />
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
                  <Input
                    id="startTime"
                    type="time"
                    value={eventForm.startTime}
                    onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={eventForm.endTime}
                    onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveEvent} className="flex-1">
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
                {editingEvent && (
                  <Button variant="destructive" onClick={() => handleDeleteEvent(editingEvent.id)} className="gap-2">
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button size="sm" className="bg-red-500 rounded-2xl hover:bg-red-600 text-white">
          Submit
        </Button>
      </div>

      <div className="p-12">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          initialDate="2025-08-25"
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          titleFormat={{ month: "long", year: "numeric" }}
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
          allDaySlot={false}
          height="700px"
          events={events}
          selectable={true}
          expandRows={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          slotDuration="01:00:00"
          slotLabelInterval="01:00:00"
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            omitZeroMinute: false,
            meridiem: "short",
          }}
          eventDisplay="block"
          eventBackgroundColor="transparent"
          eventBorderColor="transparent"
          eventTextColor="white"
          dayHeaderFormat={{ weekday: "short", day: "numeric" }}
        />

        <style jsx global>{`
          .fc-prev-button,
          .fc-next-button {
            background-color: transparent !important;
            color: #374151 !important;
            padding: 4px 8px !important;
            font-size: 14px !important;
            
            border: none !important
          }
          
          .fc-prev-button:hover,
          .fc-next-button:hover {
            background-color: #e5e7eb !important;
          }
          
          .fc-prev-button:focus,
          .fc-next-button:focus {
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important;
          }
          
          .fc-toolbar-title {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            color: #111827 !important;
            margin: 0 16px !important;
          }
          
          .fc-toolbar-chunk {
            display: flex !important;
            align-items: center !important;
          }
        `}</style>
      </div>
    </div>
  )
}


// preveentive, unplanned, scheduled, emergency
// colors; critical, priority, 
//merge

//report page: dropdown with report type, start date, end date
//rendering a table for the type