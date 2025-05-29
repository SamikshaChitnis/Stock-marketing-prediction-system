
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TickerInfo from "@/components/TickerInfo";
import { Home } from "lucide-react";

const TickerList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-finance-darkBlue text-white py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Ticker Information</h1>
          <p className="mt-2 opacity-80">Details about supported stock tickers</p>
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
        
        {/* Ticker information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Supported Stock Tickers</h2>
          <p className="text-gray-600 mb-6">
            Our stock prediction system supports the following tickers. You can use any of these 
            tickers to generate price predictions. For best results, we recommend using tickers 
            from major companies with high trading volumes.
          </p>
          
          <TickerInfo />
        </div>
        
        {/* Additional information */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">About Stock Prediction</h2>
          <div className="prose max-w-none">
            <p>
              Our stock prediction system uses machine learning algorithms to analyze historical data 
              and predict future price movements. The system takes into account various factors including:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Historical price patterns</li>
              <li>Trading volume</li>
              <li>Market trends</li>
              <li>Technical indicators</li>
            </ul>
            <p className="mt-4">
              While our system provides valuable insights, please note that stock market predictions 
              are inherently uncertain. Past performance is not indicative of future results, and all 
              predictions should be used as just one factor in your investment decision process.
            </p>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={() => navigate("/prediction")}
              className="bg-finance-blue hover:bg-blue-700"
            >
              Make a Prediction
            </Button>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-4 border-t mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2025 Stock Prediction System</p>
          <p className="text-sm mt-1">This is a demonstration application. Not for actual investment decisions.</p>
        </div>
      </footer>
    </div>
  );
};

export default TickerList;
