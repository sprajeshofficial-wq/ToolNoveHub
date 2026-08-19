'use client';

import { useState } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, RefreshCw, QrCode as QrCodeIcon } from 'lucide-react';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateQR = async () => {
    if (!text.trim()) {
      setError('Please enter text or URL');
      return;
    }

    setLoading(true);
    setError('');
    setQrCodeUrl('');

    try {
      const url = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1e293b',
          light: '#ffffff',
        },
      });
      setQrCodeUrl(url);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.download = `qrcode-${Date.now()}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const copyToClipboard = async () => {
    if (!qrCodeUrl) return;
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      alert('QR Code copied to clipboard!');
    } catch {
      alert('Failed to copy. Please download instead.');
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-3 shadow-lg shadow-emerald-500/25">
            <QrCodeIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">QR Code Generator</h1>
          <p className="mt-2 text-slate-600">Generate QR codes instantly for any URL or text.</p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          {/* Input */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Enter Text or URL</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com or any text"
                className="input-field mt-1"
                onKeyDown={(e) => e.key === 'Enter' && generateQR()}
              />
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>

            <button
              onClick={generateQR}
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate QR Code'
              )}
            </button>
          </div>

          {/* Result */}
          {qrCodeUrl && (
            <div className="mt-8 pt-8 border-t border-slate-200/50">
              <div className="flex flex-col items-center">
                <div className="relative rounded-2xl bg-white p-4 shadow-lg">
                  <img src={qrCodeUrl} alt="QR Code" className="h-64 w-64" />
                </div>

                <div className="mt-6 flex gap-3 flex-wrap justify-center">
                  <button
                    onClick={downloadQR}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
                  >
                    <Download className="h-4 w-4" />
                    Download PNG
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Image
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 rounded-2xl bg-indigo-50/50 p-4 border border-indigo-200/50">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-indigo-600">💡 Pro Tip:</span> Your QR code is generated 
            entirely in your browser. Nothing is sent to our servers — <span className="font-medium">100% private</span>.
          </p>
        </div>
      </div>
    </div>
  );
}