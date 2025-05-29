
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchStockData, fetchHistoricalData, StockData, popularTickers } from "@/utils/api";
import StockCard from "@/components/StockCard";
import StockChart from "@/components/StockChart";
import { toast } from "sonner";

const Index = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStockData = async () => {
      try {
        const stockPromises = popularTickers.slice(0, 4).map(ticker => 
          fetchStockData(ticker.ticker)
        );
        
        const stockResults = await Promise.all(stockPromises);
        setStocks(stockResults);
        
        // Select the first stock by default
        if (stockResults.length > 0) {
          setSelectedStock(stockResults[0]);
          loadHistoricalData(stockResults[0].ticker);
        }
      } catch (error) {
        console.error("Error loading stock data:", error);
        toast.error("Failed to load stock data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStockData();
  }, []);

  const loadHistoricalData = async (ticker: string) => {
    try {
      const data = await fetchHistoricalData(ticker, 30);
      setHistoricalData(data);
    } catch (error) {
      console.error("Error loading historical data:", error);
      toast.error(`Failed to load historical data for ${ticker}`);
    }
  };

  const handleStockSelect = (stock: StockData) => {
    setSelectedStock(stock);
    loadHistoricalData(stock.ticker);
  };

  const navigateToPrediction = () => {
    navigate("/prediction");
  };

  const navigateToTickerInfo = () => {
    navigate("/tickers");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-finance-darkBlue text-white py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Stock Prediction System</h1>
          <p className="mt-2 opacity-80">Real-time stock data and predictions using machine learning</p>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto py-8 px-4">
        {/* Navigation buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            onClick={navigateToPrediction}
            className="bg-finance-blue hover:bg-blue-700"
          >
            Make a Prediction
          </Button>
          <Button
            onClick={navigateToTickerInfo}
            variant="outline"
            className="border-finance-blue text-finance-blue hover:bg-finance-lightBlue"
          >
            View Ticker Information
          </Button>
        </div>
        
        {/* Stock data and chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stock cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Popular Stocks</h2>
            {isLoading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, index) => (
                <div 
                  key={index} 
                  className="h-40 bg-white rounded-lg shadow animate-pulse-opacity"
                />
              ))
            ) : (
              stocks.map(stock => (
                <StockCard 
                  key={stock.ticker} 
                  stock={stock}
                  onClick={() => handleStockSelect(stock)}
                />
              ))
            )}
          </div>
          
          {/* Stock chart */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">
              {selectedStock ? `${selectedStock.name} (${selectedStock.ticker})` : "Stock Chart"}
            </h2>
            {selectedStock && historicalData.length > 0 ? (
              <StockChart data={historicalData} />
            ) : (
              <div className="h-96 bg-white rounded-lg shadow flex items-center justify-center">
                <p className="text-gray-500">
                  {isLoading ? "Loading chart data..." : "Select a stock to view chart"}
                </p>
              </div>
            )}
            
            {/* Stock details */}
            {selectedStock && (
              <div className="mt-6 bg-white rounded-lg shadow p-4">
                <h3 className="font-bold text-lg mb-2">Stock Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Market Cap</p>
                    <p className="font-medium">
                      ${selectedStock.marketCap ? (selectedStock.marketCap / 1000000000).toFixed(2) + "B" : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Volume</p>
                    <p className="font-medium">
                      {selectedStock.volume.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Daily Range</p>
                    <p className="font-medium">
                      ${selectedStock.low.toFixed(2)} - ${selectedStock.high.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Previous Close</p>
                    <p className="font-medium">${selectedStock.previousClose.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-4 border-t">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 Stock Prediction System</p>
          <p className="text-sm mt-1">This is a demonstration application. Not for actual investment decisions.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
