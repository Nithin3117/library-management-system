import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Chart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Library Statistics
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Overview of books and students
          </p>
        </div>

      </div>

      <div className="w-full h-[300px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 13 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 13 }}
            />

            <Tooltip
              cursor={{ fill: "rgba(37, 99, 235, 0.08)" }}
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            <Bar
              dataKey="value"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
              barSize={45}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Chart;