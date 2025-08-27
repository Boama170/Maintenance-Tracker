"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

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

export function IncidentsCard() {
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

  const getIncidentData = () => {
    const data = getChartData()
    const avgIncidents = data.reduce((sum, entry) => sum + entry.value, 0) / data.length
    const incidentsValue = Math.round(avgIncidents)
    const noIncidentValue = 100 - incidentsValue
    return [
      { name: "Incidents", value: incidentsValue, color: "#ef4444" },
      { name: "No Incident", value: noIncidentValue, color: "#d1d5db" },
    ]
  }

  return (
    <Card className="border-none shadow-md text-black w-13/22 h-1/4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Incidents</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Donut Chart with Legend */}
          <div className="flex-1 flex flex-row items-center gap-2">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getIncidentData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    startAngle={90}
                    endAngle={450}
                    dataKey="value"
                  >
                    {getIncidentData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-red-500">{getIncidentData()[0].value}%</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-xs text-gray-600">No Incident</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-xs text-gray-600">Incidents</span>
              </div>
            </div>
          </div>

          {/* Right side - Bar Chart with Tabs */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex justify-between bg-[rgba(0, 0, 0, 0)] p-1 ms-45 rounded">
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

              <div className="h-42">
                <ResponsiveContainer width="100%" height="100%">
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
                      data={getChartData().map(d => ({ ...d, value: 100 - d.value }))}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}