"use client"

import { useState, useEffect } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { fetchMaintenanceData, type MaintenanceData } from "@/lib/api"

export const description = "Maintenance chart"

const chartConfig = {
  estimated: {
    label: "Estimated Maintenance date",
    color: "hsl(220, 70%, 50%)", // Blue color for estimated
  },
  done: {
    label: "Day Maintenance was done",
    color: "hsl(0, 70%, 50%)", // Red color for done
  },
} satisfies ChartConfig

export function ChartLineMultiple() {
  const [chartData, setChartData] = useState<MaintenanceData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchMaintenanceData()
        setChartData(data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch maintenance data:", err)
        setError("Failed to load maintenance data")
        setChartData([
          { day: "Mon", estimated: 10, done: 20 },
          { day: "Tue", estimated: 30, done: 40 },
          { day: "Wed", estimated: 50, done: 60 },
          { day: "Thu", estimated: 40, done: 50 },
          { day: "Fri", estimated: 20, done: 30 },
          { day: "Sat", estimated: 10, done: 10 },
          { day: "Sun", estimated: 0, done: 0 },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <Card className="w-full min-w-[700px] max-h-[310px] p-4 -mt-2 border-none shadow-md">
        <CardHeader>
          <CardTitle className="font-light text-black">Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <div className="text-gray-500">Loading maintenance data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full min-w-[700px] max-h-[310px] p-4 -mt-2 border-none shadow-md">
      <CardHeader>
        <CardTitle className="font-light text-black">Maintenance</CardTitle>
        <CardDescription className="flex text-gray-300 ms-auto gap-5 text-xs">
          <span>Daily</span>
          <span>Weekly</span>
          <span>Monthly</span>
          <span>Yearly</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex -ms-4 -mt-4">
        <CardDescription className="mt-2 flex flex-col gap-6 text-xs font-mono text-gray-500">
          <p>Current maintenance made</p>
          <p>Current maintenance remaining</p>
        </CardDescription>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 0,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid horizontal={true} vertical={true} strokeDasharray="3 3" stroke="#666666" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={true}
              tickMargin={4}
              tickFormatter={(value) => value}
              style={{ fontSize: "0.75rem", fill: "black" }}
            />
            <YAxis
              tickLine={false}
              axisLine={true}
              tickMargin={4}
              domain={[0, 70]}
              ticks={[0, 20, 40, 60, 70]}
              tickFormatter={(value) => `${value}`}
              style={{ fontSize: "0.75rem", fill: "black" }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="estimated" type="monotone" stroke="var(--color-estimated)" strokeWidth={1} dot={false} />
            <Line dataKey="done" type="monotone" stroke="var(--color-done)" strokeWidth={1} dot={true} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-center p-3 -mt-8 justify-between">
        <Button className="bg-[#0E2B81] text-white text-xs px-2 py-1 -mt-14 rounded-4xl hover:bg-blue-700">
          Last Week Summary
        </Button>
        <div className="space-x-6 text-xs flex flex-row">
          <div className="text-black flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Estimated Maintenance date</span>
          </div>
          <div className="text-black flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
            <span>Day Maintenance was done</span>
          </div>
        </div>
      </CardFooter>
      {error && <div className="text-xs text-red-500 px-4 pb-2">{error} - Showing fallback data</div>}
    </Card>
  )
}
