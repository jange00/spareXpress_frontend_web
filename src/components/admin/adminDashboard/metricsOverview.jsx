import { Card, CardContent } from "../ui/card"

const MetricsOverview = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {metrics.map((metric) => (
        <Card key={metric.id} className="bg-white shadow-md">
          <CardContent className="p-4 flex items-center">
            <div className="p-2 rounded-full bg-[#FFB800]/10 mr-4">
              <metric.icon className="h-6 w-6 text-[#FFB800]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-lg font-semibold">{metric.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default MetricsOverview