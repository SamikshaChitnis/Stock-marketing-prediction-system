
import React from "react";
import { HistoricalData } from "@/utils/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps
} from "recharts";

interface StockChartProps {
  data: HistoricalData[];
  predictedData?: { date: string; close: number }[];
  title?: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, predictedData, title }) => {
  // Combine historical and predicted data if available
  const combinedData = [...data];
  
  if (predictedData && predictedData.length > 0) {
    // Add prediction data with a different key for the line
    combinedData.push(...predictedData);
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // Custom tooltip to display the full date and price
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const isActual = "open" in dataPoint;
      
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-bold">{dataPoint.date}</p>
          <p className="text-finance-blue">
            ${(dataPoint as any).close?.toFixed(2) || (dataPoint as any).predicted?.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">{isActual ? "Actual" : "Predicted"}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-4">
      {title && <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={combinedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={['auto', 'auto']}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {!predictedData && (
            <Line
              type="monotone"
              dataKey="close"
              stroke="#0EA5E9"
              strokeWidth={2}
              dot={{ r: 1 }}
              activeDot={{ r: 5 }}
              name="Price"
            />
          )}
          {predictedData && (
            <>
              <Line
                type="monotone"
                dataKey="close"
                stroke="#0EA5E9"
                strokeWidth={2}
                dot={{ r: 1 }}
                activeDot={{ r: 5 }}
                name="Actual"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 1 }}
                activeDot={{ r: 5 }}
                name="Predicted"
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
