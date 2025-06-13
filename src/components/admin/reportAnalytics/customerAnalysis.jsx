import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts"
  import { Users, UserPlus, RefreshCw, TrendingUp, TrendingDown } from "lucide-react"
  
  export function CustomerAnalysis({
    metrics,
    customerTypeData,
    customerAcquisitionData,
    customerLTVData,
    customerRetentionData,
  }) {
    const getGrowthColor = (growth) => {
      return growth >= 0 ? "text-green-500" : "text-red-500"
    }
  
    const getGrowthIcon = (growth) => {
      return growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />
    }
  
    return (
      <div>
        {/* Customer Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Customers */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-2xl font-bold">{metrics.totalCustomers}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className={`flex items-center ${getGrowthColor(metrics.customersGrowth)}`}>
                {getGrowthIcon(metrics.customersGrowth)}
                <span className="ml-1">{Math.abs(metrics.customersGrowth)}%</span>
              </span>
              <span className="text-xs text-gray-500 ml-2">from last month</span>
            </div>
          </div>
  
          {/* New Customers */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">New Customers</p>
                <p className="text-2xl font-bold">{metrics.newCustomers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-xs text-gray-500">
                {((metrics.newCustomers / metrics.totalCustomers) * 100).toFixed(1)}% of total
              </span>
            </div>
          </div>
  
          {/* Returning Customers */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Returning Customers</p>
                <p className="text-2xl font-bold">{metrics.returningCustomers}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-xs text-gray-500">
                {((metrics.returningCustomers / metrics.totalCustomers) * 100).toFixed(1)}% of total
              </span>
            </div>
          </div>
        </div>
  
        {/* Customer Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* New vs Returning Customers */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">New vs Returning Customers</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
  
          {/* Customer Acquisition Trend */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Customer Acquisition Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerAcquisitionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="new" name="New Customers" fill="#0088FE" />
                  <Bar dataKey="returning" name="Returning Customers" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
  
          {/* Customer Lifetime Value */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Customer Lifetime Value</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerLTVData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="segment" type="category" width={150} />
                  <Tooltip formatter={(value) => [`$${value}`, "Average LTV"]} />
                  <Legend />
                  <Bar dataKey="value" name="Avg. Lifetime Value ($)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
  
          {/* Customer Retention Rate */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Customer Retention Rate</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerRetentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Retention Rate"]} />
                  <Legend />
                  <Line type="monotone" dataKey="rate" name="Retention Rate (%)" stroke="#FF8042" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
  
        {/* Customer Segments */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Customer Segments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Segment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customers
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Avg. Order Value
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Purchase Frequency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Retention Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">New Customers</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">420</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$45.20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.2 orders/month</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Occasional Shoppers</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">320</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$65.30</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.1 orders/month</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">58%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Regular Customers</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">280</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$85.70</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3.5 orders/month</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">72%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Loyal Customers</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">180</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$120.40</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4.8 orders/month</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">88%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  