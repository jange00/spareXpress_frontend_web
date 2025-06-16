import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { TrendingUp } from "lucide-react"

const BestSellingProducts = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Best-Selling Products</CardTitle>
          <CardDescription>Top performing products by sales</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          <TrendingUp className="mr-2 h-4 w-4" />
          View Report
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">SSD 1TB</TableCell>
              <TableCell>Storage</TableCell>
              <TableCell className="text-right">120</TableCell>
              <TableCell className="text-right">$30,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Brake Pads</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell className="text-right">95</TableCell>
              <TableCell className="text-right">$15,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Graphics Card</TableCell>
              <TableCell>GPU</TableCell>
              <TableCell className="text-right">60</TableCell>
              <TableCell className="text-right">$50,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Oil Filter</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell className="text-right">85</TableCell>
              <TableCell className="text-right">$8,500</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Spark Plugs</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell className="text-right">120</TableCell>
              <TableCell className="text-right">$9,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default BestSellingProducts
