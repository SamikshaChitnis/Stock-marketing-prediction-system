
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QRCodeGeneratorProps {
  value: string;
  title?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value, title = "Prediction QR Code" }) => {
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    // Generate QR code
    const generateQRCode = async () => {
      try {
        // Create the QR code URL using a free API
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(value)}&size=200x200`;
        setQrCode(qrCodeUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    if (value) {
      generateQRCode();
    }
  }, [value]);

  const downloadQRCode = () => {
    if (qrCode) {
      const a = document.createElement("a");
      a.href = qrCode;
      a.download = "prediction-qr-code.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {qrCode ? (
          <>
            <img src={qrCode} alt="QR Code" className="mb-4" />
            <p className="text-sm text-center text-gray-500 mb-4">
              Scan this QR code to share the prediction results
            </p>
            <Button 
              onClick={downloadQRCode} 
              size="sm" 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Download QR Code
            </Button>
          </>
        ) : (
          <div className="h-[200px] w-[200px] bg-gray-200 animate-pulse-opacity flex items-center justify-center">
            <p className="text-gray-500">Generating QR code...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
