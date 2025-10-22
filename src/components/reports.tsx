"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip } from "./ui/tooltip"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const maintenanceData = [
  { date: "18th July 2025", machine: "Printer", maintenanceDate: "20th July 2025", needed: "Oil Change" },
  { date: "19th July 2025", machine: "Typewriter", maintenanceDate: "21st July 2025", needed: "Cleaning" },
  { date: "20th July 2025", machine: "Binder", maintenanceDate: "22nd July 2025", needed: "Adjustment" },
]

const machinesData = [
  { name: "Printer", value: 65, fill: "#000000" },
  { name: "Typewriter", value: 45, fill: "#ef4444" },
  { name: "Binder", value: 35, fill: "#9ca3af" },
  { name: "Lift", value: 28, fill: "#fbbf24" },
]

const dailyData = [
  { day: "Mon", value: 55 },
  { day: "Tue", value: 45 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 45 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 35 },
  { day: "Sun", value: 40 },
]

const weeklyData = [
  { day: "W1", value: 50 },
  { day: "W2", value: 40 },
  { day: "W3", value: 60 },
  { day: "W4", value: 45 },
]

const monthlyData = [
  { day: "Jan", value: 45 },
  { day: "Feb", value: 55 },
  { day: "Mar", value: 40 },
  { day: "Apr", value: 50 },
  { day: "May", value: 60 },
  { day: "Jun", value: 35 },
]

const yearlyData = [
  { day: "2020", value: 40 },
  { day: "2021", value: 55 },
  { day: "2022", value: 45 },
  { day: "2023", value: 60 },
  { day: "2024", value: 50 },
]

const pieData = [
 
  { name: "Maintenance Completed", value: 65, fill: "#FED30F" }, 
   { name: "Total Maintenance", value: 40, fill: "#002AA1" }, 
  { name: "Remaining Maintenance", value: 65, fill: "#9747FF" },
]

const chartConfig = {
  total: {
    label: "Total Maintenance",
    color: "#2563eb",
  },
  completed: {
    label: "Maintenance Completed",
    color: "#fbbf24",
  },
  remaining: {
    label: "Remaining Maintenance",
    color: "#a855f7",
  },
}

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState("daily")

  const getChartData = () => {
    switch (activeTab) {
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      case "yearly":
        return yearlyData
      default:
        return dailyData
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Maintenance Overview */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6">Maintenance</h1>

          <div className="flex gap-8 mb-8">
            <div className="flex flex-col gap-4 min-w-fit">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-sm font-medium">Total Maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-sm font-medium">Maintenance Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                <span className="text-sm font-medium">Remaining Maintenance</span>
              </div>
            </div>

            <div className="flex-1 flex gap-8">
              <ChartContainer config={chartConfig} className="w-48 h-48">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    
                    outerRadius={80}
                    
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltipContent />
                </PieChart>
              </ChartContainer>

              {/* Maintenance Table */}
              <div className="flex-1">
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                  <div className="bg-cyan-400 text-white">
                    <div className="grid grid-cols-3 gap-0">
                      <div className="px-6 py-3 border-r border-cyan-300 font-semibold">Type of machine</div>
                      <div className="px-6 py-3 border-r border-cyan-300 font-semibold">Maintenance Date</div>
                      <div className="px-6 py-3 font-semibold">Maintenance Needed</div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {maintenanceData.map((item, idx) => (
                      <div key={idx} className={`grid grid-cols-3 gap-0 ${idx % 2 === 0 ? "bg-cyan-50" : "bg-white"}`}>
                        <div className="px-6 py-4 border-r border-gray-200">{item.machine}</div>
                        <div className="px-6 py-4 border-r border-gray-200">{item.maintenanceDate}</div>
                        <div className="px-6 py-4">{item.needed}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* T-shaped Border Separator */}
        <div className="relative mb-8">
          <div className="h-px bg-gray-300"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-px w-px h-8 bg-gray-300"></div>
        </div>

        {/* Bottom Section - Machines and Incidents */}
        <div className="grid grid-cols-2 gap-8">
          {/* Machines Available */}
          <div>
            <h2 className="text-xl font-bold mb-6">Machines Available</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={machinesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {machinesData.map((entry, index) => (
                      <Bar key={`bar-${index}`} dataKey="value" fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Incidents */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Incidents</h2>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList className="flex justify-between bg-[rgba(0, 0, 0, 0)] p-1 rounded">
                  <TabsTrigger
                    value="daily"
                    className={`flex-1 text-center text-[0.65rem] ${activeTab === "daily" ? "bg-white text-gray-400" : "bg-transparent text-gray-400"}`}
                  >
                    Daily
                  </TabsTrigger>
                  <TabsTrigger
                    value="weekly"
                    className={`flex-1 text-center text-[0.65rem] ${activeTab === "weekly" ? "bg-white text-gray-400" : "bg-transparent text-gray-400"}`}
                  >
                    Weekly
                  </TabsTrigger>
                  <TabsTrigger
                    value="monthly"
                    className={`flex-1 text-center text-[0.65rem] ${activeTab === "monthly" ? "bg-white text-gray-400" : "bg-transparent text-gray-400"}`}
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="yearly"
                    className={`flex-1 text-center text-[0.65rem] ${activeTab === "yearly" ? "bg-white text-gray-400" : "bg-transparent text-gray-400"}`}
                  >
                    Yearly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getChartData()} margin={{ top: 5, right: 10, left: 5, bottom: 2 }}>
                  <CartesianGrid stroke="gray" strokeDasharray="3 3" />
                  <XAxis dataKey="day" axisLine={true} tickLine={false} tick={{ fontSize: 10, fill: "#000000" }} />
                  <YAxis
                    axisLine={true}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#000000" }}
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                  />
                  <Bar dataKey="value" fill="#ef4444" radius={[2, 2, 0, 0]} maxBarSize={20} />
                  <Bar
                    dataKey="value"
                    fill="#d1d5db"
                    radius={[2, 2, 0, 0]}
                    maxBarSize={20}
                    data={getChartData().map((d) => ({ ...d, value: 100 - d.value }))}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


