"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ChevronDownIcon, Filter, Plus } from "lucide-react"
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Incident {
  id: string
  date: string
  comment: string
  complainant: string
  maintenance: string
  action: "Pending" | "Completed" | "In Progress"
}

const initialData: Incident[] = [
  {
    id: "1",
    date: "18th July 2025",
    comment: "Printers stopped functioning",
    complainant: "Mr. James Adams",
    maintenance: "",
    action: "Pending",
  },
  {
    id: "2",
    date: "17th July 2025",
    comment: "Network connectivity issues",
    complainant: "Ms. Sarah Johnson",
    maintenance: "Router replacement",
    action: "In Progress",
  },
  {
    id: "3",
    date: "16th July 2025",
    comment: "Air conditioning not working",
    complainant: "Mr. David Wilson",
    maintenance: "HVAC repair",
    action: "Completed",
  },
]

export default function IncidentsTable() {
  const [data, setData] = useState<Incident[]>(initialData)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilter, setShowFilter] = useState("All")
  const [sortBy, setSortBy] = useState("Default")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [tempFilters, setTempFilters] = useState({
    status: "All",
    dateRange: "All",
    maintenance: "All",
  })
  const [appliedFilters, setAppliedFilters] = useState({
    status: "All",
    dateRange: "All",
    maintenance: "All",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    complainant: "",
    maintenance: "",
    comment: "",
    action: "Pending" as "Pending" | "Completed" | "In Progress",
  })

  const sortedData = [...data].sort((a, b) => {
    switch (sortBy) {
      case "Action":
        return a.action.localeCompare(b.action)
      case "Maintenance":
        return a.maintenance.localeCompare(b.maintenance)
      case "Comment":
        return a.comment.localeCompare(b.comment)
      default:
        return 0
    }
  })

  const filteredData = sortedData.filter((item) => {
    const matchesSearch =
      item.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.complainant.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesShow = true
    if (showFilter === "Date") {
      matchesShow = !!item.date
    } else if (showFilter === "Comment") {
      matchesShow = !!item.comment
    } else if (showFilter === "Complainant") {
      matchesShow = !!item.complainant
    } else if (showFilter === "Maintenance") {
      matchesShow = !!item.maintenance
    } else if (showFilter === "Action") {
      matchesShow = !!item.action
    }

    const matchesStatus = appliedFilters.status === "All" || item.action === appliedFilters.status
    const matchesMaintenance =
      appliedFilters.maintenance === "All" ||
      (appliedFilters.maintenance === "Required" && item.maintenance) ||
      (appliedFilters.maintenance === "Not Required" && !item.maintenance)

    return matchesSearch && matchesShow && matchesStatus && matchesMaintenance
  })

  const handleSubmit = () => {
    if (!formData.complainant || !formData.comment) return

    const newIncident: Incident = {
      id: Date.now().toString(),
      date: date
        ? date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
      comment: formData.comment,
      complainant: formData.complainant,
      maintenance: formData.maintenance,
      action: formData.action,
    }

    setData((prev) => [...prev, newIncident])
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      complainant: "",
      maintenance: "",
      comment: "",
      action: "Pending",
    })
    setDate(undefined)
    setIsDialogOpen(false)
  }

  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters)
    setIsFilterOpen(false)
  }

  const handleResetFilters = () => {
    const resetFilters = { status: "All", dateRange: "All", maintenance: "All" }
    setTempFilters(resetFilters)
    setAppliedFilters(resetFilters)
  }

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "Pending":
        return "bg-green-500 hover:bg-green-600"
      case "In Progress":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Completed":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <div className="w-full space-y-4 text-black p-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Input
            placeholder="Search Complaint"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-gray-100 rounded-none active:outline-gray-700 border-[#666666]"
          />

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <Select value={showFilter} onValueChange={setShowFilter}>
              <SelectTrigger className="w-32 bg-gray-100 border-[#666666] rounded-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Date">Date</SelectItem>
                <SelectItem value="Comment">Comment</SelectItem>
                <SelectItem value="Complainant">Complainant</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Action">Action</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 bg-gray-100 border-[#666666] rounded-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">Default</SelectItem>
                <SelectItem value="Action">Action</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Comment">Comment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="bg-gray-100 border-[#666666] rounded-none h-8 px-3">
                <Filter className="h-3 w-3 mr-1" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-none bg-[#D9D9D9] text-black">
              <DialogHeader>
                <DialogTitle className="text-xl text-center">Advanced Filters</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="status-filter">Status</Label>
                  <Select
                    value={tempFilters.status}
                    onValueChange={(value) => setTempFilters((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="bg-gray-100 border-[#666666] rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="maintenance-filter">Maintenance</Label>
                  <Select
                    value={tempFilters.maintenance}
                    onValueChange={(value) => setTempFilters((prev) => ({ ...prev, maintenance: value }))}
                  >
                    <SelectTrigger className="bg-gray-100 border-[#666666] rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Required">Required</SelectItem>
                      <SelectItem value="Not Required">Not Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  className="bg-gray-100 border-[#666666] rounded-none"
                >
                  Reset
                </Button>
                <Button onClick={handleApplyFilters} className="bg-[#0A86C9] hover:bg-blue-600 text-white rounded-none">
                  Apply Filters
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-[#F11114] hover:bg-red-600 text-white h-8 px-3"
                onClick={() => {
                  resetForm()
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[54rem] rounded-none bg-[#D9D9D9] text-black">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">Incident Form</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="date" className="px-1">
                      Date
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="rounded-none justify-between hover:bg-sky-600 font-normal bg-transparent"
                        >
                          {date ? date.toLocaleDateString() : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="overflow-hidden border-[#C3C3C3] p-4" align="end" side="top">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                          }}
                          components={{
                            Chevron: (props) =>
                              props.orientation === "left" ? (
                                <ChevronLeft className="size-6 text-black stroke-1 shadow-lg rounded-full" />
                              ) : (
                                <ChevronRight className="size-6 text-black stroke-1 shadow-lg rounded-full" />
                              ),
                          }}
                          className="hover:bg-sky-600 rounded-none text-black"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-sm font-medium">Complainant</label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    className="bg-gray-100 rounded-none border-[#666666]"
                    value={formData.complainant}
                    onChange={(e) => setFormData((prev) => ({ ...prev, complainant: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-sm font-medium">Maintenance Needed</label>
                  <Input
                    type="text"
                    placeholder="Type your message"
                    className="bg-gray-100 rounded-none border-[#666666]"
                    value={formData.maintenance}
                    onChange={(e) => setFormData((prev) => ({ ...prev, maintenance: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={formData.action}
                    onValueChange={(value: "Pending" | "Completed" | "In Progress") =>
                      setFormData((prev) => ({ ...prev, action: value }))
                    }
                  >
                    <SelectTrigger className="bg-gray-100 border-[#666666] rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-sm font-medium">Comment</label>
                  <Textarea
                    placeholder="State your issue"
                    className="bg-gray-100 rounded-none min-h-[10rem] max-h-min border-[#666666]"
                    value={formData.comment}
                    onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="bg-[#D9D9D9] border-1 border-black rounded-none text-black hover:bg-gray-200 mr-2"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  className="bg-[#0A86C9] border-1 border-black rounded-none hover:bg-blue-600 text-white"
                  onClick={handleSubmit}
                  disabled={!formData.complainant || !formData.comment}
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#666666] rounded-none bg-white">
        <Table>
          <TableHeader>
            <TableRow className="rounded-none bg-[#C3C3C3] hover:bg-[#C3C3C3] text-black">
              <TableHead className="font-medium text-black border-r border-[#666666]">Date</TableHead>
              <TableHead className="font-medium text-black border-r border-[#666666]">Comment</TableHead>
              <TableHead className="font-medium text-black border-r border-[#666666]">Complainant</TableHead>
              <TableHead className="font-medium text-black border-r border-[#666666]">Maintenance</TableHead>
              <TableHead className="font-medium text-black">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="border-r border-[#666666]">{item.date}</TableCell>
                <TableCell className="border-r border-[#666666]">{item.comment}</TableCell>
                <TableCell className="border-r border-[#666666]">{item.complainant}</TableCell>
                <TableCell className="border-r border-[#666666]">{item.maintenance}</TableCell>
                <TableCell>
                  <Badge className={`${getActionBadgeColor(item.action)} text-white rounded-4xl`}>{item.action}</Badge>
                </TableCell>
              </TableRow>
            ))}

            {Array.from({ length: Math.max(0, 8 - filteredData.length) }).map((_, index) => (
              <TableRow key={`empty-${index}`} className="hover:bg-gray-50">
                <TableCell className="border-r border-[#666666] h-12">&nbsp;</TableCell>
                <TableCell className="border-r border-[#666666]">&nbsp;</TableCell>
                <TableCell className="border-r border-[#666666]">&nbsp;</TableCell>
                <TableCell className="border-r border-[#666666]">&nbsp;</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
