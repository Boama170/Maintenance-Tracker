// import Header from '@/components/layout/header'
// import React from 'react'

// function Page() {
//   return (
//     <div>
//       <Header title="MACHINES" />
//     </div>
//   )
// }

// export default Page
"use client"

import { useState, useEffect } from "react"
import Header from '@/components/layout/header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MaintenanceRow {
  id: string
  machineType: string
  maintenanceNeeded: string
}

interface EquipmentType {
  id: string
  name: string
}

export default function DetailsPage() {
  const [rows, setRows] = useState<MaintenanceRow[]>([
    { id: "1", machineType: "Pump", maintenanceNeeded: "Oil change" },
    { id: "2", machineType: "Motor", maintenanceNeeded: "Bearing inspection" },
    { id: "3", machineType: "Compressor", maintenanceNeeded: "Filter replacement" },
    { id: "4", machineType: "", maintenanceNeeded: "" },
  ])

  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([
    { id: "1", name: "Pump" },
    { id: "2", name: "Motor" },
    { id: "3", name: "Compressor" },
  ])

  const handleRowChange = (id: string, field: "machineType" | "maintenanceNeeded", value: string) => {
    const updatedRows = rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    setRows(updatedRows)
    localStorage.setItem('maintenanceRows', JSON.stringify(updatedRows))
  }

  const addRow = () => {
    const newId = Math.max(...rows.map((r) => Number.parseInt(r.id) || 0), 0) + 1
    const updatedRows = [...rows, { id: newId.toString(), machineType: "", maintenanceNeeded: "" }]
    setRows(updatedRows)
    localStorage.setItem('maintenanceRows', JSON.stringify(updatedRows))
  }

  const handleEquipmentTypeChange = (id: string, value: string) => {
    const updatedTypes = equipmentTypes.map((type) => (type.id === id ? { ...type, name: value } : type))
    setEquipmentTypes(updatedTypes)
    localStorage.setItem('equipmentTypes', JSON.stringify(updatedTypes))
  }

  const addEquipmentType = () => {
    const newId = Math.max(...equipmentTypes.map((t) => Number.parseInt(t.id) || 0), 0) + 1
    const updatedTypes = [...equipmentTypes, { id: newId.toString(), name: "" }]
    setEquipmentTypes(updatedTypes)
    localStorage.setItem('equipmentTypes', JSON.stringify(updatedTypes))
  }

  const removeEquipmentType = (id: string) => {
    const updatedTypes = equipmentTypes.filter((type) => type.id !== id)
    setEquipmentTypes(updatedTypes)
    localStorage.setItem('equipmentTypes', JSON.stringify(updatedTypes))
  }

  useEffect(() => {
    const savedRows = localStorage.getItem('maintenanceRows')
    if (savedRows) {
      setRows(JSON.parse(savedRows))
    }

    const savedTypes = localStorage.getItem('equipmentTypes')
    if (savedTypes) {
      setEquipmentTypes(JSON.parse(savedTypes))
    }
  }, [])

  return (
    <main className="min-h-screen bg-background p-8">
      <div>
       <Header title="MACHINES" />
     </div>
      <div className="max-w-2xl pt-4">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-12">Details</h1>

        {/* Types Section */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold mb-4">Types</h2>
          <div className="bg-card border border-border rounded-lg p-6 min-h-32">
            <div className="space-y-2">
              {equipmentTypes.map((type) => (
                <div key={type.id} className="flex items-center gap-2">
                  <Input
                    value={type.name}
                    onChange={(e) => handleEquipmentTypeChange(type.id, e.target.value)}
                    placeholder="Enter equipment type"
                    className="flex-1 border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  />
                  <Button
                    onClick={() => removeEquipmentType(type.id)}
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button onClick={addEquipmentType} variant="outline" size="sm">
                + Add Type
              </Button>
            </div>
          </div>
        </section>

        {/* Maintenance Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Maintenance</h2>

          {/* Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Type of Machine</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Maintenance needed</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3">
                      <Input
                        value={row.machineType}
                        onChange={(e) => handleRowChange(row.id, "machineType", e.target.value)}
                        placeholder="Enter machine type"
                        className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        value={row.maintenanceNeeded}
                        onChange={(e) => handleRowChange(row.id, "maintenanceNeeded", e.target.value)}
                        placeholder="Enter maintenance needed"
                        className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Row Button */}
          <div className="mt-4">
            <Button onClick={addRow} variant="outline">
              + Add Row
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
