import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { salesData } from "./dashboardData"

const SalesRevenueChart = ({ timeRange }) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Sales & Revenue</CardTitle>
        <CardDescription>
          Revenue comparison ({timeRange === "weekly" ? "This week vs Last week" : "This month vs Last month"})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFB800" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFB800" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLastYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Current Period"
                stroke="#FFB800"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="lastYear"
                name="Previous Period"
                stroke="#0284c7"
                fillOpacity={1}
                fill="url(#colorLastYear)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default SalesRevenueChart