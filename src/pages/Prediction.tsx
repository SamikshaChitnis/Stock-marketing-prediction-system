
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchHistoricalData, PredictionResult } from "@/utils/api";
import { predictStockPrice, downloadPredictionResults } from "@/utils/stockPrediction";
import PredictionForm from "@/components/PredictionForm";
import StockChart from "@/components/StockChart";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { toast } from "sonner";
import { Download, Home } from "lucide-react";

const Prediction: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const navigate = useNavigate();

  const handlePredictionSubmit = async (ticker: string, days: number) => {
    setIsLoading(true);
    try {
      // Fetch historical data
      const historicalData = await fetchHistoricalData(ticker, 30);
      
      // Generate prediction
      const prediction = await predictStockPrice(ticker, days, historicalData);
      setResult(prediction);
      
      toast.success(`Generated prediction for ${ticker} for the next ${days} days`);
    } catch (error) {
      console.error("Error generating prediction:", error);
      toast.error("Failed to generate prediction");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadPredictionResults(result);
    }
  };

  // Prepare chart data if we have prediction results
  const prepareChartData = () => {
    if (!result) return { historicalData: [], combinedData: [] };
    
    // Convert historical data to chart format
    const historicalData = result.historicalData;
    
    // Convert prediction data to chart format
    const predictionData = result.dates.map((date, i) => ({
      date,
      predicted: result.prediction[i]
    }));
    
    return { historicalData, predictionData };
  };

  const { historicalData, predictionData } = prepareChartData();

  // Create QR code value (in a real app, you might create a unique URL to this prediction)
  const qrCodeValue = result 
    ? `Stock: ${result.ticker}, Predictions: ${result.prediction.join(', ')}, Accuracy: ${result.accuracy}%`
    : "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-finance-darkBlue text-white py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Stock Price Prediction</h1>
          <p className="mt-2 opacity-80">Generate ML-based predictions for stock prices</p>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto py-8 px-4">
        {/* Navigation buttons */}
        <div className="mb-8">
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        
        {/* Prediction form or results */}
        {!result ? (
          <div className="max-w-3xl mx-auto">
            <PredictionForm onSubmit={handlePredictionSubmit} isLoading={isLoading} />
          </div>
        ) : (
          <div>
            {/* Prediction results */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                Prediction Results for {result.ticker}
              </h2>
              <p className="text-gray-600">
                Prediction accuracy: <span className="font-medium">{result.accuracy}%</span>
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Button 
                onClick={handleDownload}
                className="bg-finance-blue hover:bg-blue-700 flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Download Results
              </Button>
              <Button 
                onClick={() => setResult(null)}
                variant="outline"
              >
                Make Another Prediction
              </Button>
            </div>
            
            {/* Results grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Charts */}
              <div className="lg:col-span-2 space-y-6">
                {/* Prediction chart */}
                <StockChart 
                  data={historicalData}
                  predictedData={predictionData}
                  title={`${result.ticker} - Actual vs Predicted Prices`}
                />
                
                {/* Prediction table */}
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-lg font-bold mb-4">Predicted Prices</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">Date</th>
                          <th className="text-right py-2 px-4">Price ($)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.dates.map((date, index) => (
                          <tr key={date} className="border-b">
                            <td className="py-2 px-4">{date}</td>
                            <td className="text-right py-2 px-4">
                              ${result.prediction[index].toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* QR Code */}
              <div>
                <QRCodeGenerator 
                  value={qrCodeValue} 
                  title="Share Prediction"
                />
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-4 border-t mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 Stock Prediction System</p>
          <p className="text-sm mt-1">Predictions are for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Prediction;
