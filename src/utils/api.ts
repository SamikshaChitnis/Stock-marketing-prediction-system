
import { toast } from "sonner";

// Types
export interface StockData {
  ticker: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  previousClose: number;
  marketCap?: number;
}

export interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PredictionResult {
  ticker: string;
  prediction: number[];
  dates: string[];
  accuracy: number;
  historicalData: HistoricalData[];
}

// Sample tickers with company names
export const popularTickers = [
  { ticker: "AAPL", name: "Apple Inc." },
  { ticker: "MSFT", name: "Microsoft Corporation" },
  { ticker: "GOOGL", name: "Alphabet Inc." },
  { ticker: "AMZN", name: "Amazon.com, Inc." },
  { ticker: "META", name: "Meta Platforms, Inc." },
  { ticker: "TSLA", name: "Tesla, Inc." },
  { ticker: "NVDA", name: "NVIDIA Corporation" },
  { ticker: "JPM", name: "JPMorgan Chase & Co." }
];

// Mock API to fetch stock data
export const fetchStockData = async (ticker: string): Promise<StockData> => {
  try {
    // In a real app, this would fetch from a real API
    // For demo, we'll generate random data
    
    // Generate a random price between 50 and 500
    const currentPrice = Math.random() * 450 + 50;
    
    // Generate a random change (-5% to +5%)
    const changePercent = (Math.random() * 10) - 5;
    const change = currentPrice * (changePercent / 100);
    
    // Calculate other values based on current price
    const previousClose = currentPrice - change;
    const open = previousClose + (Math.random() * 2 - 1);
    const high = Math.max(currentPrice, open) + (Math.random() * 5);
    const low = Math.min(currentPrice, open) - (Math.random() * 5);
    const volume = Math.floor(Math.random() * 10000000) + 1000000;
    const marketCap = currentPrice * (Math.random() * 1000000000 + 10000000000);
    
    // Get company name from our list, or use ticker if not found
    const tickerInfo = popularTickers.find(t => t.ticker === ticker);
    const name = tickerInfo?.name || ticker;
    
    return {
      ticker,
      name,
      currentPrice: Number(currentPrice.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      volume,
      previousClose: Number(previousClose.toFixed(2)),
      marketCap
    };
  } catch (error) {
    console.error("Error fetching stock data:", error);
    toast.error(`Failed to fetch data for ${ticker}`);
    throw error;
  }
};

// Mock API to fetch historical stock data
export const fetchHistoricalData = async (ticker: string, days: number = 30): Promise<HistoricalData[]> => {
  try {
    const data: HistoricalData[] = [];
    
    // Generate historical data for the specified number of days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    let currentDate = new Date(startDate);
    let previousClose = Math.random() * 450 + 50; // Random starting price
    
    while (currentDate <= endDate) {
      // Skip weekends
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Generate a random change (-3% to +3%)
        const change = previousClose * ((Math.random() * 6) - 3) / 100;
        const close = previousClose + change;
        
        // Generate other values
        const open = previousClose + (Math.random() * 2 - 1);
        const high = Math.max(close, open) + (Math.random() * 2);
        const low = Math.min(close, open) - (Math.random() * 2);
        const volume = Math.floor(Math.random() * 10000000) + 1000000;
        
        data.push({
          date: currentDate.toISOString().split('T')[0],
          open: Number(open.toFixed(2)),
          high: Number(high.toFixed(2)),
          low: Number(low.toFixed(2)),
          close: Number(close.toFixed(2)),
          volume
        });
        
        previousClose = close;
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    toast.error(`Failed to fetch historical data for ${ticker}`);
    throw error;
  }
};
