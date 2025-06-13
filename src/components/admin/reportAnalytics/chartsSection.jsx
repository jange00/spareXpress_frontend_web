import {
    Area,
    AreaChart,
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
  
  export function ChartsSection({ filteredSalesData, paymentMethodData, topCategoriesData }) {
    const formatDate = (dateString) => {
      if (!dateString) return "N/A"
      const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }
      return new Date(dateString).toLocaleDateString("en-US", options)
    }
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Performance Chart */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Sales Performance Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return `${date.getDate()}/${date.getMonth() + 1}`
                  }}
                />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Sales"]} labelFormatter={(label) => formatDate(label)} />
                <Legend />
                <Line type="monotone" dataKey="sales" name="Sales ($)" stroke="#0088FE" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#FFB800" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
  
        {/* Revenue by Payment Method */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Revenue Breakdown by Payment Method</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
  
        {/* Top Selling Categories */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Top Selling Categories</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCategoriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                <Legend />
                <Bar dataKey="sales" name="Sales ($)" fill="#0088FE">
                  {topCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
  
        {/* Monthly Order Trends */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Monthly Order Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return `${date.getDate()}/${date.getMonth() + 1}`
                  }}
                />
                <YAxis />
                <Tooltip formatter={(value) => [value, "Orders"]} labelFormatter={(label) => formatDate(label)} />
                <Legend />
                <Area type="monotone" dataKey="orders" name="Orders" stroke="#00C49F" fill="#00C49F" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
  