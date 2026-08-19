'use client';

import { useState, useRef } from 'react';
import { Crop, Upload, Download, RefreshCw } from 'lucide-react';

export default function ImageCropper() {
  const [image, setImage] = useState<string | null>(null);
  const [cropWidth, setCropWidth] = useState(300);
  const [cropHeight, setCropHeight] = useState(300);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setCroppedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const cropImage = () => {
    if (!image) return;
    setLoading(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext('2d');
      const sx = (img.width - cropWidth) / 2;
      const sy = (img.height - cropHeight) / 2;
      ctx?.drawImage(img, sx, sy, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
      setCroppedImage(canvas.toDataURL('image/png'));
      setLoading(false);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!croppedImage) return;
    const link = document.createElement('a');
    link.download = `cropped-${cropWidth}x${cropHeight}.png`;
    link.href = croppedImage;
    link.click();
  };

  const resetAll = () => {
    setImage(null);
    setCroppedImage(null);
    setCropWidth(300);
    setCropHeight(300);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center transition-all hover:border-sky-500 hover:bg-sky-50/30">
          <Upload className="mx-auto h-12 w-12 text-slate-400" />
          <p className="mt-3 text-sm text-slate-600">Click to upload an image</p>
          <p className="text-xs text-slate-400">PNG, JPG, WebP supported</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-700">Original</p>
              <div className="mt-2 overflow-hidden rounded-xl bg-slate-100">
                <img src={image} alt="Original" className="max-h-64 w-full object-contain" />
              </div>
            </div>
            {croppedImage && (
              <div>
                <p className="text-sm font-medium text-slate-700">Cropped</p>
                <div className="mt-2 overflow-hidden rounded-xl bg-slate-100">
                  <img src={croppedImage} alt="Cropped" className="max-h-64 w-full object-contain" />
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-slate-700">Width (px)</label>
              <input type="number" value={cropWidth} onChange={(e) => setCropWidth(Number(e.target.value))} className="input-field mt-1" min={1} max={2000} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Height (px)</label>
              <input type="number" value={cropHeight} onChange={(e) => setCropHeight(Number(e.target.value))} className="input-field mt-1" min={1} max={2000} />
            </div>
            <div className="flex items-end gap-2">
              <button onClick={cropImage} disabled={loading} className="flex-1 btn-primary">
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <><Crop className="mr-2 h-4 w-4" /> Crop</>}
              </button>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            {croppedImage && (
              <button onClick={downloadImage} className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:scale-105">
                <Download className="h-4 w-4" /> Download Cropped Image
              </button>
            )}
            <button onClick={resetAll} className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200">
              Upload New Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}