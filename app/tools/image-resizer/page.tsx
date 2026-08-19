'use client';

import { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Download, RefreshCw } from 'lucide-react';

export default function ImageResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = event.target?.result as string;
      setImage(event.target?.result as string);
      setResizedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = () => {
    if (!image) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      setResizedImage(canvas.toDataURL('image/png'));
      setLoading(false);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!resizedImage) return;
    const link = document.createElement('a');
    link.download = `resized-${width}x${height}.png`;
    link.href = resizedImage;
    link.click();
  };

  const resetAll = () => {
    setImage(null);
    setResizedImage(null);
    setWidth(800);
    setHeight(600);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 shadow-lg shadow-blue-500/25">
            <ImageIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Image Resizer</h1>
          <p className="mt-2 text-slate-600">Resize images in bulk with custom dimensions.</p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 shadow-xl">
          {/* Upload */}
          {!image ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center transition-all hover:border-indigo-500 hover:bg-indigo-50/30"
            >
              <Upload className="mx-auto h-12 w-12 text-slate-400" />
              <p className="mt-3 text-sm text-slate-600">
                Click to upload an image
              </p>
              <p className="text-xs text-slate-400">PNG, JPG, WebP supported</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Preview */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-slate-700">Original</p>
                  <div className="mt-2 overflow-hidden rounded-xl bg-slate-100">
                    <img src={image} alt="Original" className="max-h-64 w-full object-contain" />
                  </div>
                </div>
                {resizedImage && (
                  <div>
                    <p className="text-sm font-medium text-slate-700">Resized</p>
                    <div className="mt-2 overflow-hidden rounded-xl bg-slate-100">
                      <img src={resizedImage} alt="Resized" className="max-h-64 w-full object-contain" />
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium text-slate-700">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="input-field mt-1"
                    min={1}
                    max={10000}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="input-field mt-1"
                    min={1}
                    max={10000}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <button
                    onClick={resizeImage}
                    disabled={loading}
                    className="flex-1 btn-primary"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      'Resize'
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 flex-wrap">
                {resizedImage && (
                  <button
                    onClick={downloadImage}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
                  >
                    <Download className="h-4 w-4" />
                    Download Image
                  </button>
                )}
                <button
                  onClick={resetAll}
                  className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200"
                >
                  Upload New Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 rounded-2xl bg-blue-50/50 p-4 border border-blue-200/50">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-blue-600">🔒 Privacy:</span> All image processing happens 
            entirely in your browser. Your images are never uploaded to any server — <span className="font-medium">100% private</span>.
          </p>
        </div>
      </div>
    </div>
  );
}