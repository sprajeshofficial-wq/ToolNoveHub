"use client";

import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import {
  Camera,
  Check,
  Copy,
  Scan,
  Upload,
  X,
} from "lucide-react";

export default function QRCodeScanner() {
  const [scannedData, setScannedData] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanTimerRef = useRef<number | null>(null);
  const scanningRef = useRef(false);

  useEffect(() => {
    return () => {
      stopCamera();

      if (scanTimerRef.current !== null) {
        window.clearTimeout(scanTimerRef.current);
      }
    };
  }, []);

  function stopCamera() {
    scanningRef.current = false;

    if (scanTimerRef.current !== null) {
      window.clearTimeout(scanTimerRef.current);
      scanTimerRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  }

  function resetResult() {
    setScannedData("");
    setCopied(false);
    setError("");
  }

  async function startCamera() {
    resetResult();

    if (!navigator.mediaDevices?.getUserMedia) {
      setError(
        "Camera scanning is not supported by this browser. Please use Upload Image instead.",
      );
      return;
    }

    stopCamera();

    setIsScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
          width: {
            ideal: 1280,
          },
          height: {
            ideal: 720,
          },
        },
        audio: false,
      });

      streamRef.current = stream;

      const video = videoRef.current;

      if (!video) {
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;

        throw new Error("Camera preview could not be initialized.");
      }

      video.srcObject = stream;
      video.setAttribute("playsinline", "true");
      video.muted = true;

      await video.play();

      setCameraActive(true);
      scanningRef.current = true;

      scanCamera();
    } catch (cameraError) {
      stopCamera();

      if (
        cameraError instanceof DOMException &&
        cameraError.name === "NotAllowedError"
      ) {
        setError(
          "Camera access was denied. Allow camera access for localhost in Chrome and try again. You can also use Upload Image.",
        );
      } else if (
        cameraError instanceof DOMException &&
        cameraError.name === "NotFoundError"
      ) {
        setError(
          "No camera was found on this device. Please connect a camera or use Upload Image.",
        );
      } else if (
        cameraError instanceof DOMException &&
        cameraError.name === "NotReadableError"
      ) {
        setError(
          "The camera is currently being used by another application. Close other camera apps and try again.",
        );
      } else if (
        cameraError instanceof DOMException &&
        cameraError.name === "SecurityError"
      ) {
        setError(
          "Camera access was blocked by your browser or system settings. Please check camera permissions.",
        );
      } else {
        setError(
          "Unable to access the camera. Please check your camera permissions or use Upload Image.",
        );
      }
    } finally {
      setIsScanning(false);
    }
  }

  function scanCamera() {
    if (!scanningRef.current) {
      return;
    }

    const video = videoRef.current;

    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      scanTimerRef.current = window.setTimeout(scanCamera, 200);
      return;
    }

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      scanTimerRef.current = window.setTimeout(scanCamera, 200);
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!context) {
      stopCamera();
      setError("Unable to process the camera image.");
      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    try {
      const imageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      const code = jsQR(
        imageData.data,
        imageData.width,
        imageData.height,
        {
          inversionAttempts: "attemptBoth",
        },
      );

      if (code?.data) {
        scanningRef.current = false;

        setScannedData(code.data);
        setIsScanning(false);

        stopCamera();

        return;
      }
    } catch {
      // Continue scanning the next camera frame.
    }

    scanTimerRef.current = window.setTimeout(scanCamera, 150);
  }

  function scanUploadedImage(file: File) {
    resetResult();
    setIsScanning(true);

    const imageUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const context = canvas.getContext("2d", {
          willReadFrequently: true,
        });

        if (!context) {
          throw new Error("Unable to process image.");
        }

        context.drawImage(
          image,
          0,
          0,
          canvas.width,
          canvas.height,
        );

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );

        const code = jsQR(
          imageData.data,
          imageData.width,
          imageData.height,
          {
            inversionAttempts: "attemptBoth",
          },
        );

        if (code?.data) {
          setScannedData(code.data);
        } else {
          setError(
            "No readable QR code was found in this image. Please try a clearer image.",
          );
        }
      } catch {
        setError(
          "Unable to process this image. Please try another image.",
        );
      } finally {
        URL.revokeObjectURL(imageUrl);
        setIsScanning(false);
      }
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);

      setError(
        "Unable to load the selected image. Please try another image.",
      );

      setIsScanning(false);
    };

    image.src = imageUrl;
  }

  function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Please select an image smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    stopCamera();
    scanUploadedImage(file);
  }

  async function copyToClipboard() {
    if (!scannedData) {
      return;
    }

    try {
      await navigator.clipboard.writeText(scannedData);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the scanned content.");
    }
  }

  function clearScan() {
    stopCamera();
    resetResult();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setIsScanning(false);
  }

  return (
    <div className="space-y-6">
      {/* Camera preview */}
      {cameraActive && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="aspect-video w-full object-cover"
            aria-label="Camera preview for QR code scanning"
          />

          <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-slate-950 px-4 py-3">
            <p className="text-sm text-white">
              Point your camera at a QR code.
            </p>

            <button
              type="button"
              onClick={() => {
                stopCamera();
                setIsScanning(false);
              }}
              className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20"
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Scanner buttons */}
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={startCamera}
          disabled={isScanning || cameraActive}
          className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-white shadow-lg shadow-teal-500/25 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Camera
            className="h-8 w-8"
            aria-hidden="true"
          />

          <span className="font-semibold">
            Scan with Camera
          </span>

          <span className="text-xs text-white/80">
            Use your device camera
          </span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isScanning}
          className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-2xl bg-slate-100 p-6 text-slate-700 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload
            className="h-8 w-8"
            aria-hidden="true"
          />

          <span className="font-semibold">
            Upload Image
          </span>

          <span className="text-xs text-slate-500">
            PNG, JPG, WebP
          </span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFileUpload}
          className="hidden"
          aria-label="Upload an image containing a QR code"
        />
      </div>

      {/* Scanning status */}
      {isScanning && (
        <div
          className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-5 text-center"
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
            <Scan
              className="h-6 w-6 animate-pulse text-teal-600"
              aria-hidden="true"
            />
          </div>

          <p className="mt-3 font-medium text-teal-800">
            Scanning QR Code...
          </p>

          <p className="mt-1 text-sm text-teal-600">
            Point the camera at a QR code or wait for the image
            to be processed.
          </p>
        </div>
      )}

      {/* Error */}
      {error && !isScanning && (
        <div
          className="rounded-xl border border-red-200 bg-red-50 p-4"
          role="alert"
        >
          <p className="text-sm leading-6 text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Result */}
      {scannedData && !isScanning && (
        <div
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <Check
                className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600"
                aria-hidden="true"
              />

              <div className="min-w-0">
                <p className="font-semibold text-emerald-800">
                  QR Code Scanned Successfully
                </p>

                <p className="mt-2 break-all text-sm leading-6 text-emerald-700">
                  {scannedData}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-100 px-3 py-2 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-200"
              >
                <Copy
                  className="h-4 w-4"
                  aria-hidden="true"
                />

                {copied ? "Copied!" : "Copy"}
              </button>

              <button
                type="button"
                onClick={clearScan}
                aria-label="Clear scanned QR code"
                className="inline-flex items-center justify-center rounded-lg bg-red-100 px-3 py-2 text-red-700 transition-colors hover:bg-red-200"
              >
                <X
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
        <p className="text-sm font-medium text-slate-700">
          🔒 Browser-based QR scanning
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          QR decoding is performed in your browser. Uploaded
          images are processed locally for scanning. No account
          or signup is required.
        </p>
      </div>
    </div>
  );
}