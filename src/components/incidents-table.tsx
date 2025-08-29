"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ChevronDownIcon, Filter, Icon, Plus } from "lucide-react"
import { Dialog, DialogHeader, DialogContent, DialogTrigger, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "./ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
  // Add more sample data for demonstration
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

export default function DataTable() {
  const [data, setData] = useState<Incident[]>(initialData)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilter, setShowFilter] = useState("All")
  const [sortBy, setSortBy] = useState("Default")

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.complainant.toLowerCase().includes(searchTerm.toLowerCase())

    if (showFilter === "All") return matchesSearch
    return matchesSearch && item.action === showFilter
  })

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
            <Select value={showFilter} onValueChange={setShowFilter} >
              <SelectTrigger className="w-24 bg-gray-100 border-[#666666] rounded-none">
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

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-28 bg-gray-100 border-[#666666] rounded-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">Default</SelectItem>
                <SelectItem value="Date">Date</SelectItem>
                <SelectItem value="Status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" className="bg-gray-100 border-[#666666] rounded-none">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>  
            <Button className="bg-[#F11114] hover:bg-red-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[54rem] rounded-none bg-[#D9D9D9] text-black">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Incident Form</DialogTitle>
             
            </DialogHeader>
            {/* Form fields for adding a new incident */}
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
                      className=" rounded-none justify-between hover:bg-sky-600 font-normal"
                    >
                      {date ? date.toLocaleDateString() : "14 Aug 2025"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="overflow-hidden border-[#C3C3C3] p-4" align="end" side="top" >
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
                <Input type="text" placeholder="Enter your name" className="bg-gray-100 rounded-none border-[#666666]" />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label className="text-sm font-medium">Maintenace Needed</label>
                <Input type="text" placeholder="Type your message" className="bg-gray-100 rounded-none border-[#666666]" />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label className="text-sm font-medium">Comment</label>
                <Textarea placeholder="State your issue" className="bg-gray-100 rounded-none min-h-[10rem] max-h-min border-[#666666]" />
              </div>
             
            </div>
            <DialogFooter>  
              <DialogClose asChild>  
                <Button className="bg-[#D9D9D9] border-1 border-black rounded-none text-black hover:bg-gray-200 mr-2">
                  Cancel
                </Button>
              </DialogClose>  
              <Button className="bg-[#0A86C9] border-1 border-black rounded-none hover:bg-blue-600 text-white">
                Submit
              </Button>
           </DialogFooter>

          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="border border-[#666666] rounded-none bg-white">
        <Table>
          <TableHeader>
            <TableRow className="rounded-none bg-[#C3C3C3] hover:bg-[#C3C3C3] text-black">
              <TableHead className="font-medium text-black border-r  border-[#666666]">Date</TableHead>
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
                  <Badge className={`${getActionBadgeColor(item.action)} text-white rounded-4xl ms-12 `}>{item.action}</Badge>
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
