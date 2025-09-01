"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const incidentsPieData = [
  { name: "Type A", value: 35, fill: "#94a3b8" },
  { name: "Type B", value: 25, fill: "#334155" },
  { name: "Type C", value: 40, fill: "#67e8f9" },
]

const incidentsByDayData = [
  { day: "Mon", incidents: 60 },
  { day: "Tue", incidents: 25 },
  { day: "Wed", incidents: 30 },
  { day: "Thu", incidents: 20 },
  { day: "Fri", incidents: 35 },
  { day: "Sat", incidents: 15 },
  { day: "Sun", incidents: 10 },
]

const machinesAvailableData = [
  { machine: "Printer", available: 8, fill: "#1e293b" },
  { machine: "Typewriter", available: 6, fill: "#2563eb" },
  { machine: "Binder", available: 5, fill: "#2563eb" },
  { machine: "Lift", available: 6, fill: "#2563eb" },
]

const maintenanceData = [
  { id: 1, machine: "", date: "", needed: "" },
  { id: 2, machine: "", date: "", needed: "" },
  { id: 3, machine: "", date: "", needed: "" },
  { id: 4, machine: "", date: "", needed: "" },
  { id: 5, machine: "", date: "", needed: "" },
]

export default function Reports() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Top Row */}
        <div className="space-y-4">
          <h2 className="text-center text-xl font-medium">Incidents</h2>

          {/* Incidents Charts Row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Incidents Pie Chart */}
            <Card className="border-none shadow-none bg-white">
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    incidents: {
                      label: "Incidents",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={incidentsPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={100}
                        paddingAngle={0}
                        dataKey="value"
                      >
                        {incidentsPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Incidents Bar Chart */}
            <Card className="border-none shadow-none bg-white">
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    incidents: {
                      label: "Incidents",
                      color: "#94a3b8",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incidentsByDayData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" axisLine={true} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                      <YAxis
                        axisLine={true}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        domain={[0, 70]}
                      />
                      <Bar
                        dataKey="incidents"
                        fill="#94a3b8"
                        radius={[2, 2, 0, 0]}
                        isAnimationActive={false}
                        style={{ cursor: "default", pointerEvents: "none" }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Machines Available */}
          <Card className="border-none shadow-none bg-white">
            <CardHeader>
              <CardTitle className="text-center text-lg font-medium">Machines Available</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  available: {
                    label: "Available",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={machinesAvailableData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="machine"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                    <Bar
                      dataKey="available"
                      radius={[2, 2, 0, 0]}
                      isAnimationActive={false}
                      style={{ cursor: "default", pointerEvents: "none" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Maintenance Table */}
          <Card className="border-none shadow-none bg-white">
            <CardHeader>
              <CardTitle className="text-center text-lg font-medium">Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#43C2F1] hover:bg-cyan-200">
                    <TableHead className="text-center font-light py-8 border border-gray-400 text-sm text-black">Type of machine</TableHead>
                    <TableHead className="text-center font-light py-8 border border-gray-400 text-sm text-black">Maintenance Date</TableHead>
                    <TableHead className="text-center font-light py-8 border border-gray-400 text-sm text-black">Maintenance Needed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceData.map((row) => (
                    <TableRow key={row.id} className="bg-[#CBF8FC] hover:bg-white">
                      <TableCell className="h-12 border border-[#C3C3C3] text-center">{row.machine}</TableCell>
                      <TableCell className="h-12 border border-[#C3C3C3] text-center">{row.date}</TableCell>
                      <TableCell className="h-12 border border-[#C3C3C3] text-center">{row.needed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
