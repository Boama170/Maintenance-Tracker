"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus } from "lucide-react"

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
            className="max-w-sm bg-gray-100 active:outline-gray-700 border-[#666666]"
          />

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <Select value={showFilter} onValueChange={setShowFilter}>
              <SelectTrigger className="w-24 bg-gray-100 border-[#666666]">
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
              <SelectTrigger className="w-28 bg-gray-100 border-[#666666]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">Default</SelectItem>
                <SelectItem value="Date">Date</SelectItem>
                <SelectItem value="Status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" className="bg-gray-100 border-[#666666]">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Button className="bg-red-500 hover:bg-red-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Incident
        </Button>
      </div>

      {/* Table */}
      <div className="border border-[#666666] rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="rounded-lg bg-[#C3C3C3] hover:bg-[#C3C3C3] text-black">
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
                  <Badge className={`${getActionBadgeColor(item.action)} text-white ms-12 `}>{item.action}</Badge>
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
