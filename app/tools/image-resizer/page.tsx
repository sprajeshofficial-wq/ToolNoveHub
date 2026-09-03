"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

type OutputFormat = "original" | "png" | "jpeg" | "webp";

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [outputFormat, setOutputFormat] =
    useState<OutputFormat>("original");
  const [quality, setQuality] = useState(90);

  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const resetImage = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setFile(null);
    setPreviewUrl("");
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth("");
    setHeight("");
    setError("");
    setIsProcessing(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setError("");

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const url = URL.createObjectURL(selectedFile);
    objectUrlRef.current = url;

    const image = new Image();

    image.onload = () => {
      setFile(selectedFile);
      setPreviewUrl(url);
      setOriginalWidth(image.naturalWidth);
      setOriginalHeight(image.naturalHeight);
      setWidth(String(image.naturalWidth));
      setHeight(String(image.naturalHeight));
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      objectUrlRef.current = null;
      setError("Unable to read this image. Please try another file.");
    };

    image.src = url;
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);

    if (!keepAspectRatio || !originalWidth || !originalHeight) {
      return;
    }

    const newWidth = Number(value);

    if (!Number.isFinite(newWidth) || newWidth <= 0) {
      setHeight("");
      return;
    }

    const newHeight = Math.round(
      (newWidth / originalWidth) * originalHeight
    );

    setHeight(String(newHeight));
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);

    if (!keepAspectRatio || !originalWidth || !originalHeight) {
      return;
    }

    const newHeight = Number(value);

    if (!Number.isFinite(newHeight) || newHeight <= 0) {
      setWidth("");
      return;
    }

    const newWidth = Math.round(
      (newHeight / originalHeight) * originalWidth
    );

    setWidth(String(newWidth));
  };

  const handleResize = () => {
    setError("");

    if (!file || !previewUrl) {
      setError("Please select an image first.");
      return;
    }

    const targetWidth = Number(width);
    const targetHeight = Number(height);

    if (
      !Number.isFinite(targetWidth) ||
      !Number.isFinite(targetHeight) ||
      targetWidth <= 0 ||
      targetHeight <= 0
    ) {
      setError("Please enter valid width and height values.");
      return;
    }

    if (targetWidth > 10000 || targetHeight > 10000) {
      setError("Maximum supported dimensions are 10,000 × 10,000 pixels.");
      return;
    }

    setIsProcessing(true);

    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas is not supported by this browser.");
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        context.drawImage(
          image,
          0,
          0,
          targetWidth,
          targetHeight
        );

        let mimeType = file.type;

        if (outputFormat === "png") {
          mimeType = "image/png";
        } else if (outputFormat === "jpeg") {
          mimeType = "image/jpeg";
        } else if (outputFormat === "webp") {
          mimeType = "image/webp";
        }

        if (
          mimeType !== "image/png" &&
          mimeType !== "image/jpeg" &&
          mimeType !== "image/webp"
        ) {
          mimeType = "image/png";
        }

        const qualityValue = quality / 100;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setError("Unable to create the resized image.");
              setIsProcessing(false);
              return;
            }

            const downloadUrl = URL.createObjectURL(blob);

            const extension =
              mimeType === "image/png"
                ? "png"
                : mimeType === "image/webp"
                  ? "webp"
                  : "jpg";

            const originalName = file.name.replace(
              /\.[^/.]+$/,
              ""
            );

            const downloadName =
              `${originalName}-${targetWidth}x${targetHeight}.${extension}`;

            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = downloadName;
            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(downloadUrl);

            setIsProcessing(false);
          },
          mimeType,
          mimeType === "image/png" ? undefined : qualityValue
        );
      } catch {
        setError("Something went wrong while resizing the image.");
        setIsProcessing(false);
      }
    };

    image.onerror = () => {
      setError("Unable to process the selected image.");
      setIsProcessing(false);
    };

    image.src = previewUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Image Resizer
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Resize images quickly in your browser. No image uploads
            are required.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-800">
          Your image is processed locally in your browser and is not
          uploaded to our server.
        </div>

        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <label
            htmlFor="image-file"
            className="mb-3 block text-sm font-semibold text-gray-900"
          >
            Select an image
          </label>

          <input
            ref={fileInputRef}
            id="image-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-blue-700"
          />

          {file && (
            <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
              <p>
                <span className="font-semibold">File:</span>{" "}
                {file.name}
              </p>

              <p className="mt-1">
                <span className="font-semibold">Original size:</span>{" "}
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

              <p className="mt-1">
                <span className="font-semibold">Dimensions:</span>{" "}
                {originalWidth} × {originalHeight}px
              </p>

              <p className="mt-1">
                <span className="font-semibold">Type:</span>{" "}
                {file.type || "Unknown"}
              </p>
            </div>
          )}
        </div>

        {error && (
          <div
            role="alert"
            className="mb-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Preview */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Preview
            </h2>

            <div className="mt-6 flex min-h-[400px] items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Selected image preview"
                  className="max-h-[360px] max-w-full object-contain"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-4xl">🖼️</div>
                  <p className="mt-3 text-sm">
                    Select an image to see the preview.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Settings */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Resize settings
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="width"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Width
                </label>

                <div className="relative">
                  <input
                    id="width"
                    type="number"
                    min="1"
                    max="10000"
                    value={width}
                    onChange={(e) =>
                      handleWidthChange(e.target.value)
                    }
                    disabled={!file}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    px
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="height"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Height
                </label>

                <div className="relative">
                  <input
                    id="height"
                    type="number"
                    min="1"
                    max="10000"
                    value={height}
                    onChange={(e) =>
                      handleHeightChange(e.target.value)
                    }
                    disabled={!file}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    px
                  </span>
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={keepAspectRatio}
                  onChange={(e) =>
                    setKeepAspectRatio(e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <span>Keep aspect ratio</span>
              </label>

              <div>
                <label
                  htmlFor="output-format"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Output format
                </label>

                <select
                  id="output-format"
                  value={outputFormat}
                  onChange={(e) =>
                    setOutputFormat(
                      e.target.value as OutputFormat
                    )
                  }
                  disabled={!file}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                >
                  <option value="original">
                    Original / Best match
                  </option>
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="quality"
                    className="text-sm font-semibold text-gray-900"
                  >
                    Quality
                  </label>

                  <span className="text-sm font-medium text-blue-600">
                    {quality}%
                  </span>
                </div>

                <input
                  id="quality"
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) =>
                    setQuality(Number(e.target.value))
                  }
                  disabled={!file}
                  className="w-full accent-blue-600 disabled:opacity-50"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Quality affects JPEG and WebP output.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResize}
                disabled={!file || isProcessing}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isProcessing
                  ? "Processing..."
                  : "Resize & Download"}
              </button>

              <button
                type="button"
                onClick={resetImage}
                disabled={!file}
                className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Remove Image
              </button>
            </div>
          </section>
        </div>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            How to resize an image
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-gray-600">
            <li>Select an image from your computer.</li>
            <li>Enter your desired width and height.</li>
            <li>
              Keep aspect ratio enabled if you want to preserve the
              original proportions.
            </li>
            <li>Choose an output format if needed.</li>
            <li>Click Resize & Download.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}