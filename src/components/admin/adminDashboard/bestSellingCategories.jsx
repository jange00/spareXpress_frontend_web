import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card.jsx"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { categoryData } from "./dashboardData.jsx"

const BestSellingCategories = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Best-Selling Categories</CardTitle>
        <CardDescription>Top performing product categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="value" name="Sales %" fill="#FFB800" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
export default BestSellingCategories;
