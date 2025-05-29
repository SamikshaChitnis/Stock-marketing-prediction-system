
import { HistoricalData, PredictionResult } from "./api";
import { toast } from "sonner";

// Function to simulate ML prediction
export const predictStockPrice = async (
  ticker: string,
  days: number,
  historicalData: HistoricalData[]
): Promise<PredictionResult> => {
  try {
    // In a real app, this would use an actual ML model
    // For demo, we'll simulate predictions with simple algorithm
    
    // Get the last 10 closing prices or all if less than 10
    const closingPrices = historicalData.map(d => d.close);
    const recentPrices = closingPrices.slice(-Math.min(10, closingPrices.length));
    
    // Calculate average change percentage
    let avgChangePercent = 0;
    for (let i = 1; i < recentPrices.length; i++) {
      const changePercent = (recentPrices[i] - recentPrices[i-1]) / recentPrices[i-1];
      avgChangePercent += changePercent;
    }
    avgChangePercent = avgChangePercent / (recentPrices.length - 1);
    
    // Add some randomness to make it more realistic
    const volatility = 0.015; // 1.5% volatility
    
    // Generate future dates
    const lastDate = new Date(historicalData[historicalData.length - 1].date);
    const futureDates: string[] = [];
    const predictions: number[] = [];
    
    let previousPrice = closingPrices[closingPrices.length - 1];
    
    for (let i = 1; i <= days; i++) {
      const futureDate = new Date(lastDate);
      futureDate.setDate(lastDate.getDate() + i);
      
      // Skip weekends
      if (futureDate.getDay() === 0 || futureDate.getDay() === 6) {
        days++; // Add an extra day to compensate for weekend
        continue;
      }
      
      futureDates.push(futureDate.toISOString().split('T')[0]);
      
      // Calculate new price with average change + random noise
      const randomFactor = 1 + (Math.random() * 2 - 1) * volatility;
      const nextChangePercent = avgChangePercent * randomFactor;
      const nextPrice = previousPrice * (1 + nextChangePercent);
      
      predictions.push(Number(nextPrice.toFixed(2)));
      previousPrice = nextPrice;
    }
    
    // Simulate a prediction accuracy (in a real model, this would come from the model evaluation)
    const accuracy = 75 + Math.random() * 15; // Random accuracy between 75-90%
    
    return {
      ticker,
      prediction: predictions,
      dates: futureDates,
      accuracy: Number(accuracy.toFixed(2)),
      historicalData
    };
  } catch (error) {
    console.error("Error generating prediction:", error);
    toast.error("Failed to generate prediction");
    throw error;
  }
};

export const downloadPredictionResults = (result: PredictionResult) => {
  try {
    // Create CSV content
    let csvContent = "date,predicted_price\n";
    
    for (let i = 0; i < result.dates.length; i++) {
      csvContent += `${result.dates[i]},${result.prediction[i]}\n`;
    }
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `${result.ticker}_prediction.csv`);
    document.body.appendChild(a);
    
    // Trigger download and cleanup
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success("Prediction results downloaded successfully");
  } catch (error) {
    console.error("Error downloading prediction results:", error);
    toast.error("Failed to download prediction results");
  }
};
