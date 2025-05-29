
import React from "react";
import { StockData } from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StockCardProps {
  stock: StockData;
  onClick?: () => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onClick }) => {
  const isPositive = stock.change >= 0;

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="bg-gradient-to-r from-finance-darkBlue to-slate-800 text-white p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">{stock.ticker}</CardTitle>
          <span className="text-sm opacity-80">{stock.name}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold">${stock.currentPrice.toFixed(2)}</span>
          <div className={`flex items-center ${isPositive ? 'text-finance-green' : 'text-finance-red'}`}>
            {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            <span className="font-medium">{stock.change.toFixed(2)}</span>
            <span className="ml-1">({stock.changePercent.toFixed(2)}%)</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Open</p>
            <p className="font-medium">${stock.open.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Previous Close</p>
            <p className="font-medium">${stock.previousClose.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">High</p>
            <p className="font-medium">${stock.high.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Low</p>
            <p className="font-medium">${stock.low.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;
