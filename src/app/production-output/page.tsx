//'
// import React from 'react'

// function Page() {
//   return (
//     <div>
//    
//     </div>
//   )
// }

// export default Page
"use client"
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
 import Header from '@/components/layout/header'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"

interface ProductionOutput {
  id: string
  date: string
  machineType: string
  impressions: number
  duration: string
}

export default function ProductionOutputPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [outputs, setOutputs] = useState<ProductionOutput[]>([
    {
      id: "1",
      date: "18th July 2025",
      machineType: "",
      impressions: 0,
      duration: "",
    },
  ])

  const [formData, setFormData] = useState({
    date: "",
    machineType: "",
    impressions: "",
  })

  const handleSubmit = () => {
    if (formData.date && formData.machineType && formData.impressions) {
      const newOutput: ProductionOutput = {
        id: Date.now().toString(),
        date: formData.date,
        machineType: formData.machineType,
        impressions: Number.parseInt(formData.impressions),
        duration: "",
      }
      setOutputs([...outputs, newOutput])
      setFormData({ date: "", machineType: "", impressions: "" })
      setIsModalOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
         <Header title="PRODUCTION OUTPUT" />
      <div className="mx-auto max-w-7xl">
        <div className="my-12 flex justify-end">
          <Button onClick={() => setIsModalOpen(true)} className="bg-[#EF4444] hover:bg-[#DC2626] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Output
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#C4C4C4] hover:bg-[#C4C4C4]">
                <TableHead className="border-r border-gray-300 font-semibold text-black">Date</TableHead>
                <TableHead className="border-r border-gray-300 font-semibold text-black">Type of machine</TableHead>
                <TableHead className="border-r border-gray-300 font-semibold text-black">
                  Number of impressions
                </TableHead>
                <TableHead className="font-semibold text-black">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outputs.map((output, index) => (
                <TableRow key={output.id} className={index % 2 === 0 ? "bg-[#E8E8E8]" : "bg-white"}>
                  <TableCell className="border-r border-gray-300">{output.date}</TableCell>
                  <TableCell className="border-r border-gray-300">{output.machineType}</TableCell>
                  <TableCell className="border-r border-gray-300">{output.impressions || ""}</TableCell>
                  <TableCell>{output.duration}</TableCell>
                </TableRow>
              ))}
              {/* Empty rows for visual consistency */}
              {Array.from({ length: Math.max(0, 6 - outputs.length) }).map((_, index) => (
                <TableRow
                  key={`empty-${index}`}
                  className={(outputs.length + index) % 2 === 0 ? "bg-[#E8E8E8]" : "bg-white"}
                >
                  <TableCell className="border-r border-gray-300 h-16">&nbsp;</TableCell>
                  <TableCell className="border-r border-gray-300">&nbsp;</TableCell>
                  <TableCell className="border-r border-gray-300">&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] border-none bg-[#D9D9D9]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-normal">Production Output</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm text-gray-600">
                Date
              </Label>
              <Select value={formData.date} onValueChange={(value) => setFormData({ ...formData, date: value })}>
                <SelectTrigger id="date" className="bg-white w-full">
                  <SelectValue placeholder="14 August 2025" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="14 August 2025">14 August 2025</SelectItem>
                  <SelectItem value="15 August 2025">15 August 2025</SelectItem>
                  <SelectItem value="16 August 2025">16 August 2025</SelectItem>
                  <SelectItem value="17 August 2025">17 August 2025</SelectItem>
                  <SelectItem value="18 August 2025">18 August 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="machine" className="text-sm text-gray-600">
                Type of machine
              </Label>
              <Select
                value={formData.machineType}
                onValueChange={(value) => setFormData({ ...formData, machineType: value })}
              >
                <SelectTrigger id="machine" className="bg-white w-full">
                  <SelectValue placeholder="Select Machine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Offset Press">Offset Press</SelectItem>
                  <SelectItem value="Digital Press">Digital Press</SelectItem>
                  <SelectItem value="Flexographic Press">Flexographic Press</SelectItem>
                  <SelectItem value="Screen Printer">Screen Printer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="impressions" className="text-sm text-gray-600">
                Number of impressions
              </Label>
              <Input
                id="impressions"
                type="number"
                placeholder="Number of impressions"
                value={formData.impressions}
                onChange={(e) => setFormData({ ...formData, impressions: e.target.value })}
                className="bg-white w-full"
              />
            </div>
          </div>
          <DialogFooter className="gap-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="bg-white">
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit} className="bg-[#06B6D4] hover:bg-[#0891B2] text-white">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

