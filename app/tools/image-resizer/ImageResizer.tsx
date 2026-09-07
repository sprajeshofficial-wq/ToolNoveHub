"use client";

import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type OutputFormat = "original" | "png" | "jpeg" | "webp";

const MAX_DIMENSION = 10000;
const MAX_FILE_SIZE = 25 * 1024 * 1024;

function getOutputMimeType(
  fileType: string,
  outputFormat: OutputFormat
): "image/png" | "image/jpeg" | "image/webp" {
  if (outputFormat === "png") {
    return "image/png";
  }

  if (outputFormat === "jpeg") {
    return "image/jpeg";
  }

  if (outputFormat === "webp") {
    return "image/webp";
  }

  if (
    fileType === "image/png" ||
    fileType === "image/jpeg" ||
    fileType === "image/webp"
  ) {
    return fileType;
  }

  return "image/png";
}

function getFileExtension(mimeType: string) {
  if (mimeType === "image/png") {
    return "png";
  }

  if (mimeType === "image/webp") {
    return "webp";
  }

  return "jpg";
}

function removeExtension(filename: string) {
  return filename.replace(/\.[^/.]+$/, "");
}

function isValidPixelValue(value: string) {
  if (!value.trim()) {
    return false;
  }

  const number = Number(value);

  return (
    Number.isFinite(number) &&
    Number.isInteger(number) &&
    number >= 1 &&
    number <= MAX_DIMENSION
  );
}

