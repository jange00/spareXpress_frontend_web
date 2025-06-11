import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { orderStatusData } from "./dashboardData"

const OrderStatistics = ({ onViewDetails }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Statistics</CardTitle>
        <CardDescription>Breakdown of order status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={orderStatusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" name="Orders">
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Count</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderStatusData.map((status) => (
                <TableRow key={status.name}>
                  <TableCell>
                    <Badge style={{ backgroundColor: status.color, color: "black" }}>{status.name}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{status.value}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => onViewDetails(status.name)} variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderStatistics
