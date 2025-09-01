import axios from "axios"

// Configure axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  timeout: 10000,
})

// Types for API responses
export interface MaintenanceData {
  day: string
  estimated: number
  done: number
}

export interface SummaryStats {
  totalMachines: number
  totalIncidents: number
  maintenanceCount: number
}

export interface IncidentData {
  day: string
  value: number
}

export interface ScheduleItem {
  id: string
  date: number
  month: string
  color: "yellow" | "red"
  title: string
  description?: string
}

const MOCK_MAINTENANCE_DATA: MaintenanceData[] = [
  { day: "Mon", estimated: 45, done: 30 },
  { day: "Tue", estimated: 52, done: 45 },
  { day: "Wed", estimated: 38, done: 35 },
  { day: "Thu", estimated: 61, done: 42 },
  { day: "Fri", estimated: 55, done: 48 },
  { day: "Sat", estimated: 35, done: 28 },
  { day: "Sun", estimated: 25, done: 20 },
]

const MOCK_SUMMARY_STATS: SummaryStats = {
  totalMachines: 500,
  totalIncidents: 240,
  maintenanceCount: 9,
}

const MOCK_INCIDENT_DATA = {
  daily: [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 45 },
    { day: "Wed", value: 35 },
    { day: "Thu", value: 55 },
    { day: "Fri", value: 25 },
    { day: "Sat", value: 40 },
    { day: "Sun", value: 30 },
  ],
  weekly: [
    { day: "Week 1", value: 120 },
    { day: "Week 2", value: 98 },
    { day: "Week 3", value: 156 },
    { day: "Week 4", value: 87 },
  ],
  monthly: [
    { day: "Jan", value: 234 },
    { day: "Feb", value: 187 },
    { day: "Mar", value: 298 },
    { day: "Apr", value: 156 },
    { day: "May", value: 203 },
    { day: "Jun", value: 167 },
  ],
  yearly: [
    { day: "2020", value: 1456 },
    { day: "2021", value: 1789 },
    { day: "2022", value: 2134 },
    { day: "2023", value: 1987 },
    { day: "2024", value: 2456 },
  ],
}

const MOCK_SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: "1",
    date: 28,
    month: "Thur",
    color: "yellow",
    title: "Maintenance Check",
    description: "Regular maintenance check for printer systems",
  },
  {
    id: "2",
    date: 29,
    month: "Fri",
    color: "red",
    title: "Emergency Repair",
    description: "Urgent repair needed for binding machine",
  },
  {
    id: "3",
    date: 29,
    month: "Fri",
    color: "red",
    title: "System Update",
    description: "Software update for typewriter systems",
  },
  {
    id: "4",
    date: 29,
    month: "Fri",
    color: "red",
    title: "Inspection",
    description: "Safety inspection for lift equipment",
  },
  {
    id: "5",
    date: 29,
    month: "Fri",
    color: "red",
    title: "Calibration",
    description: "Calibration of measurement devices",
  },
]

export const fetchMaintenanceData = async (): Promise<MaintenanceData[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Replace with real API call when backend is ready
  // const response = await api.get("/maintenance/chart-data")
  // return response.data

  return MOCK_MAINTENANCE_DATA
}

export const fetchSummaryStats = async (): Promise<SummaryStats> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // TODO: Replace with real API call when backend is ready
  // const response = await api.get("/dashboard/summary")
  // return response.data

  return MOCK_SUMMARY_STATS
}

export const fetchIncidentData = async (period: "daily" | "weekly" | "monthly" | "yearly"): Promise<IncidentData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  // TODO: Replace with real API call when backend is ready
  // const response = await api.get(`/incidents/chart-data?period=${period}`)
  // return response.data

  return MOCK_INCIDENT_DATA[period]
}

export const fetchScheduleItems = async (): Promise<ScheduleItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 350))

  // TODO: Replace with real API call when backend is ready
  // const response = await api.get("/schedule/items")
  // return response.data

  return MOCK_SCHEDULE_ITEMS
}

export default api
