"use client";

import {
  ChangeEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type CropMode = "drag" | "precise";

type ResizeDirection =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw";

type ImageInfo = {
  width: number;
  height: number;
  type: string;
  size: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function numberValue(value: string, fallback = 0) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getExtension(format: string) {
  if (format === "image/jpeg") return "jpg";
  if (format === "image/webp") return "webp";

  return "png";
}

export default function ImageCropperPage() {
  /* =====================================================
     FILE
  ===================================================== */

  const [imageSrc, setImageSrc] = useState("");
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const objectUrlRef = useRef<string | null>(null);

  /* =====================================================
     CROP
  ===================================================== */

  const [cropMode, setCropMode] =
    useState<CropMode>("drag");

  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(300);
  const [cropHeight, setCropHeight] = useState(300);

  const imageContainerRef =
    useRef<HTMLDivElement | null>(null);

  const cropActionRef = useRef<{
    type: "draw" | "move" | "resize";
    startX: number;
    startY: number;
    originalX: number;
    originalY: number;
    originalWidth: number;
    originalHeight: number;
    direction?: ResizeDirection;
  } | null>(null);

  /* =====================================================
     CROPPED IMAGE
  ===================================================== */

  const [croppedSrc, setCroppedSrc] = useState("");

  const croppedObjectUrlRef =
    useRef<string | null>(null);

  const [croppedInfo, setCroppedInfo] =
    useState<ImageInfo | null>(null);

  /* =====================================================
     MANUAL ADJUSTMENTS
  ===================================================== */

  const [zoom, setZoom] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);

  const [flipHorizontal, setFlipHorizontal] =
    useState(false);

  const [flipVertical, setFlipVertical] =
    useState(false);

  const [aspectRatio, setAspectRatio] =
    useState("custom");

  const [lockAspectRatio, setLockAspectRatio] =
    useState(true);

  const [outputWidth, setOutputWidth] =
    useState(300);

  const [outputHeight, setOutputHeight] =
    useState(300);

  /* =====================================================
     OUTPUT
  ===================================================== */

  const [outputFormat, setOutputFormat] =
    useState("image/png");

  const [quality, setQuality] = useState(0.9);

  /* =====================================================
     UI
  ===================================================== */

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  /* =====================================================
     FILE UPLOAD
  ===================================================== */

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError("Please choose an image smaller than 20 MB.");
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    if (croppedObjectUrlRef.current) {
      URL.revokeObjectURL(
        croppedObjectUrlRef.current
      );

      croppedObjectUrlRef.current = null;
    }

    const url = URL.createObjectURL(file);

    objectUrlRef.current = url;

    const image = new Image();

    image.onload = () => {
      setImageSrc(url);

      setImageInfo({
        width: image.naturalWidth,
        height: image.naturalHeight,
        type: file.type,
        size: file.size,
      });

      const initialWidth = Math.min(
        image.naturalWidth,
        860
      );

      const initialHeight = Math.min(
        image.naturalHeight,
        573
      );

      const scale = Math.min(
        initialWidth / image.naturalWidth,
        initialHeight / image.naturalHeight
      );

      const cropW = Math.max(
        1,
        Math.round(image.naturalWidth * scale)
      );

      const cropH = Math.max(
        1,
        Math.round(image.naturalHeight * scale)
      );

      setCropX(
        Math.round(
          (image.naturalWidth - cropW) / 2
        )
      );

      setCropY(
        Math.round(
          (image.naturalHeight - cropH) / 2
        )
      );

      setCropWidth(cropW);
      setCropHeight(cropH);

      setCroppedSrc("");
      setCroppedInfo(null);

      resetAdjustments();

      setOutputWidth(cropW);
      setOutputHeight(cropH);
    };

    image.onerror = () => {
      setError("Unable to load the selected image.");

      URL.revokeObjectURL(url);

      if (objectUrlRef.current === url) {
        objectUrlRef.current = null;
      }
    };

    image.src = url;
  }

  /* =====================================================
     RESET ADJUSTMENTS
  ===================================================== */

  function resetAdjustments() {
    setZoom(100);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setAspectRatio("custom");
    setLockAspectRatio(true);
  }

  /* =====================================================
     RESET ALL
  ===================================================== */

  function resetAll() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    if (croppedObjectUrlRef.current) {
      URL.revokeObjectURL(
        croppedObjectUrlRef.current
      );

      croppedObjectUrlRef.current = null;
    }

    setImageSrc("");
    setImageInfo(null);

    setCroppedSrc("");
    setCroppedInfo(null);

    setCropX(0);
    setCropY(0);
    setCropWidth(300);
    setCropHeight(300);

    resetAdjustments();

    setOutputWidth(300);
    setOutputHeight(300);

    setOutputFormat("image/png");
    setQuality(0.9);

    setError("");
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /* =====================================================
     POINTER → IMAGE PIXELS
  ===================================================== */

  function pointerToImage(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    const container =
      imageContainerRef.current;

    if (!container || !imageInfo) {
      return { x: 0, y: 0 };
    }

    const rect =
      container.getBoundingClientRect();

    const x = clamp(
      event.clientX - rect.left,
      0,
      rect.width
    );

    const y = clamp(
      event.clientY - rect.top,
      0,
      rect.height
    );

    return {
      x:
        (x / rect.width) *
        imageInfo.width,

      y:
        (y / rect.height) *
        imageInfo.height,
    };
  }

  /* =====================================================
     START DRAW CROP
  ===================================================== */

  function startDrawing(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    if (
      cropMode !== "drag" ||
      !imageInfo
    ) {
      return;
    }

    const point = pointerToImage(event);

    cropActionRef.current = {
      type: "draw",
      startX: point.x,
      startY: point.y,
      originalX: point.x,
      originalY: point.y,
      originalWidth: 1,
      originalHeight: 1,
    };

    setCropX(Math.round(point.x));
    setCropY(Math.round(point.y));
    setCropWidth(1);
    setCropHeight(1);

    setError("");
    setMessage("");

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  }

  /* =====================================================
     START MOVE
  ===================================================== */

  function startMoving(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    if (
      cropMode !== "drag" ||
      !imageInfo
    ) {
      return;
    }

    event.stopPropagation();

    const point = pointerToImage(event);

    const inside =
      point.x >= cropX &&
      point.x <= cropX + cropWidth &&
      point.y >= cropY &&
      point.y <= cropY + cropHeight;

    if (!inside) return;

    cropActionRef.current = {
      type: "move",
      startX: point.x,
      startY: point.y,
      originalX: cropX,
      originalY: cropY,
      originalWidth: cropWidth,
      originalHeight: cropHeight,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  }

  /* =====================================================
     START RESIZE
  ===================================================== */

  function startResize(
    event: ReactPointerEvent<HTMLDivElement>,
    direction: ResizeDirection
  ) {
    if (!imageInfo) return;

    event.stopPropagation();

    const point = pointerToImage(event);

    cropActionRef.current = {
      type: "resize",
      startX: point.x,
      startY: point.y,
      originalX: cropX,
      originalY: cropY,
      originalWidth: cropWidth,
      originalHeight: cropHeight,
      direction,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  }

  /* =====================================================
     POINTER MOVE
  ===================================================== */

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    const action = cropActionRef.current;

    if (!action || !imageInfo) return;

    const point = pointerToImage(event);

    /* -------------------------------
       DRAW
    -------------------------------- */

    if (action.type === "draw") {
      const startX = action.startX;
      const startY = action.startY;

      const x = Math.min(
        startX,
        point.x
      );

      const y = Math.min(
        startY,
        point.y
      );

      const width = Math.abs(
        point.x - startX
      );

      const height = Math.abs(
        point.y - startY
      );

      const safeX = clamp(
        x,
        0,
        imageInfo.width - 1
      );

      const safeY = clamp(
        y,
        0,
        imageInfo.height - 1
      );

      const safeWidth = clamp(
        width,
        1,
        imageInfo.width - safeX
      );

      const safeHeight = clamp(
        height,
        1,
        imageInfo.height - safeY
      );

      setCropX(Math.round(safeX));
      setCropY(Math.round(safeY));
      setCropWidth(Math.round(safeWidth));
      setCropHeight(Math.round(safeHeight));

      return;
    }

    /* -------------------------------
       MOVE
    -------------------------------- */

    if (action.type === "move") {
      const dx =
        point.x - action.startX;

      const dy =
        point.y - action.startY;

      const newX = clamp(
        action.originalX + dx,
        0,
        imageInfo.width -
          action.originalWidth
      );

      const newY = clamp(
        action.originalY + dy,
        0,
        imageInfo.height -
          action.originalHeight
      );

      setCropX(Math.round(newX));
      setCropY(Math.round(newY));

      return;
    }

    /* -------------------------------
       RESIZE
    -------------------------------- */

    if (
      action.type === "resize" &&
      action.direction
    ) {
      let x = action.originalX;
      let y = action.originalY;
      let width =
        action.originalWidth;
      let height =
        action.originalHeight;

      const dx =
        point.x - action.startX;

      const dy =
        point.y - action.startY;

      const direction =
        action.direction;

      if (direction.includes("e")) {
        width = clamp(
          action.originalWidth + dx,
          20,
          imageInfo.width -
            action.originalX
        );
      }

      if (direction.includes("s")) {
        height = clamp(
          action.originalHeight + dy,
          20,
          imageInfo.height -
            action.originalY
        );
      }

      if (direction.includes("w")) {
        const newX = clamp(
          action.originalX + dx,
          0,
          action.originalX +
            action.originalWidth -
            20
        );

        width =
          action.originalWidth -
          (newX - action.originalX);

        x = newX;
      }

      if (direction.includes("n")) {
        const newY = clamp(
          action.originalY + dy,
          0,
          action.originalY +
            action.originalHeight -
            20
        );

        height =
          action.originalHeight -
          (newY - action.originalY);

        y = newY;
      }

      setCropX(Math.round(x));
      setCropY(Math.round(y));
      setCropWidth(Math.round(width));
      setCropHeight(Math.round(height));
    }
  }

  /* =====================================================
     POINTER UP
  ===================================================== */

  function endPointer(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    cropActionRef.current = null;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer already released.
    }
  }

  /* =====================================================
     RESET CROP
  ===================================================== */

  function resetCrop() {
    if (!imageInfo) return;

    setCropX(0);
    setCropY(0);
    setCropWidth(imageInfo.width);
    setCropHeight(imageInfo.height);

    setMessage("");
    setError("");
  }

  /* =====================================================
     FIT IMAGE
  ===================================================== */

  function fitToImage() {
    if (!imageInfo) return;

    setCropX(0);
    setCropY(0);
    setCropWidth(imageInfo.width);
    setCropHeight(imageInfo.height);

    setMessage("Crop area fitted to the full image.");
    setError("");
  }

  /* =====================================================
     ASPECT RATIO
  ===================================================== */

  function applyAspectRatio(
    ratio: string
  ) {
    setAspectRatio(ratio);

    if (
      ratio === "custom" ||
      !imageInfo
    ) {
      return;
    }

    let ratioValue = 1;

    if (ratio === "1:1") {
      ratioValue = 1;
    }

    if (ratio === "4:3") {
      ratioValue = 4 / 3;
    }

    if (ratio === "3:2") {
      ratioValue = 3 / 2;
    }

    if (ratio === "16:9") {
      ratioValue = 16 / 9;
    }

    if (ratio === "9:16") {
      ratioValue = 9 / 16;
    }

    let width = cropWidth;
    let height =
      Math.round(width / ratioValue);

    if (height > imageInfo.height) {
      height = imageInfo.height;
      width =
        Math.round(height * ratioValue);
    }

    if (width > imageInfo.width) {
      width = imageInfo.width;
      height =
        Math.round(width / ratioValue);
    }

    setCropWidth(
      Math.max(20, width)
    );

    setCropHeight(
      Math.max(20, height)
    );

    setCropX(
      Math.round(
        (imageInfo.width - width) / 2
      )
    );

    setCropY(
      Math.round(
        (imageInfo.height - height) / 2
      )
    );
  }

  /* =====================================================
     APPLY FIRST CROP
  ===================================================== */

  function applyCrop() {
    if (!imageSrc || !imageInfo) {
      setError("Please upload an image first.");
      return;
    }

    if (
      cropWidth <= 0 ||
      cropHeight <= 0
    ) {
      setError(
        "Crop width and height must be greater than zero."
      );
      return;
    }

    if (
      cropX < 0 ||
      cropY < 0 ||
      cropX + cropWidth >
        imageInfo.width ||
      cropY + cropHeight >
        imageInfo.height
    ) {
      setError(
        "The crop area must stay inside the image."
      );
      return;
    }

    const image = new Image();

    image.onload = () => {
      const canvas =
        document.createElement("canvas");

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const context =
        canvas.getContext("2d");

      if (!context) {
        setError(
          "Your browser does not support image processing."
        );
        return;
      }

      context.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError(
              "Unable to create the cropped image."
            );
            return;
          }

          if (croppedObjectUrlRef.current) {
            URL.revokeObjectURL(
              croppedObjectUrlRef.current
            );
          }

          const url =
            URL.createObjectURL(blob);

          croppedObjectUrlRef.current = url;

          setCroppedSrc(url);

          setCroppedInfo({
            width: cropWidth,
            height: cropHeight,
            type: "image/png",
            size: blob.size,
          });

          setOutputWidth(cropWidth);
          setOutputHeight(cropHeight);

          resetAdjustments();

          setMessage(
            "Crop complete. Now fine-tune your image using Manual Adjustments."
          );

          setTimeout(() => {
            document
              .getElementById(
                "manual-adjustments"
              )
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          }, 150);
        },
        "image/png"
      );
    };

    image.onerror = () => {
      setError(
        "Unable to process the selected image."
      );
    };

    image.src = imageSrc;
  }

  /* =====================================================
     MANUAL OUTPUT SIZE
  ===================================================== */

  function changeOutputWidth(
    value: number
  ) {
    const safeValue = Math.max(
      1,
      Math.round(value)
    );

    setOutputWidth(safeValue);

    if (
      lockAspectRatio &&
      croppedInfo &&
      croppedInfo.width > 0
    ) {
      const ratio =
        croppedInfo.height /
        croppedInfo.width;

      setOutputHeight(
        Math.max(
          1,
          Math.round(
            safeValue * ratio
          )
        )
      );
    }
  }

  function changeOutputHeight(
    value: number
  ) {
    const safeValue = Math.max(
      1,
      Math.round(value)
    );

    setOutputHeight(safeValue);

    if (
      lockAspectRatio &&
      croppedInfo &&
      croppedInfo.height > 0
    ) {
      const ratio =
        croppedInfo.width /
        croppedInfo.height;

      setOutputWidth(
        Math.max(
          1,
          Math.round(
            safeValue * ratio
          )
        )
      );
    }
  }

  /* =====================================================
     PREVIEW FILTER
  ===================================================== */

  const previewStyle = useMemo(() => {
    return {
      filter: `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
      `,
      transform: `
        scale(${zoom / 100})
        rotate(${rotation}deg)
        scaleX(${flipHorizontal ? -1 : 1})
        scaleY(${flipVertical ? -1 : 1})
      `,
      transition:
        "transform 0.15s ease, filter 0.15s ease",
    };
  }, [
    brightness,
    contrast,
    saturation,
    zoom,
    rotation,
    flipHorizontal,
    flipVertical,
  ]);

  /* =====================================================
     DOWNLOAD FINAL IMAGE
  ===================================================== */

  function downloadFinalImage() {
    if (!croppedSrc || !croppedInfo) {
      setError(
        "Please apply a crop before downloading."
      );
      return;
    }

    setError("");
    setMessage("");

    const image = new Image();

    image.onload = () => {
      const canvas =
        document.createElement("canvas");

      const radians =
        (rotation * Math.PI) / 180;

      const rotated =
        rotation === 90 ||
        rotation === 270;

      const baseWidth =
        outputWidth > 0
          ? outputWidth
          : image.naturalWidth;

      const baseHeight =
        outputHeight > 0
          ? outputHeight
          : image.naturalHeight;

      canvas.width = rotated
        ? baseHeight
        : baseWidth;

      canvas.height = rotated
        ? baseWidth
        : baseHeight;

      const context =
        canvas.getContext("2d");

      if (!context) {
        setError(
          "Your browser does not support image processing."
        );
        return;
      }

      context.save();

      context.translate(
        canvas.width / 2,
        canvas.height / 2
      );

      context.rotate(radians);

      context.scale(
        flipHorizontal ? -1 : 1,
        flipVertical ? -1 : 1
      );

      const scaleX =
        baseWidth /
        image.naturalWidth;

      const scaleY =
        baseHeight /
        image.naturalHeight;

      const drawWidth =
        image.naturalWidth *
        scaleX;

      const drawHeight =
        image.naturalHeight *
        scaleY;

      context.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
      `;

      context.drawImage(
        image,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );

      context.restore();

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError(
              "Unable to create the final image."
            );
            return;
          }

          const url =
            URL.createObjectURL(blob);

          const link =
            document.createElement("a");

          link.href = url;

          link.download = `cropped-image.${getExtension(
            outputFormat
          )}`;

          document.body.appendChild(link);

          link.click();

          link.remove();

          URL.revokeObjectURL(url);

          setMessage(
            `Image downloaded successfully — ${canvas.width} × ${canvas.height} px.`
          );
        },
        outputFormat,
        outputFormat === "image/png"
          ? undefined
          : quality
      );
    };

    image.onerror = () => {
      setError(
        "Unable to prepare the final image."
      );
    };

    image.src = croppedSrc;
  }

  /* =====================================================
     CROP PERCENTAGES
  ===================================================== */

  const cropStyle =
    imageInfo
      ? {
          left: `${
            (cropX /
              imageInfo.width) *
            100
          }%`,

          top: `${
            (cropY /
              imageInfo.height) *
            100
          }%`,

          width: `${
            (cropWidth /
              imageInfo.width) *
            100
          }%`,

          height: `${
            (cropHeight /
              imageInfo.height) *
            100
          }%`,
        }
      : {};

  /* =====================================================
     CLEANUP
  ===================================================== */

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(
          objectUrlRef.current
        );
      }

      if (croppedObjectUrlRef.current) {
        URL.revokeObjectURL(
          croppedObjectUrlRef.current
        );
      }
    };
  }, []);

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =================================================
          HEADER
      ================================================= */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
              Image Tool
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Image Cropper
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Crop, resize, adjust and download your
              images directly in your browser.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* =================================================
            UPLOAD
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label
            htmlFor="image-upload"
            className="block text-sm font-bold text-gray-900"
          >
            Upload Image
          </label>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row">
            <input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block flex-1 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-blue-600 file:px-5 file:py-3 file:font-semibold file:text-white hover:file:bg-blue-700"
            />

            {imageSrc && (
              <button
                type="button"
                onClick={resetAll}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reset All
              </button>
            )}
          </div>

          <p className="mt-2 text-xs text-gray-500">
            JPG, PNG, WebP and other browser-supported
            image formats. Maximum 20 MB.
          </p>
        </section>

        {/* =================================================
            ERROR / MESSAGE
        ================================================= */}

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {message && (
          <div
            role="status"
            className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            {message}
          </div>
        )}

        {!imageSrc ? (
          <section className="mt-8 rounded-2xl border-2 border-dashed border-gray-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
              ✂️
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Upload an image to start
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
              Select an image and use the interactive
              crop box to choose exactly what you want.
            </p>
          </section>
        ) : (
          <>
            {/* =================================================
                STEP 1
            ================================================= */}

            <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  1
                </span>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Choose Crop Method
                  </h2>

                  <p className="text-sm text-gray-600">
                    Drag on the image or enter exact values.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setCropMode("drag")
                  }
                  className={`rounded-xl border p-5 text-left transition ${
                    cropMode === "drag"
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      ✋
                    </span>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Drag & Crop
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        Drag on the image to select,
                        move and resize the crop area.
                      </p>
                    </div>
                  </div>

                  <span className="mt-4 inline-block rounded-md bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">
                    Recommended
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCropMode("precise")
                  }
                  className={`rounded-xl border p-5 text-left transition ${
                    cropMode === "precise"
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      📐
                    </span>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Precise Crop
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        Enter exact X, Y, width and
                        height values.
                      </p>
                    </div>
                  </div>

                  <span className="mt-4 inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600">
                    Pixel precision
                  </span>
                </button>
              </div>
            </section>

            {/* =================================================
                STEP 2
            ================================================= */}

            <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    2
                  </span>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Crop Area
                    </h2>

                    <p className="text-sm text-gray-600">
                      Drag on the image or enter values.
                    </p>
                  </div>
                </div>

                {imageInfo && (
                  <div className="text-sm text-gray-500">
                    {imageInfo.width} ×{" "}
                    {imageInfo.height} px ·{" "}
                    {formatFileSize(
                      imageInfo.size
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                {/* IMAGE */}

                <div>
                  <div className="overflow-auto rounded-xl border border-gray-200 bg-gray-100 p-4">
                    <div
                      ref={
                        imageContainerRef
                      }
                      className="relative mx-auto w-fit max-w-full select-none touch-none"
                      onPointerDown={
                        startDrawing
                      }
                      onPointerMove={
                        handlePointerMove
                      }
                      onPointerUp={
                        endPointer
                      }
                      onPointerCancel={
                        endPointer
                      }
                    >
                      <img
                        src={imageSrc}
                        alt="Image being cropped"
                        className="block max-h-[650px] max-w-full object-contain"
                        draggable={false}
                      />

                      {/* DARK OVERLAY */}

                      <div className="pointer-events-none absolute inset-0 bg-black/35" />

                      {/* CROP BOX */}

                      <div
                        className="absolute border-2 border-blue-500 bg-transparent"
                        style={cropStyle}
                        onPointerDown={
                          startMoving
                        }
                      >
                        {/* GRID */}

                        <div className="pointer-events-none absolute inset-0">
                          <div className="absolute left-1/3 top-0 h-full border-l border-white/60" />
                          <div className="absolute left-2/3 top-0 h-full border-l border-white/60" />

                          <div className="absolute left-0 top-1/3 w-full border-t border-white/60" />
                          <div className="absolute left-0 top-2/3 w-full border-t border-white/60" />
                        </div>

                        {/* SIZE LABEL */}

                        <div className="absolute left-1/2 top-1 -translate-x-1/2 whitespace-nowrap rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white shadow">
                          {cropWidth} ×{" "}
                          {cropHeight}
                        </div>

                        {/* MOVE AREA */}

                        <div
                          className="absolute inset-4 cursor-move"
                          onPointerDown={
                            startMoving
                          }
                        />

                        {/* CORNERS */}

                        <ResizeHandle
                          direction="nw"
                          position="left-0 top-0"
                          onPointerDown={
                            startResize
                          }
                        />

                        <ResizeHandle
                          direction="ne"
                          position="right-0 top-0"
                          onPointerDown={
                            startResize
                          }
                        />

                        <ResizeHandle
                          direction="sw"
                          position="left-0 bottom-0"
                          onPointerDown={
                            startResize
                          }
                        />

                        <ResizeHandle
                          direction="se"
                          position="right-0 bottom-0"
                          onPointerDown={
                            startResize
                          }
                        />

                        {/* EDGES */}

                        <ResizeHandle
                          direction="n"
                          position="left-1/2 top-0"
                          onPointerDown={
                            startResize
                          }
                        />

                        <ResizeHandle
                          direction="s"
                          position="left-1/2 bottom-0"
                          onPointerDown={
                            startResize
                          }
                        />

                        <ResizeHandle
                          direction="w"
                          position="left-0 top-1/2"
                          onPointerDown={
                            startResize
                          }
                        />

                        <ResizeHandle
                          direction="e"
                          position="right-0 top-1/2"
                          onPointerDown={
                            startResize
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-700">
                    💡 <strong>Tips:</strong> Drag the
                    corners or edges to resize. Drag
                    inside the crop area to move it.
                  </div>
                </div>

                {/* SETTINGS */}

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-bold text-gray-900">
                    Crop Settings
                  </h3>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <NumberField
                      label="X"
                      value={cropX}
                      onChange={(value) =>
                        setCropX(
                          Math.max(
                            0,
                            Math.round(value)
                          )
                        )
                      }
                      suffix="px"
                    />

                    <NumberField
                      label="Y"
                      value={cropY}
                      onChange={(value) =>
                        setCropY(
                          Math.max(
                            0,
                            Math.round(value)
                          )
                        )
                      }
                      suffix="px"
                    />

                    <NumberField
                      label="Width"
                      value={cropWidth}
                      onChange={(value) =>
                        setCropWidth(
                          Math.max(
                            1,
                            Math.round(value)
                          )
                        )
                      }
                      suffix="px"
                    />

                    <NumberField
                      label="Height"
                      value={cropHeight}
                      onChange={(value) =>
                        setCropHeight(
                          Math.max(
                            1,
                            Math.round(value)
                          )
                        )
                      }
                      suffix="px"
                    />
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={resetCrop}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      ↶ Reset Crop
                    </button>

                    <button
                      type="button"
                      onClick={fitToImage}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      ⛶ Fit to Image
                    </button>
                  </div>

                  <div className="mt-5 rounded-lg bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Selected Area
                    </p>

                    <p className="mt-2 text-lg font-bold text-gray-900">
                      {cropWidth} ×{" "}
                      {cropHeight} px
                    </p>
                  </div>
                </div>
              </div>

              {/* APPLY */}

              <button
                type="button"
                onClick={applyCrop}
                className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
              >
                Apply Crop & Continue →
              </button>
            </section>

            {/* =================================================
                STEP 3 MANUAL ADJUSTMENTS
            ================================================= */}

            {croppedSrc &&
              croppedInfo && (
                <section
                  id="manual-adjustments"
                  className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      3
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-900">
                          Manual Adjustments
                        </h2>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                          New Feature
                        </span>
                      </div>

                      <p className="text-sm text-gray-600">
                        Fine-tune your cropped image before
                        downloading.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)_260px]">
                    {/* PREVIEW */}

                    <div className="rounded-xl border border-gray-200 p-4">
                      <div className="flex border-b border-gray-200">
                        <div className="flex-1 border-b-2 border-blue-600 px-3 py-3 text-center text-sm font-bold text-blue-600">
                          Adjusted Preview
                        </div>
                      </div>

                      <div className="mt-4 flex min-h-[300px] items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={croppedSrc}
                          alt="Cropped image preview"
                          style={previewStyle}
                          className="max-h-[280px] max-w-full object-contain"
                        />
                      </div>

                      <p className="mt-3 text-center text-xs text-gray-500">
                        {croppedInfo.width} ×{" "}
                        {croppedInfo.height} px
                      </p>
                    </div>

                    {/* CONTROLS */}

                    <div className="rounded-xl border border-gray-200 p-5">
                      <AdjustmentSlider
                        label="Zoom"
                        value={zoom}
                        min={50}
                        max={200}
                        step={1}
                        display={`${zoom}%`}
                        onChange={setZoom}
                        onReset={() =>
                          setZoom(100)
                        }
                      />

                      <AdjustmentSlider
                        label="Brightness"
                        value={brightness}
                        min={0}
                        max={200}
                        step={1}
                        display={`${brightness}%`}
                        onChange={
                          setBrightness
                        }
                        onReset={() =>
                          setBrightness(100)
                        }
                      />

                      <AdjustmentSlider
                        label="Contrast"
                        value={contrast}
                        min={0}
                        max={200}
                        step={1}
                        display={`${contrast}%`}
                        onChange={setContrast}
                        onReset={() =>
                          setContrast(100)
                        }
                      />

                      <AdjustmentSlider
                        label="Saturation"
                        value={saturation}
                        min={0}
                        max={200}
                        step={1}
                        display={`${saturation}%`}
                        onChange={
                          setSaturation
                        }
                        onReset={() =>
                          setSaturation(100)
                        }
                      />

                      <AdjustmentSlider
                        label="Rotate"
                        value={rotation}
                        min={-180}
                        max={180}
                        step={1}
                        display={`${rotation}°`}
                        onChange={setRotation}
                        onReset={() =>
                          setRotation(0)
                        }
                      />

                      <div className="mt-6">
                        <p className="text-sm font-bold text-gray-700">
                          Flip
                        </p>

                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setFlipHorizontal(
                                !flipHorizontal
                              )
                            }
                            className={`rounded-lg border px-4 py-3 text-sm font-semibold ${
                              flipHorizontal
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-gray-300 bg-white text-gray-700"
                            }`}
                          >
                            ↔ Horizontal
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setFlipVertical(
                                !flipVertical
                              )
                            }
                            className={`rounded-lg border px-4 py-3 text-sm font-semibold ${
                              flipVertical
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-gray-300 bg-white text-gray-700"
                            }`}
                          >
                            ↕ Vertical
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* SIZE */}

                    <div className="rounded-xl border border-gray-200 p-5">
                      <h3 className="font-bold text-gray-900">
                        Aspect Ratio
                      </h3>

                      <select
                        value={aspectRatio}
                        onChange={(event) =>
                          applyAspectRatio(
                            event.target.value
                          )
                        }
                        className="mt-3 h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm"
                      >
                        <option value="custom">
                          Custom
                        </option>

                        <option value="1:1">
                          1:1 Square
                        </option>

                        <option value="4:3">
                          4:3
                        </option>

                        <option value="3:2">
                          3:2
                        </option>

                        <option value="16:9">
                          16:9
                        </option>

                        <option value="9:16">
                          9:16
                        </option>
                      </select>

                      <h3 className="mt-6 font-bold text-gray-900">
                        Output Size
                      </h3>

                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <NumberField
                          label="Width"
                          value={
                            outputWidth
                          }
                          onChange={
                            changeOutputWidth
                          }
                          suffix="px"
                        />

                        <NumberField
                          label="Height"
                          value={
                            outputHeight
                          }
                          onChange={
                            changeOutputHeight
                          }
                          suffix="px"
                        />
                      </div>

                      <label className="mt-5 flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
                        <input
                          type="checkbox"
                          checked={
                            lockAspectRatio
                          }
                          onChange={(event) =>
                            setLockAspectRatio(
                              event.target.checked
                            )
                          }
                          className="h-4 w-4 accent-blue-600"
                        />

                        Lock aspect ratio
                      </label>

                      <button
                        type="button"
                        onClick={
                          resetAdjustments
                        }
                        className="mt-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        ↶ Reset Adjustments
                      </button>
                    </div>
                  </div>
                </section>
              )}

            {/* =================================================
                STEP 4 OUTPUT
            ================================================= */}

            {croppedSrc &&
              croppedInfo && (
                <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      4
                    </span>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Output Settings
                      </h2>

                      <p className="text-sm text-gray-600">
                        Choose the final image format and
                        quality.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-bold text-gray-700">
                        Format
                      </label>

                      <select
                        value={outputFormat}
                        onChange={(event) =>
                          setOutputFormat(
                            event.target.value
                          )
                        }
                        className="mt-2 h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm"
                      >
                        <option value="image/png">
                          PNG
                        </option>

                        <option value="image/jpeg">
                          JPEG
                        </option>

                        <option value="image/webp">
                          WebP
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700">
                        Quality:{" "}
                        {Math.round(
                          quality * 100
                        )}
                        %
                      </label>

                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={quality}
                        disabled={
                          outputFormat ===
                          "image/png"
                        }
                        onChange={(event) =>
                          setQuality(
                            Number(
                              event.target.value
                            )
                          )
                        }
                        className="mt-5 w-full accent-blue-600 disabled:opacity-40"
                      />

                      <p className="mt-2 text-xs text-gray-500">
                        Quality applies to JPEG and WebP.
                      </p>
                    </div>
                  </div>
                </section>
              )}

            {/* =================================================
                STEP 5 ACTION
            ================================================= */}

            {croppedSrc &&
              croppedInfo && (
                <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      5
                    </span>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Final Action
                      </h2>

                      <p className="text-sm text-gray-600">
                        Download your adjusted image.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={
                        downloadFinalImage
                      }
                      className="rounded-lg bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
                    >
                      ⬇ Crop & Download
                    </button>

                    <button
                      type="button"
                      onClick={resetAll}
                      className="rounded-lg border border-gray-300 bg-white px-5 py-4 text-sm font-bold text-gray-700 hover:bg-gray-50"
                    >
                      ↻ Reset All
                    </button>
                  </div>
                </section>
              )}
          </>
        )}

        {/* =================================================
            HOW TO USE
        ================================================= */}

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            How to use Image Cropper
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-5">
            <InfoStep
              number="1"
              title="Upload"
              text="Select the image you want to crop."
            />

            <InfoStep
              number="2"
              title="Choose method"
              text="Use Drag & Crop or Precise Crop."
            />

            <InfoStep
              number="3"
              title="Select area"
              text="Drag, move or resize the crop area."
            />

            <InfoStep
              number="4"
              title="Adjust"
              text="Fine-tune zoom, brightness, contrast, rotation and size."
            />

            <InfoStep
              number="5"
              title="Download"
              text="Choose your format and download."
            />
          </div>
        </section>

        {/* =================================================
            FEATURES
        ================================================= */}

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Image Cropper Features
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              title="Interactive crop"
              text="Drag the crop area, corners and edges."
            />

            <Feature
              title="Manual precision"
              text="Enter exact pixel values for X, Y, width and height."
            />

            <Feature
              title="Image adjustments"
              text="Adjust zoom, brightness, contrast, saturation, rotation and flipping."
            />

            <Feature
              title="Multiple formats"
              text="Download PNG, JPEG or WebP."
            />
          </div>
        </section>

        {/* =================================================
            PRIVACY
        ================================================= */}

        <section className="py-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Secure & Private
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Your image is processed directly in your
            browser. No server upload is required for
            cropping and adjustment.
          </p>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   RESIZE HANDLE
========================================================= */

function ResizeHandle({
  direction,
  position,
  onPointerDown,
}: {
  direction: ResizeDirection;
  position: string;
  onPointerDown: (
    event: ReactPointerEvent<HTMLDivElement>,
    direction: ResizeDirection
  ) => void;
}) {
  const cursorMap: Record<
    ResizeDirection,
    string
  > = {
    n: "cursor-ns-resize",
    s: "cursor-ns-resize",
    e: "cursor-ew-resize",
    w: "cursor-ew-resize",
    ne: "cursor-nesw-resize",
    sw: "cursor-nesw-resize",
    nw: "cursor-nwse-resize",
    se: "cursor-nwse-resize",
  };

  return (
    <div
      className={`absolute z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm border-2 border-blue-600 bg-white ${position} ${cursorMap[direction]}`}
      onPointerDown={(event) =>
        onPointerDown(
          event,
          direction
        )
      }
    />
  );
}

/* =========================================================
   NUMBER FIELD
========================================================= */

function NumberField({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-gray-600">
        {label}
      </label>

      <div className="flex">
        <input
          type="number"
          value={value}
          min={0}
          onChange={(event) =>
            onChange(
              numberValue(
                event.target.value,
                0
              )
            )
          }
          className="h-11 min-w-0 flex-1 rounded-l-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {suffix && (
          <span className="flex h-11 items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-3 text-xs text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   ADJUSTMENT SLIDER
========================================================= */

function AdjustmentSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  onReset,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
  onReset: () => void;
}) {
  return (
    <div className="border-b border-gray-100 py-4 last:border-0">
      <div className="flex items-center gap-3">
        <label className="w-24 shrink-0 text-sm font-semibold text-gray-700">
          {label}
        </label>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) =>
            onChange(
              Number(event.target.value)
            )
          }
          className="w-full accent-blue-600"
        />

        <span className="w-14 text-right text-xs font-bold text-gray-700">
          {display}
        </span>

        <button
          type="button"
          onClick={onReset}
          className="text-gray-400 hover:text-gray-700"
          title={`Reset ${label}`}
          aria-label={`Reset ${label}`}
        >
          ↶
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   INFO STEP
========================================================= */

function InfoStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {number}
        </span>

        <h3 className="font-bold text-gray-900">
          {title}
        </h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <h3 className="font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
}