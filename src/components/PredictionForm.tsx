
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { popularTickers } from "@/utils/api";

interface PredictionFormProps {
  onSubmit: (ticker: string, days: number) => void;
  isLoading?: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
  const [ticker, setTicker] = useState("");
  const [customTicker, setCustomTicker] = useState("");
  const [days, setDays] = useState("7");
  const [tickerError, setTickerError] = useState("");
  const [daysError, setDaysError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setTickerError("");
    setDaysError("");
    
    let isValid = true;
    let finalTicker = ticker;
    
    // Validate ticker
    if (ticker === "custom") {
      if (!customTicker.trim()) {
        setTickerError("Please enter a ticker symbol");
        isValid = false;
      } else {
        finalTicker = customTicker.toUpperCase().trim();
      }
    } else if (!finalTicker) {
      setTickerError("Please select a ticker symbol");
      isValid = false;
    }
    
    // Validate days
    const daysValue = parseInt(days);
    if (isNaN(daysValue) || daysValue < 1 || daysValue > 30) {
      setDaysError("Please enter a number between 1 and 30");
      isValid = false;
    }
    
    if (isValid) {
      onSubmit(finalTicker, daysValue);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Stock Price Prediction</CardTitle>
        <CardDescription>
          Enter a stock ticker symbol and the number of days to predict
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="ticker">Stock Ticker</Label>
            <Select value={ticker} onValueChange={setTicker}>
              <SelectTrigger id="ticker" aria-label="Select ticker">
                <SelectValue placeholder="Select ticker symbol" />
              </SelectTrigger>
              <SelectContent>
                {popularTickers.map((t) => (
                  <SelectItem key={t.ticker} value={t.ticker}>
                    {t.ticker} - {t.name}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom Ticker</SelectItem>
              </SelectContent>
            </Select>
            {ticker === "custom" && (
              <div className="mt-2">
                <Label htmlFor="customTicker">Custom Ticker Symbol</Label>
                <Input
                  id="customTicker"
                  value={customTicker}
                  onChange={(e) => setCustomTicker(e.target.value)}
                  placeholder="Enter ticker symbol (e.g., AAPL)"
                  className="mt-1"
                />
              </div>
            )}
            {tickerError && <p className="text-red-500 text-sm">{tickerError}</p>}
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="days">Days to Predict</Label>
            <Input
              id="days"
              type="number"
              min="1"
              max="30"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="Enter days (1-30)"
            />
            {daysError && <p className="text-red-500 text-sm">{daysError}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-finance-blue hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Generating Prediction..." : "Generate Prediction"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PredictionForm;
