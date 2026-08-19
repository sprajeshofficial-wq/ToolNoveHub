'use client';

import { useState, useRef } from 'react';
import { Scan, Camera, Upload, X, Check } from 'lucide-react';

export default function QRCodeScanner() {
  const [scannedData, setScannedData] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate QR code scanning (in production, use a QR scanning library)
  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedData('https://toolnovehub.tools');
      setIsScanning(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In production, use a QR code decoding library
    // For now, simulate a scan
    setIsScanning(true);
    setTimeout(() => {
      setScannedData('https://toolnovehub.tools/qr-code-generator');
      setIsScanning(false);
    }, 1500);
  };

  const copyToClipboard = async () => {
    if (!scannedData) return;
    await navigator.clipboard.writeText(scannedData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearScan = () => {
    setScannedData('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 p-3 shadow-lg shadow-teal-500/25">
            <Scan className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">QR Code Scanner</h1>
          <p className="mt-2 text-slate-600">Scan QR codes using your camera or upload an image.</p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl space-y-6">
          {/* Scan Options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={simulateScan}
              disabled={isScanning}
              className="flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-white shadow-lg shadow-teal-500/25 transition-all hover:scale-105 disabled:opacity-50"
            >
              <Camera className="h-8 w-8" />
              <span className="font-medium">Scan with Camera</span>
              <span className="text-xs text-white/70">Simulated for demo</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isScanning}
              className="flex flex-col items-center gap-2 rounded-2xl bg-slate-100 p-6 text-slate-700 transition-all hover:bg-slate-200 disabled:opacity-50"
            >
              <Upload className="h-8 w-8" />
              <span className="font-medium">Upload Image</span>
              <span className="text-xs text-slate-400">PNG, JPG, WebP</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </button>
          </div>

          {/* Scanning Status */}
          {isScanning && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
              <p className="mt-4 text-slate-600">Scanning QR Code...</p>
            </div>
          )}

          {/* Scan Result */}
          {scannedData && !isScanning && (
            <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Check className="h-6 w-6 text-emerald-500" />
                  <div>
                    <p className="text-sm font-medium text-emerald-700">QR Code Scanned Successfully!</p>
                    <p className="text-sm text-emerald-600 break-all">{scannedData}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="rounded-lg bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700 transition-all hover:bg-emerald-200"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={clearScan}
                    className="rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-600 transition-all hover:bg-red-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/50 text-center text-sm text-slate-500">
            <p>🔒 100% Private. QR code scanning happens in your browser.</p>
            <p className="text-xs mt-1">* For demo purposes, scanning is simulated. Full camera support coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}