export default function ImageResizer() {
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
  const [status, setStatus] = useState("");
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
    setStatus("");
    setIsProcessing(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setError("");
    setStatus("");

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(
        "The selected image is larger than the 25 MB limit. Please choose a smaller image."
      );
      event.target.value = "";
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
      if (
        !image.naturalWidth ||
        !image.naturalHeight
      ) {
        URL.revokeObjectURL(url);
        objectUrlRef.current = null;
        setError(
          "Unable to determine the image dimensions. Please try another image."
        );
        return;
      }

      setFile(selectedFile);
      setPreviewUrl(url);
      setOriginalWidth(image.naturalWidth);
      setOriginalHeight(image.naturalHeight);
      setWidth(String(image.naturalWidth));
      setHeight(String(image.naturalHeight));
      setOutputFormat("original");
      setStatus("Image loaded successfully.");
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      objectUrlRef.current = null;
      setError(
        "Unable to read this image. Please try another image."
      );
    };

    image.src = url;
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);
    setError("");
    setStatus("");

    if (
      !keepAspectRatio ||
      !originalWidth ||
      !originalHeight
    ) {
      return;
    }

    if (!isValidPixelValue(value)) {
      setHeight("");
      return;
    }

    const newWidth = Number(value);

    const newHeight = Math.round(
      (newWidth / originalWidth) * originalHeight
    );

    if (
      newHeight < 1 ||
      newHeight > MAX_DIMENSION
    ) {
      setHeight("");
      return;
    }

    setHeight(String(newHeight));
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    setError("");
    setStatus("");

    if (
      !keepAspectRatio ||
      !originalWidth ||
      !originalHeight
    ) {
      return;
    }

    if (!isValidPixelValue(value)) {
      setWidth("");
      return;
    }

    const newHeight = Number(value);

    const newWidth = Math.round(
      (newHeight / originalHeight) * originalWidth
    );

    if (
      newWidth < 1 ||
      newWidth > MAX_DIMENSION
    ) {
      setWidth("");
      return;
    }

    setWidth(String(newWidth));
  };

  const handleResize = () => {
    setError("");
    setStatus("");

    if (!file || !previewUrl) {
      setError("Please select an image first.");
      return;
    }

    if (!isValidPixelValue(width)) {
      setError(
        `Please enter a whole-number width between 1 and ${MAX_DIMENSION.toLocaleString()} pixels.`
      );
      return;
    }

    if (!isValidPixelValue(height)) {
      setError(
        `Please enter a whole-number height between 1 and ${MAX_DIMENSION.toLocaleString()} pixels.`
      );
      return;
    }

    const targetWidth = Number(width);
    const targetHeight = Number(height);

    setIsProcessing(true);

    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error(
            "Canvas is not supported by this browser."
          );
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        const mimeType = getOutputMimeType(
          file.type,
          outputFormat
        );

        /*
         * JPEG does not support transparency.
         * Fill the canvas white before drawing when JPEG
         * is selected so transparent areas do not become black.
         */
        if (mimeType === "image/jpeg") {
          context.fillStyle = "#ffffff";
          context.fillRect(
            0,
            0,
            targetWidth,
            targetHeight
          );
        }

        context.drawImage(
          image,
          0,
          0,
          targetWidth,
          targetHeight
        );

        const qualityValue = quality / 100;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setError(
                "Unable to create the resized image. Please try a smaller image or different dimensions."
              );
              setIsProcessing(false);
              return;
            }

            const downloadUrl =
              URL.createObjectURL(blob);

            const extension =
              getFileExtension(mimeType);

            const originalName =
              removeExtension(file.name);

            const downloadName = `${originalName}-${targetWidth}x${targetHeight}.${extension}`;

            const link =
              document.createElement("a");

            link.href = downloadUrl;
            link.download = downloadName;

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(downloadUrl);

            setStatus(
              `Image resized successfully to ${targetWidth} × ${targetHeight} pixels.`
            );

            setIsProcessing(false);
          },
          mimeType,
          mimeType === "image/png"
            ? undefined
            : qualityValue
        );
      } catch {
        setError(
          "Something went wrong while resizing the image. Please try smaller dimensions or another image."
        );
        setIsProcessing(false);
      }
    };

    image.onerror = () => {
      setError(
        "Unable to process the selected image."
      );
      setIsProcessing(false);
    };

    image.src = previewUrl;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Image Resizer
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Resize images to custom dimensions, preserve
            their aspect ratio, and download the result as
            PNG, JPEG, or WebP.
          </p>
        </header>

        <section
          aria-label="Image processing information"
          className="mb-8 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm leading-6 text-blue-800"
        >
          <strong>Browser-based processing:</strong>{" "}
          the selected image is processed in your browser
          using standard web APIs. The resizing workflow
          does not require sending the image to an image
          processing server.
        </section>

        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Select an image
          </h2>

          <label
            htmlFor="image-file"
            className="sr-only"
          >
            Select an image file
          </label>

          <input
            ref={fileInputRef}
            id="image-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-4 block w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-2 text-xs text-gray-500">
            Maximum file size: 25 MB.
          </p>

          {file && (
            <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
              <p>
                <span className="font-semibold">
                  File:
                </span>{" "}
                {file.name}
              </p>

              <p>
                <span className="font-semibold">
                  Original size:
                </span>{" "}
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

              <p>
                <span className="font-semibold">
                  Dimensions:
                </span>{" "}
                {originalWidth} × {originalHeight}px
              </p>

              <p>
                <span className="font-semibold">
                  Type:
                </span>{" "}
                {file.type || "Unknown"}
              </p>
            </div>
          )}
        </section>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700"
          >
            {error}
          </div>
        )}

        {status && !error && (
          <div
            role="status"
            aria-live="polite"
            className="mb-8 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm leading-6 text-green-700"
          >
            {status}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Preview
            </h2>

            <div className="mt-6 flex min-h-[400px] items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={`Preview of ${file?.name ?? "selected image"}`}
                  className="max-h-[360px] max-w-full object-contain"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <div
                    aria-hidden="true"
                    className="text-4xl"
                  >
                    🖼️
                  </div>

                  <p className="mt-3 text-sm">
                    Select an image to see the preview.
                  </p>
                </div>
              )}
            </div>
          </section>

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
                    max={MAX_DIMENSION}
                    step="1"
                    inputMode="numeric"
                    value={width}
                    onChange={(event) =>
                      handleWidthChange(
                        event.target.value
                      )
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
                    max={MAX_DIMENSION}
                    step="1"
                    inputMode="numeric"
                    value={height}
                    onChange={(event) =>
                      handleHeightChange(
                        event.target.value
                      )
                    }
                    disabled={!file}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    px
                  </span>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={keepAspectRatio}
                  onChange={(event) => {
                    setKeepAspectRatio(
                      event.target.checked
                    );
                    setError("");
                    setStatus("");
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
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
                  onChange={(event) => {
                    setOutputFormat(
                      event.target.value as OutputFormat
                    );
                    setError("");
                    setStatus("");
                  }}
                  disabled={!file}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                >
                  <option value="original">
                    Keep compatible original format
                  </option>
                  <option value="png">
                    PNG
                  </option>
                  <option value="jpeg">
                    JPEG
                  </option>
                  <option value="webp">
                    WebP
                  </option>
                </select>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  PNG preserves transparency. JPEG is
                  useful for photographs and does not
                  preserve transparency. WebP can provide
                  smaller files with good image quality.
                </p>
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
                  step="1"
                  value={quality}
                  onChange={(event) => {
                    setQuality(
                      Number(event.target.value)
                    );
                    setError("");
                    setStatus("");
                  }}
                  disabled={!file}
                  aria-label={`Image quality ${quality}%`}
                  className="w-full accent-blue-600 disabled:opacity-50"
                />

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Quality affects JPEG and WebP output.
                  PNG uses lossless compression here, so
                  this setting does not change PNG output.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResize}
                disabled={!file || isProcessing}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isProcessing
                  ? "Processing..."
                  : "Resize & Download"}
              </button>

              <button
                type="button"
                onClick={resetImage}
                disabled={!file || isProcessing}
                className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
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
            <li>
              Select an image from your computer.
            </li>
            <li>
              Enter the desired width and height in
              pixels.
            </li>
            <li>
              Keep aspect ratio enabled if you want the
              image proportions to remain consistent.
            </li>
            <li>
              Choose PNG, JPEG, WebP, or keep a compatible
              original format.
            </li>
            <li>
              Adjust quality when using JPEG or WebP.
            </li>
            <li>
              Click Resize &amp; Download to create the
              resized image.
            </li>
          </ol>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            What does an image resizer do?
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              An image resizer changes the pixel dimensions
              of an image. For example, a 2000 × 1500 pixel
              photograph can be resized to 1200 × 900
              pixels while keeping the same proportions.
            </p>

            <p>
              Resizing is useful when an image is too large
              for a website, social media platform, document,
              email attachment, or other application. Reducing
              dimensions can also reduce the resulting file
              size, although the final size depends on the
              image format and compression settings.
            </p>

            <p>
              When you keep the aspect ratio enabled, the
              second dimension is calculated from the original
              proportions. This helps prevent images from
              appearing stretched or squashed.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            PNG, JPEG, or WebP?
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                PNG
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Useful for graphics, screenshots, and images
                that need transparent backgrounds.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                JPEG
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Commonly used for photographs and other
                continuous-tone images where smaller files
                are useful.
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                WebP
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                A modern image format that can provide
                efficient compression for websites and web
                applications.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Browser-based processing
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              This resizing workflow uses browser APIs
              including the File API, image decoding, and
              HTML Canvas. The selected image is loaded by
              your browser and the resized result is created
              locally in the browser.
            </p>

            <p>
              The tool does not need an image-processing API
              to perform the resize operation. As with any
              website, other site features such as analytics
              may operate separately according to the
              ToolNoveHub Privacy Policy.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Image Resizer FAQ
          </h2>

          <div className="mt-4 space-y-6 text-sm leading-7">
            <div>
              <h3 className="font-semibold text-gray-900">
                Can I resize an image without changing its
                proportions?
              </h3>
              <p className="mt-2 text-gray-600">
                Yes. Keep the aspect ratio option enabled.
                Changing either width or height will calculate
                the other dimension from the original image
                proportions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Does resizing reduce image quality?
              </h3>
              <p className="mt-2 text-gray-600">
                Reducing dimensions removes pixels, so the
                resized image cannot contain detail that was
                removed during the process. JPEG and WebP
                output can also be affected by the selected
                quality setting.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Can I convert an image while resizing it?
              </h3>
              <p className="mt-2 text-gray-600">
                Yes. You can resize and export as PNG, JPEG,
                or WebP. If you choose the compatible original
                format option, PNG, JPEG, and WebP images keep
                their respective formats.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Is there a file size limit?
              </h3>
              <p className="mt-2 text-gray-600">
                The tool accepts image files up to 25 MB.
                Browser memory availability can still affect
                how very large images are processed.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}