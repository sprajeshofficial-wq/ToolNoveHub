'use client';

import { useState } from 'react';
import QRCode from 'qrcode';
import { 
  Download, 
  Copy, 
  RefreshCw, 
  QrCode as QrCodeIcon, 
  Wifi, 
  Link2, 
  Check,
  Eye,
  EyeOff
} from 'lucide-react';

export default function QRCodeGenerator() {
  const [activeTab, setActiveTab] = useState<'text' | 'wifi'>('text');
  
  // Text/URL mode
  const [text, setText] = useState('');
  
  // Wi-Fi mode
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiSecurity, setWifiSecurity] = useState('WPA2');
  const [wifiHidden, setWifiHidden] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate QR Code
  const generateQR = async () => {
    setLoading(true);
    setError('');
    setQrCodeUrl('');

    try {
      let qrData = '';
      
      if (activeTab === 'wifi') {
        if (!wifiSsid.trim()) {
          setError('Please enter a Wi-Fi network name (SSID)');
          setLoading(false);
          return;
        }
        qrData = `WIFI:T:${wifiSecurity};S:${wifiSsid};`;
        if (wifiPassword) {
          qrData += `P:${wifiPassword};`;
        }
        if (wifiHidden) {
          qrData += 'H:true;';
        }
        qrData += ';';
      } else {
        if (!text.trim()) {
          setError('Please enter text or URL');
          setLoading(false);
          return;
        }
        qrData = text;
      }

      const url = await QRCode.toDataURL(qrData, {
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

  // Download QR Code
  const downloadQR = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    const filename = activeTab === 'wifi' 
      ? `wifi-${wifiSsid || 'network'}-${Date.now()}.png`
      : `qrcode-${Date.now()}.png`;
    link.download = filename;
    link.href = qrCodeUrl;
    link.click();
  };

  // Copy QR Code
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Failed to copy. Please download instead.');
    }
  };

  // Fill sample Wi-Fi data
  const fillWifiSample = () => {
    setWifiSsid('MyHomeWiFi');
    setWifiPassword('SecurePassword123');
    setWifiSecurity('WPA2');
    setWifiHidden(false);
  };

  // Clear all
  const clearAll = () => {
    setText('');
    setWifiSsid('');
    setWifiPassword('');
    setQrCodeUrl('');
    setError('');
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200/50 pb-4">
        <button
          onClick={() => { setActiveTab('text'); setQrCodeUrl(''); setError(''); }}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
            activeTab === 'text'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Link2 className="h-4 w-4" />
          Text / URL
        </button>
        <button
          onClick={() => { setActiveTab('wifi'); setQrCodeUrl(''); setError(''); }}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
            activeTab === 'wifi'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Wifi className="h-4 w-4" />
          Wi-Fi Network
        </button>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        {activeTab === 'text' && (
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
        )}

        {activeTab === 'wifi' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Network Name (SSID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="MyHomeWiFi"
                  className="input-field mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Security Type</label>
                <select
                  value={wifiSecurity}
                  onChange={(e) => setWifiSecurity(e.target.value)}
                  className="input-field mt-1"
                >
                  <option value="WPA2">WPA2 (Most Common)</option>
                  <option value="WPA3">WPA3</option>
                  <option value="WPA">WPA</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No Password (Open)</option>
                </select>
              </div>
            </div>

            {wifiSecurity !== 'nopass' && (
              <div>
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder="Enter Wi-Fi password"
                    className="input-field pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wifiHidden}
                  onChange={(e) => setWifiHidden(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-slate-600">Hidden network (SSID not broadcasted)</span>
              </label>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="button"
              onClick={fillWifiSample}
              className="text-sm text-emerald-600 hover:text-emerald-700 underline transition-colors"
            >
              📝 Fill with sample Wi-Fi data
            </button>
          </div>
        )}

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
            <>
              <QrCodeIcon className="mr-2 h-4 w-4" />
              Generate QR Code
            </>
          )}
        </button>
      </div>

      {/* Result */}
      {qrCodeUrl && (
        <div className="mt-8 pt-8 border-t border-slate-200/50">
          <div className="flex flex-col items-center">
            <div className="mb-2 text-sm font-medium text-slate-500">
              {activeTab === 'wifi' ? (
                <span className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-emerald-600" />
                  Wi-Fi QR Code — {wifiSsid}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-emerald-600" />
                  QR Code
                </span>
              )}
            </div>

            <div className="relative rounded-2xl bg-white p-4 shadow-lg">
              <img src={qrCodeUrl} alt="QR Code" className="h-64 w-64" />
            </div>

            <div className="mt-6 flex gap-3 flex-wrap justify-center">
              <button
                onClick={downloadQR}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
              >
                <Download className="h-4 w-4" />
                Download PNG
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Image
                  </>
                )}
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200"
              >
                <RefreshCw className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 rounded-2xl bg-indigo-50/50 p-4 border border-indigo-200/50">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-indigo-600">💡 Pro Tip:</span> 
          {activeTab === 'wifi' ? (
            <>
              Your Wi-Fi QR code lets guests connect instantly — no need to type passwords!
              <span className="block mt-1 text-xs text-slate-400">
                Compatible with iPhone (Camera app), Android (Camera app), and most QR code readers.
              </span>
            </>
          ) : (
            <> Your QR code is generated entirely in your browser. Nothing is sent to our servers — <span className="font-medium">100% private</span>.</>
          )}
        </p>
      </div>

      {/* Wi-Fi Instructions */}
      {activeTab === 'wifi' && qrCodeUrl && (
        <div className="mt-4 rounded-2xl bg-emerald-50/50 p-4 border border-emerald-200/50">
          <h4 className="text-sm font-semibold text-emerald-700">📱 How to Connect</h4>
          <ul className="mt-2 text-sm text-slate-600 space-y-1">
            <li><span className="font-medium">iPhone:</span> Open Camera app → Point at QR code → Tap notification</li>
            <li><span className="font-medium">Android:</span> Open Camera app → Point at QR code → Tap connect</li>
            <li><span className="font-medium">Other:</span> Use any QR code reader app → Scan → Connect automatically</li>
          </ul>
        </div>
      )}
    </div>
  );
}