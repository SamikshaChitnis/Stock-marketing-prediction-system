
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { popularTickers } from "@/utils/api";

const TickerInfo: React.FC = () => {
  // We could expand this with more detailed information about each ticker
  const tickerDetails = [
    { ticker: "AAPL", name: "Apple Inc.", sector: "Technology", exchange: "NASDAQ" },
    { ticker: "MSFT", name: "Microsoft Corporation", sector: "Technology", exchange: "NASDAQ" },
    { ticker: "GOOGL", name: "Alphabet Inc.", sector: "Technology", exchange: "NASDAQ" },
    { ticker: "AMZN", name: "Amazon.com, Inc.", sector: "Consumer Cyclical", exchange: "NASDAQ" },
    { ticker: "META", name: "Meta Platforms, Inc.", sector: "Communication Services", exchange: "NASDAQ" },
    { ticker: "TSLA", name: "Tesla, Inc.", sector: "Consumer Cyclical", exchange: "NASDAQ" },
    { ticker: "NVDA", name: "NVIDIA Corporation", sector: "Technology", exchange: "NASDAQ" },
    { ticker: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial Services", exchange: "NYSE" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supported Stock Tickers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticker</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead className="hidden sm:table-cell">Sector</TableHead>
              <TableHead className="hidden sm:table-cell">Exchange</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickerDetails.map((ticker) => (
              <TableRow key={ticker.ticker}>
                <TableCell className="font-medium">{ticker.ticker}</TableCell>
                <TableCell>{ticker.name}</TableCell>
                <TableCell className="hidden sm:table-cell">{ticker.sector}</TableCell>
                <TableCell className="hidden sm:table-cell">{ticker.exchange}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TickerInfo;
